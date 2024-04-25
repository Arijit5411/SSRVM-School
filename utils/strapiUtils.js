// utils/strapiUtils.js
// export function determineStrapiUrl(context) {
//   const subdomain = context.req?.headers?.host ? context.req?.headers?.host : context;

//   let foundUrl;
//   if (subdomain.includes('localhost')) {
//     return foundUrl = process.env.LOCAL_SURL;
//   } else {
//     const strapiUrls = JSON.parse(process.env.SURL);
//     foundUrl = strapiUrls.find(item => item.subdomain === subdomain);
//     return foundUrl ? foundUrl?.url : strapiUrls.find(item => item?.subdomain === 'default')?.url;
//   }

// }

// utils/strapiUtils.js
export function determineStrapiUrl(context) {
  const subdomain = context.req?.headers?.host ? context.req?.headers?.host : context;

  console.log("gp", subdomain)

  let apiUrl;
  if (subdomain.includes('localhost')) {
    return process.env.LOCAL_SURL;
  } else {
    apiUrl = `https://${subdomain}`;
    return apiUrl;
  }
}


// utils/strapiUtils.js =================================== harish ji code backup
// export function determineStrapiUrl(context) {
//   const subdomain = context.req?.headers?.host ? context.req?.headers?.host : context;
//   const apiUrl = `https://${subdomain}`;
//   console.log('Api url ', apiUrl);
//   return apiUrl;
// }