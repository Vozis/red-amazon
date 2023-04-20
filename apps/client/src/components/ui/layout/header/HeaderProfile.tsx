import Image from 'next/image';
import { FC } from 'react';

import { useProfile } from '@/hooks/useProfile';

const HeaderProfile: FC = () => {
  const { profile } = useProfile();

  return (
    <div>
      {profile?.avatarPath && (
        <Image
          src={profile?.avatarPath}
          alt={'profile'}
          width={45}
          height={45}
          className={
            'rounded-full border border-primary border-solid animate-opacity'
          }
        />
      )}
    </div>
  );
};

export default HeaderProfile;
