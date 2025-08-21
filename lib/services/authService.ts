import api from '../api/axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface BaseRegistrationData {
  firstname: string;
  lastname: string;
  email: string;
  country_code: string;
  phone: string;
  profile_picture?: string;
  password: string;
}

export type StartupRegistrationData = BaseRegistrationData;
export type IncubatorRegistrationData = BaseRegistrationData;

// New interfaces for startup APIs
export interface StartupData {
  name: string;
  logo?: File | string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

// New interface for incubator registration API
export interface IncubatorData {
  name: string;
  logo?: File | string;
  campus_name: string;
  address: string;
  country_code: string;
  phone: string;
  email: string;
  website: string;
}

export interface StartupResponse {
  id: string;
  name: string;
  logo: string | null;
  address: string;
  phone: string;
  email: string;
  website: string;
  created_at: string;
  updated_at: string;
}

export interface GetAllStartupsParams {
  count?: number;
  page_no?: number;
  sort_by?: string;
  search?: string;
}

export interface GetAllStartupsResponse {
  startups: StartupResponse[];
  total_count: number;
  current_page: number;
  total_pages: number;
}

export interface GetAllIncubatorsParams {
  count?: number;
  page_no?: number;
  sort_by?: string;
  search?: string;
}

export interface IncubatorResponse {
  id: string;
  name: string;
  logo: string | null;
  campus_name: string;
  address: string;
  country_code: string;
  phone: string;
  email: string;
  website: string;
  created_at: string;
  updated_at: string;
}

export interface GetAllIncubatorsResponse {
  incubators: IncubatorResponse[];
  total_count: number;
  current_page: number;
  total_pages: number;
}

export interface AuthResponse {
  email: string;
  logged_in: boolean;
  profile_pic: string | null;
  role: string;
  startup_id: string | null;
  incubator_id: string | null;
  user_firstname: string;
  user_lastname: string;
  user_type: string;
  verified: boolean;
}

export interface EmailValidationResponse {
  message: string;
}

export interface OTPResendResponse {
  message: string;
}

const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  registerStartup: async (data: StartupRegistrationData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    const response = await api.post<AuthResponse>('/startup_user/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  registerIncubator: async (data: IncubatorRegistrationData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    const response = await api.post<AuthResponse>('/incubator_user/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // New startup registration API
  registerStartupCompany: async (data: StartupData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });
    const response = await api.post<StartupResponse>('/startup/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // New incubator registration API
  registerIncubatorCompany: async (data: IncubatorData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });
    const response = await api.post<IncubatorResponse>('/incubator/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // New get all startups API
  getAllStartups: async (params: GetAllStartupsParams = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.count !== undefined) queryParams.append('count', params.count.toString());
    if (params.page_no !== undefined) queryParams.append('page_no', params.page_no.toString());
    if (params.sort_by !== undefined) queryParams.append('sort_by', params.sort_by);
    if (params.search !== undefined) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const url = `/all/startups${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<GetAllStartupsResponse>(url);
    return response.data;
  },

  // New get all incubators API
  getAllIncubators: async (params: GetAllIncubatorsParams = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.count !== undefined) queryParams.append('count', params.count.toString());
    if (params.page_no !== undefined) queryParams.append('page_no', params.page_no.toString());
    if (params.sort_by !== undefined) queryParams.append('sort_by', params.sort_by);
    if (params.search !== undefined) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const url = `/all/incubators${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<GetAllIncubatorsResponse>(url);
    return response.data;
  },

  validateEmail: async (otp: string) => {
    const response = await api.post<EmailValidationResponse>(`/validate_email/${otp}`);
    return response.data;
  },

  resendOTP: async () => {
    const response = await api.post<OTPResendResponse>('/resend_otp');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get<AuthResponse>('/');
    return response.data;
  },
};

export default authService;
