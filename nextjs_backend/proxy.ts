import { NextRequest, NextResponse } from 'next/server';


const getAllowOrigins = () => {
    const origins = [
        'http://localhost:3000',
    ]

    if (process.env.ALLOWED_ORIGINS){
        origins.push(...process.env.ALLOWED_ORIGINS.split(',').map( o => o.trim()));
    }

    return origins;
}

function getCorsHeaders(request: NextRequest){
    const origin = request.headers.get('origin') || '';
    const allowdOrigins = getAllowOrigins();

    const isAllowed = allowdOrigins.includes(origin) || !origin;

    return {
    'Access-Control-Allow-Origin': isAllowed  ? (origin || '*') : '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400', 
  };
}

export function proxy(request : NextRequest){

      // OPTIONS preflight 요청 처리
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
        status: 204,
        headers: getCorsHeaders(request),
        });
    }

    const response = NextResponse.next();
    const corsHeaders = getCorsHeaders(request);

    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}


export const config = {
    matcher: '/api/:path*',
}


