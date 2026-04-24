import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('session')?.value;

    const isProtected = pathname.startsWith('/dashboard');
    const isAuthRoute = pathname === '/login' || pathname === '/register';

    if (isProtected) {
        if (!token) return NextResponse.redirect(new URL('/login', request.url));
        try {
            await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        } catch {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (isAuthRoute && token) {
        try {
            await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } catch {}
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};