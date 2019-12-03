export const LATEST = 'latest';
export const POPULAR = 'popular';

export const PERIODS = {
  week: 'week',
  month: 'month',
  year: 'year',
  all: 'all',
};

export const MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS = {
  week: [7, 'days'],
  month: [1, 'months'],
  year: [1, 'years'],
};

export const MOMENT_DATETIME_FORMAT = 'YYYY-MM-DD HH:MM:ss';

export const VIDEO_ITEMS_PER_PAGE = 20;
export const SEARCHED_ITEM_NUMBER = 5;
export const VIDEO_QUERY_SELECT_COLUMNS = [
  'Video.id',
  'Video.title',
  'Video.description',
  'Video.sourceUrl',
  'Video.thumbnail',
  'Video.playtime',
  'Video.likedUsersCount',
  'Video.commentsCount',
  'Video.views',
  'Video.popularity',
  'Video.createdAt',
  'Video.updatedAt',
];
