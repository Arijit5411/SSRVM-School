import { determineStrapiUrl } from "@/utils/strapiUtils";

const getPriority = (url) => {
    if (url === '/') return 1.0;
    if (url.startsWith('/blog')) return 0.9;
    if (url.startsWith('/events')) return 0.8;
    if (url.startsWith('/news')) return 0.7;
    return 0.5; // default priority for other pages
};

const generateSitemap = (baseUrl, allUrls) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allUrls
                .map((url, index) => {
                    const priority = getPriority(url);
                    return `
                        <url>
                            <loc>${baseUrl + url}</loc>
                            <changefreq>weekly</changefreq>
                            <priority>${priority}</priority>
                        </url>
                    `;
                })
                .join('')}
        </urlset>`;
    return sitemap;
};

const Sitemap = () => {
    return null;
};

const fetchUrls = async (apiEndpoint, pathPrefix, baseUrl) => {
    try {
        // Set a high pageSize to fetch all data in one request
        const res = await fetch(`${apiEndpoint}?pagination[pageSize]=1000`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error(`Expected JSON, but got ${contentType} for ${apiEndpoint}`);
            return [];
        }
        if (!res.ok) {
            console.error(`HTTP error ${res.status} for ${apiEndpoint}`);
            return [];
        }
        const data = await res.json();
        
        // Log the total number of items received
        const items = data.data || [];
        console.log(`Fetched ${items.length} items from ${apiEndpoint}`);

        // Map items to URLs
        const urls = items.map(item => 
            `${pathPrefix}/${item.attributes.slug ? item.attributes.slug : item.id}`
        );
        console.log(`Generated ${urls.length} URLs from ${apiEndpoint}:`, urls);
        
        // Check pagination meta to warn if data might be truncated
        const pagination = data.meta?.pagination;
        if (pagination && pagination.total > items.length) {
            console.warn(
                `Warning: Only ${items.length} of ${pagination.total} items fetched from ${apiEndpoint}. ` +
                `Consider increasing pageSize or checking Strapi configuration.`
            );
        }

        return urls;
    } catch (error) {
        console.error(`Error fetching ${apiEndpoint}:`, error.message);
        return [];
    }
};

export async function getServerSideProps({ res }) {
    const strapiUrl = determineStrapiUrl(res);
    const baseUrl = `https://${res.req?.headers?.host}`;

    // Fetch dynamic URLs with high pageSize to avoid pagination
    const blogUrls = await fetchUrls(`${strapiUrl}/api/blogs`, '/blog', baseUrl);
    const eventUrls = await fetchUrls(`${strapiUrl}/api/event-pages`, '/events', baseUrl);
    const newsUrls = await fetchUrls(`${strapiUrl}/api/newspages`, '/news', baseUrl);
    const globalEventsUrls = await fetchUrls(`${process.env.GSURL}/api/global-events`, '/global-individual-events', baseUrl);
    const globalBlogsUrls = await fetchUrls(`${process.env.GSURL}/api/global-blogs`, '/global-individual-blogs', baseUrl);
    const indiActUrls = await fetchUrls(`${strapiUrl}/api/activities`, '/individual-activities', baseUrl);
    const stateFacUrls = await fetchUrls(`${strapiUrl}/api/features`, '/individual-activities/state-facility', baseUrl);
    const otherUrls = await fetchUrls(`${strapiUrl}/api/others-pages`, '/others', baseUrl);

    // Static pages
    const staticPages = [
        '/',
        '/contact-us',
        '/admission-enquiry',
        '/admissions',
        '/annual-reports',
        '/appointment-booking',
        '/awards-and-achievements',
        '/career-apply',
        '/career-guidance',
        '/careers',
        '/certificate-three',
        '/certificate-two',
        '/committee-members',
        '/core-school-team',
        '/curricular-activities',
        '/examination',
        '/features',
        '/founder',
        '/global-blogs',
        '/international-and-national',
        '/life-at-ssa',
        '/life-of-student',
        '/life-of-teacher',
        '/mandatory-disclosures',
        '/mandatory-public-disclosure',
        '/monthly-calendar',
        '/our-hub-of-activities',
        '/our-pedagogy',
        '/our-vision',
        '/policy-statements',
        '/press-releases',
        '/principal-message',
        '/publications',
        '/quick-links',
        '/results-three',
        '/results-two',
        '/results',
        '/safety-assurance',
        '/school-calendar',
        '/sustainability-projects',
        '/teaching-methodology',
        '/team',
        '/testimonials',
        '/thank-you',
        '/transfer-certificate',
        '/trustees',
        '/value-based-education',
        '/virtual-tour-gallery',
        '/virtual-tour',
    ];

    // Dynamic page parent routes
    const dynamicPages = [
        '/blog',
        '/events',
        '/news',
    ];

    // Combine all URLs
    const allUrls = [
        ...staticPages,
        ...dynamicPages,
        ...blogUrls,
        ...eventUrls,
        ...newsUrls,
        ...globalEventsUrls,
        ...globalBlogsUrls,
        ...indiActUrls,
        ...stateFacUrls,
        ...otherUrls,
    ];

    // Log total URLs for debugging
    console.log(`Total URLs in sitemap: ${allUrls.length}`);
    console.log('All URLs:', allUrls);

    // Generate and serve sitemap
    const sitemap = generateSitemap(baseUrl, allUrls);
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default Sitemap;