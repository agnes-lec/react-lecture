const API_BASE_URL = 'http://13.220.93.143:8080';

async function apiRequset(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };
    
    const token = localStorage.getItem('token')
    if(token){
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
        ...defaultHeaders,
        ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export async function signup(userInfo) {
    console.log(userInfo)

    return apiRequset('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userInfo),
    });
}

export async function login(credentials) {
    return apiRequset('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

/* 사용자 관리 */

/* 영수증 관리 */



