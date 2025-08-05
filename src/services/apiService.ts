import { API_CONFIG, getApiHeaders, API_ENDPOINTS } from '@/config/api';

// API Response interface
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// API Error class
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base API service class
class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getStoredToken();

    const config: RequestInit = {
      ...options,
      headers: {
        ...getApiHeaders(token),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          response.status,
          data.error?.code || 'API_ERROR',
          data.error?.message || 'An error occurred',
          data.error?.details
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        500,
        'NETWORK_ERROR',
        'Network error occurred',
        error
      );
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // File upload request
  async upload<T>(endpoint: string, formData: FormData, additionalHeaders?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: additionalHeaders,
    });
  }

  // Token management
  private getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Specific API methods
export const authApi = {
  login: (credentials: { email?: string; username?: string; password: string }) =>
    apiService.post(API_ENDPOINTS.auth.login, credentials),
    
  register: (userData: any) =>
    apiService.post(API_ENDPOINTS.auth.register, userData),
    
  forgotPassword: (data: { method: string; value: string }) =>
    apiService.post(API_ENDPOINTS.auth.forgotPassword, data),
    
  resetPassword: (data: { token: string; newPassword: string }) =>
    apiService.post(API_ENDPOINTS.auth.resetPassword, data),
    
  activateOnline: (data: any) =>
    apiService.post(API_ENDPOINTS.auth.activateOnline, data),
};

export const memberApi = {
  getProfile: () =>
    apiService.get(API_ENDPOINTS.members.profile),

  updateProfile: (data: any) =>
    apiService.post(API_ENDPOINTS.members.updateProfile, data),

  updateAddress: (data: any) =>
    apiService.post(API_ENDPOINTS.members.updateAddress, data),

  updateBankInfo: (data: any) =>
    apiService.post(API_ENDPOINTS.members.updateBankInfo, data),

  getPaymentHistory: (params?: any) =>
    apiService.get(`${API_ENDPOINTS.members.paymentHistory}${params ? `?${new URLSearchParams(params)}` : ''}`),
};

export const societyApi = {
  getInfo: () =>
    apiService.get(API_ENDPOINTS.society.info),
};

export const eventApi = {
  getEvents: (params?: any) =>
    apiService.get(`${API_ENDPOINTS.events.list}${params ? `?${new URLSearchParams(params)}` : ''}`),
    
  registerForEvent: (eventId: string) =>
    apiService.post(API_ENDPOINTS.events.register(eventId)),
    
  unregisterFromEvent: (eventId: string) =>
    apiService.delete(API_ENDPOINTS.events.unregister(eventId)),
};

export const documentApi = {
  getDocuments: () =>
    apiService.get(API_ENDPOINTS.documents.list),
    
  uploadDocument: (file: File, type: string, description?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    if (description) formData.append('description', description);

    return apiService.upload(API_ENDPOINTS.documents.upload, formData, {
      'X-API-Key': API_CONFIG.apiKey,
    });
  },
    
  deleteDocument: (documentId: string) =>
    apiService.delete(API_ENDPOINTS.documents.delete(documentId)),

  // Send document via email
  sendDocumentEmail: (data: { email: string; subject: string; message: string; file?: File }) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('message', data.message);

    if (data.file) {
      formData.append('file', data.file);
    }

    return apiService.post(API_ENDPOINTS.documents.sendEmail, formData);
  },
};
