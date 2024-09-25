import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl;

  // if (pathname?.pathname === '/') {
  //   // return NextResponse.redirect(new URL('/games', request.url));
  // }
  // const accessToken = cookies.get(ACCESS_TOKEN);

  if (pathname?.pathname?.includes('auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
