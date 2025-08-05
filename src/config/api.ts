// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.DEV ? '/api/' : (import.meta.env.VITE_API_BASE_URL || 'https://probestonlineapiv2.azurewebsites.net/api/'),
  apiKey: import.meta.env.VITE_API_KEY || '',
  jwt: {
    key: import.meta.env.VITE_JWT_KEY || '',
    issuer: import.meta.env.VITE_JWT_ISSUER || 'exampleIssuer',
    audience: import.meta.env.VITE_JWT_AUDIENCE || 'exampleAudience'
  },
  timeout: 10000, // 10 seconds
  retryAttempts: 3
};

// API Headers
export const getApiHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-API-Key': API_CONFIG.apiKey,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: 'Login',
    register: 'auth/register',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',
    activateOnline: 'auth/activate-online',
    refreshToken: 'auth/refresh-token'
  },

  // Members
  members: {
    profile: 'Userdata',
    updateProfile: 'Userdata',
    updateAddress: 'Userdata',
    updateBankInfo: 'Userdata',
    paymentHistory: 'Userdata/payments'
  },
  
  // Society
  society: {
    info: 'society/info'
  },
  
  // Payments
  payments: {
    list: 'payments',
    create: 'payments',
    updateStatus: (id: string) => `payments/${id}/status`
  },
  
  // Events
  events: {
    list: 'events',
    register: (id: string) => `events/${id}/register`,
    unregister: (id: string) => `events/${id}/register`
  },
  
  // Documents
  documents: {
    list: 'documents',
    upload: 'documents/upload',
    delete: (id: string) => `documents/${id}`,
    sendEmail: 'documents/send-email'
  },
  
  // Admin
  admin: {
    members: 'admin/members',
    updateMemberStatus: (id: string) => `admin/members/${id}/status`,
    statistics: 'admin/statistics'
  }
};

// Environment check
export const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development';
export const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
