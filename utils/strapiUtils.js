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

  // console.log("gp", subdomain)

  let apiUrl;
  // if (subdomain.includes('localhost') || subdomain.includes('ssrvmtrust.org')) {
  if (subdomain.includes('localhost')) {
    return `${process.env.LOCAL_SURL}/_s`;
  } else {
    apiUrl = `https://${subdomain}/_s`;
    // console.log('Api url ', apiUrl);
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
