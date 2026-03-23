export const saveToken = (token) => {
    localStorage.setItem('access_token', token.access);
    localStorage.setItem('refresh_token', token.refresh);
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');;
};

export const clearToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const authFetch =async (url, options = {}) => {
    const token = getAccessToken();
    const headers = options.headers ? { ...options.headers } : {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';
    const response = await fetch(url, { ...options, headers });
    if(!response.ok){
        const errorData = await response.json().catch(() => {});
        throw { response:{errorData,status:response.status } };
    }
    const data = await response.json();
    return { data,status:response.status } ;
};