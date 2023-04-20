import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';

import { IFullUser } from '@/types/user.interface';

import { errorCatch } from '@/api/api.helper';

import { UserService } from '@/services/user.service';

export const useProfile = () => {
  const { user } = useAuth();
  const { data } = useQuery(['get profile'], () => UserService.getProfile(), {
    select: ({ data }) => data,
    onError: error => {
      console.log(errorCatch(error));
    },
    enabled: !!user,
  });

  return { profile: data };
};
