import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { FiLogOut } from 'react-icons/fi';

import Loader from '@/ui/input/Loader';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import { ICategory } from '@/types/category.interface';

import { CategoryService } from '@/services/category.service';

const Sidebar: FC<PropsWithChildren<unknown>> = () => {
  const { query } = useRouter();

  const { user } = useAuth();
  const { logout } = useActions();

  const { data: categories, isLoading } = useQuery(
    ['get categories'],
    () => CategoryService.getAll(),
    {
      select: ({ data }) => data,
    },
  );

  return (
    <aside
      className={'bg-secondary text-white px-5 flex flex-col justify-between'}
      style={{
        height: 'calc(100vh-91px)',
      }}
    >
      <div>
        {isLoading ? (
          <Loader />
        ) : categories ? (
          <>
            <h2 className={'mb-3'}>Categories: 👇</h2>
            <ul>
              {categories.map(category => (
                <li key={category.id}>
                  <Link
                    className={cn(
                      category.slug === query.slug
                        ? 'text-primary text-xl font-semibold'
                        : 'text-white',
                      'inline-block hover:text-primary transition-all duration-200 ease-in-out py-1 px-4',
                    )}
                    href={`/category/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Categories not found</p>
        )}
      </div>

      {!!user && (
        <button
          onClick={() => logout()}
          className={'text-white flex items-center gap-2 mb-7'}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
