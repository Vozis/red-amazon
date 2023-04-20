import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';

import logoImage from '@/assets/images/favicon.ico';

interface ISeo {
  title: string;
  description?: string;
  image?: string;
}

export const titleMerge = (title: string) => `${title} | Amazon-red`;

const Meta: FC<PropsWithChildren<ISeo>> = ({
  children,
  image,
  description,
  title,
}) => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.APP_URL}${asPath}`;

  return (
    <>
      <Head>
        <title itemProp={'headline'}>{titleMerge(title)}</title>
        {description ? (
          <>
            <meta
              name="description"
              content={description}
              itemProp={'description'}
            />
            <link rel={'canonical'} href={currentUrl} />
            <meta property={'og:locale'} content={'en'} />
            <meta property="og:title" content={titleMerge(title)} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image || '/favicon.ico'} />
            <meta property={'og:url'} content={currentUrl} />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Head>
      {children}
    </>
  );
};

export default Meta;
