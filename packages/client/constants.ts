export const MOBILE = 'mobile';
export const DESKTOP = 'desktop';
export const BREAKPOINT = 960;
export const MAX_WIDTH = 1200;
export const EVENT = {
  resize: 'resize',
};
export const LEFT = 'left';
export const TOP = 'top';
export const PERSISTENT = 'persistent';

export const TAGS_PER_PAGE = 24;
export const HOTLIST_VIDEOS_PER_PAGE = 20;
export const LATEST_VIDEOS_PER_PAGE = 20;
export const USER_VIDEOS_PER_PAGE = 12;
export const COMMENTS_PER_PAGE = 5;

export const fileType = {
  video: 'video',
  image: 'image',
};

export const fileActions = {
  upload: 'UPLOAD',
};

export const userActions = {
  logout: 'LOGOUT',
};

export const endpoint = {
  tags: '/tags',
  hotlist: '/',
  latest: '/latest',
  uploadVideoFile: '/videos/upload/file',
  uploadVideoDetail: '/videos/upload/detail',
  search: '/search',
  login: '/auth/login',
  users: '/users',
  profileEdit: '/profile/edit',
};

export const SERVER_ENDPOINT = {
  VIDEO_UPLOAD: '/videos/upload',
};

export const periods = {
  week: 'week',
  month: 'month',
  year: 'year',
  all: 'all',
};

export const periodOptions = [
  {
    label: '일주일',
    value: periods.week,
  },
  {
    label: '한달',
    value: periods.month,
  },
  {
    label: '일년',
    value: periods.year,
  },
  {
    label: '전체',
    value: periods.all,
  },
];

export const sortOptions = [
  {
    label: '인기 순',
    value: 'popular',
  },
  {
    label: '최신 순',
    value: 'latest',
  },
];

export const fontWeight = {
  regular: 400,
  bold: 700,
  extraBold: 800,
};

export const signUpFormDataMaxLength = {
  username: 30,
  description: 1500,
};

export const regex = {
  // username은 영문 대소문자, 숫자, 띄어쓰기, 한글을 1~30자 포함한다.
  userName: /^[\s0-9a-zA-Z\u3131-\uD79D]{1,30}$/iu,
};

export const debounceTime = {
  userName: 300,
};

export const orientation = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};
export const VIDEO_FORM_DATA_MAX_LENGTH = {
  TITLE: '45',
  DESCRIPTION: '3000',
  TAGS: 10,
};

export const MAX_TAGS_NUMBER = 10;

export const ALLOWED_CHARS = ['.', '#', '-'];

export const SPACEBAR = ' ';

export const TITLE = 'title';
export const DESCRIPTION = 'description';

export const VIDEO_TYPE = 'video/mp4,video/x-m4v,video/*';
