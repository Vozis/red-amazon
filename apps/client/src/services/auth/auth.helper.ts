import Cookies from 'js-cookie';

import { IAuthResponse, ITokens } from '@/store/user/user.interface';

import { CookieEnum } from '@/types/cookie.enum';

export const getAccessToken = () => {
  const accessToken = Cookies.get(CookieEnum.ACCESS_TOKEN);
  return accessToken || null;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(CookieEnum.REFRESH_TOKEN);
  return refreshToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem(CookieEnum.USER || '{}'));
};

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set(CookieEnum.ACCESS_TOKEN, data.accessToken);
  Cookies.set(CookieEnum.REFRESH_TOKEN, data.refreshToken);
};

export const removeFromStorage = () => {
  Cookies.remove(CookieEnum.ACCESS_TOKEN);
  Cookies.remove(CookieEnum.REFRESH_TOKEN);
  localStorage.removeItem(CookieEnum.USER);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem(CookieEnum.USER, JSON.stringify(data.user));
};
