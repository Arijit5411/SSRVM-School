// utils/strapiUtils.js
export function determineStrapiUrl(context) {
  const subdomain = context.req?.headers?.host ? context.req?.headers?.host : context;
  
  const strapiUrls = subdomain && subdomain.includes('localhost')
  ? JSON.parse(process.env.LOCAL_SURL)
  : JSON.parse(process.env.SURL);

  const foundUrl = strapiUrls.find(item => item.subdomain === subdomain);
  return foundUrl ? foundUrl?.url : strapiUrls.find(item => item?.subdomain === 'default').url;
}

