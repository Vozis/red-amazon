import { createAsyncThunk } from '@reduxjs/toolkit';

import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface';

import { errorCatch } from '@/api/api.helper';

import { removeFromStorage } from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.service';
import { AuthEnum } from '@/services/auth/auth.type';

// export const auth = createAsyncThunk<IAuthResponse, IEmailPassword>(
//   'auth',
//   async (data, thunkAPI) => {
//     try {
//       const response = await AuthService.main('auth', data);
//       return response;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err);
//     }
//   },
// );

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      console.log('register()');
      const response = await AuthService.main(
        { category: AuthEnum.REGISTER },
        data,
      );
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      console.log('login()');
      const response = await AuthService.main(
        { category: AuthEnum.LOGIN },
        data,
      );
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  removeFromStorage();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/check-auth',
  async (_, thunkAPI) => {
    try {
      console.log('checkAuth()');
      const response = await AuthService.getNewTokens();
      return response.data;
    } catch (err) {
      if (errorCatch(err === 'jwt expired')) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(err);
    }
  },
);
