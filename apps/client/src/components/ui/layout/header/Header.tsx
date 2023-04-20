import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import HeaderCart from '@/ui/layout/cart/HeaderCart';
import HeaderProfile from '@/ui/layout/header/HeaderProfile';
import Search from '@/ui/search/Search';

import logoImage from '@/assets/images/logo.svg';

const Header: FC = () => {
  return (
    <header
      className={'bg-secondary w-full text-white py-6 px-4 grid gap-10'}
      style={{
        gridTemplateColumns: '1fr 3fr 1.2fr',
      }}
    >
      <Link href={'/'} className={''}>
        <Image src={logoImage} alt={'logo'} priority />
      </Link>
      <Search />
      <div className={'flex gap-5 items-center'}>
        <Link href={'/favorites'} className={'text-white'}>
          <AiOutlineHeart size={28} />
        </Link>
        <HeaderCart />
        <HeaderProfile />
      </div>
    </header>
  );
};

export default Header;
