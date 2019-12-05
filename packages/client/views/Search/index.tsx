import React from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';

import Layout from '../../components/Layout';
import {
  SearchedVideos,
  SearchedUsers,
  SearchedTags,
  SearchedTitle,
  ViewMore,
} from '../../components/Searched';

import { endpoint, searchOptions } from '../../constants';
import { useSearchVideos, useSearchUsers, useSearchTags } from './hooks';

const Searched: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;

  const page = undefined;

  const { videos, videoCount } = useSearchVideos(page, searchKeyword);
  const { users, userCount } = useSearchUsers(page, searchKeyword);
  const { tags, tagCount } = useSearchTags(page, searchKeyword);

  const countArray = [
    { label: '영상', value: 'videos', count: videoCount },
    { label: '사용자', value: 'users', count: userCount },
    { label: '태그', value: 'tags', count: tagCount },
  ];

  const customSearchOptions = countArray.reduce((acc, cur) => {
    if (cur.count) {
      acc.push({ label: cur.label, value: cur.value });
    }
    return acc;
  }, []);

  if (videoCount && userCount && tagCount) {
    customSearchOptions.unshift({ label: '모두', value: 'all' });
  }

  const activeSearch =
    customSearchOptions[0] === undefined ? 'all' : customSearchOptions[0].value;

  const routerObject = (queryKeyword, num) => ({
    pathname: `${endpoint.search}/${searchOptions[num].value}`,
    query: { keyword: queryKeyword },
  });

  const handleFilterClick = value => {
    if (value === searchOptions[1].value) {
      router.push(routerObject(searchKeyword, 1));
    }
    if (value === searchOptions[2].value) {
      router.push(routerObject(searchKeyword, 2));
    }
    if (value === searchOptions[3].value) {
      router.push(routerObject(searchKeyword, 3));
    }
  };

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            <SearchedTitle searchKeyword={searchKeyword} />

            <S.StyledTabs
              items={customSearchOptions}
              activeValue={activeSearch}
              onClick={handleFilterClick}
            />
            <S.Line />

            {videoCount > 0 && (
              <>
                <SearchedVideos videos={videos} />
                <ViewMore searchKeyword={searchKeyword} num={1} />
                <S.Line />
              </>
            )}

            {userCount > 0 && (
              <>
                <SearchedUsers users={users} />
                <ViewMore searchKeyword={searchKeyword} num={2} />
                <S.Line />
              </>
            )}

            {tagCount > 0 && (
              <>
                <SearchedTags tags={tags} />
                <ViewMore searchKeyword={searchKeyword} num={3} />
                <S.Line />
              </>
            )}
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Searched;
