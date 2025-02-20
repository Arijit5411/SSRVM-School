export function capUrl(context) {
    const subdomain = context.req?.headers?.host ? context.req?.headers?.host : context;
    let apiUrl;
    if (subdomain.includes('localhost')) {
      return `${process.env.LOCAL_SURL}/_s`;
    } else {
      apiUrl = `https://${subdomain}/_s`;
      console.log('Api url ', apiUrl);
      return apiUrl;
    }
  }