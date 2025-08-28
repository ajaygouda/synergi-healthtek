// middleware.ts
import { NextResponse } from 'next/server';


export function middleware(req) {
    const auth = req.cookies.get("auth")?.value; // better than localStorage (server side)

    // If no auth token → redirect to login
    if (!auth) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Otherwise allow the request
    return NextResponse.next();
}

// Apply only to protected routes
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"], // protect these routes
};
