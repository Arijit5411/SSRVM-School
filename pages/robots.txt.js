export async function getServerSideProps({ res }) {
    const baseUrl = `https://${res.req?.headers?.host}`;

    // Set the content type to text/plain for robots.txt
    res.setHeader('Content-Type', 'text/plain');

    // Return the robots.txt content as a string
    res.write(`User-agent: *
Disallow:

Sitemap: ${baseUrl}/sitemap.xml
`);

    res.end();

    // No need to return props since this will just render plain text
    return {
        props: {},
    };
}

// No need for a default export since the page does not render a React component
export default function Robots() { }