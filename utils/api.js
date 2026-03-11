import axios from 'axios';

// Create the Axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor to add the auth token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Helper for image URLs
export const getStorageUrl = (path) => {
    if (!path) return '/images/placeholder.jpg'; // Return a valid local placeholder
    if (path.startsWith('http')) return path;

    const baseUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';
    // Ensure no double slashes, but keep the one between base and path
    const cleanPath = path.replace(/^\/+/, '');
    return `${baseUrl}/${cleanPath}`;
};

// --- AUTH API ---
export const apiAuth = {
    login: (credentials) => api.post('/login', credentials),
    logout: () => api.post('/logout'),
    me: () => api.get('/user'),
};

// --- ADMIN API ---
export const apiAdmin = {
    getOrders: () => api.get('/admin/orders'),
    updateOrderStatus: (type, id, status) => api.patch(`/admin/orders/${type}/${id}`, { status }),

    // Individual order type endpoints
    getWeddingOrders: () => api.get('/admin/orders/wedding'),
    createWeddingOrder: (data) => api.post('/admin/orders/wedding', data),
    getBirthdayOrders: () => api.get('/admin/orders/birthday'),
    createBirthdayOrder: (data) => api.post('/admin/orders/birthday', data),
    getMetatahOrders: () => api.get('/admin/orders/metatah'),
    createMetatahOrder: (data) => api.post('/admin/orders/metatah', data),

    // Products
    getProducts: () => api.get('/admin/products'),
    createProduct: (data) => api.post('/admin/products', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    updateProduct: (id, data) => api.post(`/admin/products/${id}?_method=PUT`, data, { headers: { 'Content-Type': 'multipart/form-data' } }), // Laravel method spoofing for FormData
    deleteProduct: (id) => api.delete(`/admin/products/${id}`),

    // Attendance
    getAttendance: () => api.get('/admin/attendance'),

    // Invitations (Tokens)
    getInvitations: () => api.get('/admin/invitations'),
    createInvitation: (data) => api.post('/admin/invitations', data),
    deleteInvitation: (id) => api.delete(`/admin/invitations/${id}`),
};

// --- CLIENT API ---
export const apiClient = {
    submitWeddingOrder: (data) => api.post('/orders/wedding', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    submitBirthdayOrder: (data) => api.post('/orders/birthday', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    submitMetatahOrder: (data) => api.post('/orders/metatah', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getPublicProducts: () => api.get('/products'),

    // RSVP
    submitRsvp: (data) => api.post('/rsvp', data),
    getAttendanceBySlug: (slug) => api.get(`/attendance/${slug}`),
};

export default api;
