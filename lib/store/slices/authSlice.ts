import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService, { 
  LoginCredentials, 
  StartupRegistrationData, 
  IncubatorRegistrationData, 
  AuthResponse,
  EmailValidationResponse,
  OTPResendResponse,
  StartupData,
  StartupResponse,
  GetAllStartupsParams,
  GetAllStartupsResponse,
  GetAllIncubatorsParams,
  GetAllIncubatorsResponse,
  IncubatorResponse,
  IncubatorData
} from '../../services/authService';

interface AuthState {
  user: {
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
  } | null;
  isLoading: boolean;
  error: string | null;
  isEmailValidated: boolean;
  otpMessage: string | null;
  // New state for startup APIs
  startups: StartupResponse[];
  totalStartups: number;
  currentPage: number;
  totalPages: number;
  startupLoading: boolean;
  startupError: string | null;
  // New state for incubator APIs
  incubators: IncubatorResponse[];
  totalIncubators: number;
  incubatorCurrentPage: number;
  incubatorTotalPages: number;
  incubatorLoading: boolean;
  incubatorError: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isEmailValidated: false,
  otpMessage: null,
  // New initial state for startup APIs
  startups: [],
  totalStartups: 0,
  currentPage: 1,
  totalPages: 0,
  startupLoading: false,
  startupError: null,
  // New initial state for incubator APIs
  incubators: [],
  totalIncubators: 0,
  incubatorCurrentPage: 1,
  incubatorTotalPages: 0,
  incubatorLoading: false,
  incubatorError: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerStartup = createAsyncThunk(
  'auth/registerStartup',
  async (data: StartupRegistrationData, { rejectWithValue }) => {
    try {
      const response = await authService.registerStartup(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Startup registration failed');
    }
  }
);

export const registerIncubator = createAsyncThunk(
  'auth/registerIncubator',
  async (data: IncubatorRegistrationData, { rejectWithValue }) => {
    try {
      const response = await authService.registerIncubator(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Incubator registration failed');
    }
  }
);

// New async thunks for startup APIs
export const registerStartupCompany = createAsyncThunk(
  'auth/registerStartupCompany',
  async (data: StartupData, { rejectWithValue }) => {
    try {
      const response = await authService.registerStartupCompany(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Startup company registration failed');
    }
  }
);

// New async thunk for incubator company registration
export const registerIncubatorCompany = createAsyncThunk(
  'auth/registerIncubatorCompany',
  async (data: IncubatorData, { rejectWithValue }) => {
    try {
      const response = await authService.registerIncubatorCompany(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Incubator company registration failed');
    }
  }
);

export const getAllStartups = createAsyncThunk(
  'auth/getAllStartups',
  async (params: GetAllStartupsParams = {}, { rejectWithValue }) => {
    try {
      const response = await authService.getAllStartups(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch startups');
    }
  }
);

export const getAllIncubators = createAsyncThunk(
  'auth/getAllIncubators',
  async (params: GetAllIncubatorsParams = {}, { rejectWithValue }) => {
    try {
      const response = await authService.getAllIncubators(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch incubators');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const validateEmail = createAsyncThunk(
  'auth/validateEmail',
  async (otp: string, { rejectWithValue }) => {
    try {
      const response = await authService.validateEmail(otp);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Email validation failed');
    }
  }
);

export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.resendOTP();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to resend OTP');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOTPMessage: (state) => {
      state.otpMessage = null;
    },
    clearStartupError: (state) => {
      state.startupError = null;
    },
    clearIncubatorError: (state) => {
      state.incubatorError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Startup Registration
      .addCase(registerStartup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerStartup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerStartup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Incubator Registration
      .addCase(registerIncubator.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerIncubator.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerIncubator.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // New Startup Company Registration
      .addCase(registerStartupCompany.pending, (state) => {
        state.startupLoading = true;
        state.startupError = null;
      })
      .addCase(registerStartupCompany.fulfilled, (state, action) => {
        state.startupLoading = false;
        // Optionally add the new startup to the list
        state.startups.unshift(action.payload);
      })
      .addCase(registerStartupCompany.rejected, (state, action) => {
        state.startupLoading = false;
        state.startupError = action.payload as string;
      })
      // New Incubator Company Registration
      .addCase(registerIncubatorCompany.pending, (state) => {
        state.incubatorLoading = true;
        state.incubatorError = null;
      })
      .addCase(registerIncubatorCompany.fulfilled, (state, action) => {
        state.incubatorLoading = false;
        // Optionally add the new incubator to the list
        state.incubators.unshift(action.payload);
      })
      .addCase(registerIncubatorCompany.rejected, (state, action) => {
        state.incubatorLoading = false;
        state.incubatorError = action.payload as string;
      })
      // New Get All Startups
      .addCase(getAllStartups.pending, (state) => {
        state.startupLoading = true;
        state.startupError = null;
      })
      .addCase(getAllStartups.fulfilled, (state, action) => {
        state.startupLoading = false;
        state.startups = action.payload as unknown as StartupResponse[];
      })
      .addCase(getAllStartups.rejected, (state, action) => {
        state.startupLoading = false;
        state.startupError = action.payload as string;
      })
      // New Get All Incubators
      .addCase(getAllIncubators.pending, (state) => {
        state.incubatorLoading = true;
        state.incubatorError = null;
      })
      .addCase(getAllIncubators.fulfilled, (state, action) => {
        state.incubatorLoading = false;
        state.incubators = action.payload as unknown as IncubatorResponse[];
      })
      .addCase(getAllIncubators.rejected, (state, action) => {
        state.incubatorLoading = false;
        state.incubatorError = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          email: action.payload.email,
          logged_in: action.payload.logged_in,
          profile_pic: action.payload.profile_pic,
          role: action.payload.role,
          startup_id: action.payload.startup_id || null,
          incubator_id: action.payload.incubator_id || null,
          user_firstname: action.payload.user_firstname,
          user_lastname: action.payload.user_lastname,
          user_type: action.payload.user_type,
          verified: action.payload.verified,
        };
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Email Validation
      .addCase(validateEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEmailValidated = true;
        state.otpMessage = action.payload.message;
      })
      .addCase(validateEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Resend OTP
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otpMessage = action.payload.message;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearOTPMessage, clearStartupError, clearIncubatorError } = authSlice.actions;
export default authSlice.reducer;
