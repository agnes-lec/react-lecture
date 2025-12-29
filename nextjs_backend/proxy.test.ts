import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from './proxy';

describe('Proxy TEST (CORS Logic)', () => {

    beforeEach(() => {
        vi.unstubAllEnvs();
    });

    //
    it('기본 localhost:5173 은 허용 origin 입니다.', ()=> {
        vi.stubEnv('ALLOWED_ORIGINS', 'http://localhost:5173');
        const req = new NextRequest('http://localhost/api/test', {
            headers: {origin: 'http://localhost:5173'},
        });

        const res = proxy(req);

        expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:5173');
        expect(res.headers.get('Access-Control-Allow-Credentials')).toBe('true');
    });

    //
    it('허용되지 않은 Origin은 빈 문자열을 반환해야 한다.', () =>{
        const req = new NextRequest('http://localhost/api/test', {
            headers : {origin : "http://hacker.com"},
        });
        const res = proxy(req);

        expect(res.headers.get('Access-Control-Allow-Origin')).toBe('');
    });

    //서버 간 통신(No Origin) 테스트
    it('Origin 헤더가 없는 요청은 "*"를 반환해야 한다', () => {
    const req = new NextRequest('http://localhost/api/test'); // 헤더 없음

    const res = proxy(req);

    // 코드 로직: !origin -> isAllowed=true -> (origin || '*') 반환
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    });

    //Preflight(OPTIONS) 요청 테스트
    it('OPTIONS 요청은 204 상태코드와 CORS 헤더를 반환하고 종료해야 한다', () => {
    const req = new NextRequest('http://localhost/api/test', {
        method: 'OPTIONS',
        headers: { origin: 'http://localhost:3000' },
    });

    const res = proxy(req);

    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('GET, POST');
    expect(res.headers.get('Access-Control-Max-Age')).toBe('86400');

    });

});