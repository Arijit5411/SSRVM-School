// utils/strapiUtils.js
export function determineStrapiUrl(context) {
  const strapiUrls = JSON.parse(process.env.SURL);
  const subdomain = context.req?.headers?.host ? context.req?.headers?.host : context;
  const foundUrl = strapiUrls.find(item => item.subdomain === subdomain);
  return foundUrl ? foundUrl?.url : strapiUrls.find(item => item?.subdomain === 'default').url;
}

