import { determineStrapiUrl } from "@/utils/strapiUtils";




const generateSitemap = (baseUrl, blogUrls, eventUrls, newsUrls, globalEventsUrls, globalBlogsUrls, indiActUrls, stateFacUrls, otherUrls) => {

    // const baseUrl = process.env.BASE_URL || 'https://ssrvmtrust.org';
   

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
        '/global-individual-blogs',
        '/global-individual-events',
        '/individual-activities',
        '/state-facility',
        '/events',
        '/news',
    ];

    const allPages = [...staticPages, ...dynamicPages, ...blogUrls, ...eventUrls, ...newsUrls, ...globalEventsUrls, ...globalBlogsUrls, ...indiActUrls, ...stateFacUrls, ...otherUrls];


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allPages
            .map((page) => {
                return `
                        <url>
                            <loc>${baseUrl}${page}</loc>
                            <changefreq>weekly</changefreq>
                            <priority>0.8</priority>
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



export async function getServerSideProps({ res }) {

    const strapiUrl = determineStrapiUrl(res);

    const baseUrl = res.req?.headers?.host;

    const blogRes = await fetch(`${strapiUrl}/api/blogs`)
    const blogData = await blogRes.json();
    const blogUrls = blogData.data.map(item => `/blog/${item.attributes.slug}`);

    console.log("blogUrls", blogUrls)

    const eventRes = await fetch(`${strapiUrl}/api/event-pages`)
    const eventData = await eventRes.json();
    const eventUrls = eventData.data.map(item => `/events/${item.attributes.slug}`);

    const newsRes = await fetch(`${strapiUrl}/api/newspages`)
    const newsData = await newsRes.json();
    const newsUrls = newsData.data.map(item => `/news/${item.attributes.slug}`);

    const globalEventsRes = await fetch(`${process.env.GSURL}/api/global-events`)
    const globalEventsData = await globalEventsRes.json();
    const globalEventsUrls = globalEventsData.data.map(item => `/global-individual-events/${item.attributes.slug}`);

    const globalBlogsRes = await fetch(`${process.env.GSURL}/api/global-blogs`)
    const globalBlogsData = await globalBlogsRes.json();
    const globalBlogsUrls = globalBlogsData.data.map(item => `/global-individual-blogs/${item.attributes.slug}`);

    const indiActRes = await fetch(`${strapiUrl}/api/activities`)
    const indiActData = await indiActRes.json();
    // console.log("first", indiActData.data )
    const indiActUrls = indiActData.data.map(item => `/individual-activities/${item.attributes.slug}`);

    const stateFacRes = await fetch(`${strapiUrl}/api/features`)
    const stateFacData = await stateFacRes.json();
    const stateFacUrls = stateFacData.data.map(item => `individual-activities/state-facility/${item.attributes.slug}`);

    const othersRes = await fetch(`${strapiUrl}/api/others-pages`)
    const othersData = await othersRes.json();
    const otherUrls = othersData.data.map(item => `others/${item.attributes.slug}`);
   
    const sitemap = generateSitemap(baseUrl, blogUrls, eventUrls, newsUrls, globalEventsUrls, globalBlogsUrls, indiActUrls, stateFacUrls, otherUrls);
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
    return {
        props: {},
    };
}

export default Sitemap;