export const TranscoderNotificationState = {
  progressing: 'PROGRESSING',
  completed: 'COMPLETED',
  warning: 'WARNING',
  error: 'ERROR',
};

export const endpoint = {
  auth: 'auth',
  githubLogin: '/github/login',
  users: 'users',
};

export const clientPath = {
  signUp: 'http://localhost:3000/auth/signup',
  main: 'http://localhost:3000',
};

export const SESSION_TOKEN = 'SessionToken';
export const GITHUB_USER_DETAIL = 'GithubUserDetail';

export const ONE_DAY_MILLISECONDS = 24 * 3600 * 1000;
export const ONE_HOUR__MILLISECONDS = 3600 * 1000;

export const ONE_DAY_SECONDS = 24 * 3600;
export const ONE_HOUR_SECONDS = 3600;