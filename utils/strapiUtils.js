// utils/strapiUtils.js
export function determineStrapiUrl(context) {
  const subdomain = context.req?.headers?.host ? context.req?.headers?.host : context;

  let foundUrl;
  if(subdomain.includes('localhost')){
    return foundUrl = process.env.LOCAL_SURL;
  }else{
    const strapiUrls = JSON.parse(process.env.SURL);
    foundUrl = strapiUrls.find(item => item.subdomain === subdomain);
    return foundUrl ? foundUrl?.url : strapiUrls.find(item => item?.subdomain === 'default').url;
  }

}

