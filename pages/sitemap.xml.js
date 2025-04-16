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
                .map((url) => {
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

const Sitemap = () => null;

const fetchUrls = async (apiEndpoint, pathPrefix) => {
    try {
        const res = await fetch(apiEndpoint);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error(`Expected JSON, but got ${contentType}`);
            return [];
        }
        const data = await res.json();
        return data.data.map(item => `${pathPrefix}/${item.attributes.slug ? item.attributes.slug : item.id}`);
    } catch (error) {
        console.error(`Error fetching ${apiEndpoint}:`, error);
        return [];
    }
};

export async function getServerSideProps({ res }) {
    const strapiUrl = determineStrapiUrl(res);
    const baseUrl = `https://${res.req?.headers?.host}`;

    // For published content (using `filters[publishedAt][$notNull]`)
    const blogUrls = await fetchUrls(`${strapiUrl}/api/blogs?filters[publishedAt][$notNull]=true`, '/blog');
    const eventUrls = await fetchUrls(`${strapiUrl}/api/event-pages?filters[publishedAt][$notNull]=true`, '/events');
    const newsUrls = await fetchUrls(`${strapiUrl}/api/newspages?filters[publishedAt][$notNull]=true`, '/news');

    // Assuming these external/global URLs do not need filtering
    const globalEventsUrls = await fetchUrls(`${process.env.GSURL}/api/global-events`, '/global-individual-events');
    const globalBlogsUrls = await fetchUrls(`${process.env.GSURL}/api/global-blogs`, '/global-individual-blogs');
    const indiActUrls = await fetchUrls(`${strapiUrl}/api/activities`, '/individual-activities');
    const stateFacUrls = await fetchUrls(`${strapiUrl}/api/features`, '/individual-activities/state-facility');
    const otherUrls = await fetchUrls(`${strapiUrl}/api/others-pages`, '/others');

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

    const dynamicPages = [
        '/blog',
        '/events',
        '/news',
    ];

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

    const sitemap = generateSitemap(baseUrl, allUrls);
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default Sitemap;
