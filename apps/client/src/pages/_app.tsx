import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AuthProvider from '@/providers/auth-provider/AuthProvider';
import { TypeComponentAuthFields } from '@/providers/auth-provider/auth-page.type';

import '@/assets/styles/styles.scss';

import { persistor, store } from '@/store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function CustomApp({
  Component,
  pageProps,
}: AppProps & TypeComponentAuthFields) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider Component={{ isOnlyUser: Component.isOnlyUser }}>
            <Head>
              <title>Welcome to client!</title>
            </Head>
            <main className="app">
              <Component {...pageProps} />
            </main>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default CustomApp;
