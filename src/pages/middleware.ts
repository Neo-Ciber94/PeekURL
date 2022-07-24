import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, next: NextFetchEvent) {
    return NextResponse.next();
}