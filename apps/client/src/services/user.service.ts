import { IFullUser, IUser } from '@/types/user.interface';

import { getContentType } from '@/api/api.helper';
import { instance } from '@/api/api.interceptor';

const USER = 'users';

export const UserService = {
  async getProfile() {
    return instance<IFullUser>({
      method: 'GET',
      url: `${USER}/profile`,
    });
  },

  async updateProfile(data: Partial<IUser>) {
    return instance<IFullUser>({
      method: 'PUT',
      url: `${USER}/profile`,
      headers: getContentType(),
      data,
    });
  },

  async toggleFavorites(productId: string | number) {
    return instance<IFullUser>({
      method: 'PATCH',
      url: `${USER}/profile/favorites/${productId}`,
      headers: getContentType(),
    });
  },
};
