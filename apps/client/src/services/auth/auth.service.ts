import axios from 'axios';
import Cookies from 'js-cookie';
import * as process from 'process';

import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface';

import { CookieEnum } from '@/types/cookie.enum';

import { getContentType } from '@/api/api.helper';
import { axiosClassic, instance } from '@/api/api.interceptor';

import { saveToStorage } from '@/services/auth/auth.helper';
import { AuthEnum, IAuthType } from '@/services/auth/auth.type';

export const AuthService = {
  async main(type: IAuthType, data: IEmailPassword) {
    const response = await axiosClassic<IAuthResponse>({
      url: `auth/${type.category}`,
      method: 'POST',
      data,
    });

    if (response.data.accessToken) saveToStorage(response.data);

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(CookieEnum.REFRESH_TOKEN);

    const response = await axiosClassic.post<string, { data: IAuthResponse }>(
      'auth/get-new-tokens',
      { refreshToken },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
