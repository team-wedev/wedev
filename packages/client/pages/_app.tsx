import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'isomorphic-unfetch';
import jwt from 'jsonwebtoken';
import {
  ClientContextProvider as FetchingProvider,
  QueryResponse,
} from 'react-fetching-library';
import Cookies from 'universal-cookie';

import { client } from '../libs/fetching';
import { UserProvider } from '../components/UserProvider';

const theme = {};

declare module 'next' {
  export interface NextPageContext {
    isLoggedIn: boolean;
  }
}

interface AppProps {
  cacheItems: {
    [key: string]: QueryResponse;
  };
  user: User;
}

interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
}

interface Token {
  data: {
    sessionId: string;
    userPublicInfo: User;
  };
  iat: number;
  exp: number;
}

class MyApp extends App<AppProps> {
  public static async getInitialProps(appContext) {
    const props = {
      cacheItems: client.cache.getItems(),
      user: null,
    };

    if (appContext.ctx.req) {
      const cookies = new Cookies(appContext.ctx.req.headers.cookie);
      const token = cookies.get(process.env.JWT_SESSION_TOKEN_KEY);

      try {
        const {
          data: { userPublicInfo },
        } = jwt.verify(token, process.env.JWT_SECRET) as Token;
        props.user = userPublicInfo;
        appContext.ctx.isLoggedIn = true;
      } catch (err) {
        appContext.ctx.isLoggedIn = false;
      }
    }

    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      ...props,
    };
  }

  public render() {
    const { Component, pageProps, cacheItems, user } = this.props;

    client.cache.setItems(cacheItems);

    return (
      <FetchingProvider client={client}>
        <ThemeProvider theme={theme}>
          <UserProvider user={user}>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </FetchingProvider>
    );
  }
}

export default MyApp;
