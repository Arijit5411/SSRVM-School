import { NextResponse } from 'next/server';

// Helper function to normalize paths (ensure they start with '/')
const normalizePath = (path) => path.startsWith('/') ? path : `/${path}`;

export async function middleware(req) {
  try {
    // Get the host
    const host = req.headers.get('host');

    // Construct API URL
    let apiUrl;
    if (host.includes('localhost')) {
      apiUrl = `${process.env.LOCAL_SURL}/_s/api/redirection?populate=deep,3`;
    } else {
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
      apiUrl = `${protocol}://${host}/_s/api/redirection?populate=deep,3`;
    }

    // Fetch the data
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch redirections');
    }

    // Parse the JSON response
    const data = await response.json();
    const redirections = data.data.attributes.Redirection_Urls;

    // Create a Map for O(1) lookups, normalizing paths
    const redirectionMap = new Map(
      redirections.map((r) => [normalizePath(r.From), normalizePath(r.To)])
    );

    // Get the current request path
    const path = req.nextUrl.pathname;

    // Check if the path matches a "From" path
    if (redirectionMap.has(path)) {
      const toPath = redirectionMap.get(path);
      // Perform the redirect
      return NextResponse.redirect(new URL(toPath, req.url));
    }
  } catch (error) {
    // Log errors and proceed without redirecting
    console.error('Error in redirection middleware:', error);
  }

  // If no match or an error occurs, continue with the request
  return NextResponse.next();
}