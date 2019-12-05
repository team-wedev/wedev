import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import { SearchSVG } from '../../svgs';

import Layout from '../../components/Layout';
import CircularProgress from '../../components/CircularProgress';
import { endpoint, searchOptions } from '../../constants';
import { useSearchTags } from './hooks';

const SearchedTags: React.FunctionComponent = () => {
  const router = useRouter();
  const searchKeyword = router.query.keyword;

  const [page, setPage] = useState(1);

  const activeSearch = searchOptions[3].value;

  const { tags, tagHasMore, tagHasData } = useSearchTags(page, searchKeyword);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const routerObject = (queryKeyword, num) => {
    if (num === 0) {
      return {
        pathname: `${endpoint.search}`,
        query: { keyword: queryKeyword },
      };
    }
    return {
      pathname: `${endpoint.search}/${searchOptions[num].value}`,
      query: { keyword: queryKeyword },
    };
  };

  const handleFilterClick = value => {
    setPage(1);
    if (value === searchOptions[0].value) {
      router.push(routerObject(searchKeyword, 0));
    }
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

  const loader = <CircularProgress size={28} thickness={4.5} />;

  return (
    <Layout drawer={false}>
      <S.Container>
        <S.ContainerGrid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            <S.Title>
              <SearchSVG width={23} height={24} />
              <span>"{searchKeyword}" 검색 결과</span>
            </S.Title>

            <S.StyledTabs
              items={searchOptions}
              activeValue={activeSearch}
              onClick={handleFilterClick}
            />
            <S.Line />

            {tagHasData ? (
              <S.StyledInfiniteScroll
                dataLength={tags.length}
                next={handlePageChange}
                hasMore={tagHasMore}
                loader={<CircularProgress size={28} thickness={4.5} />}
              >
                <S.Subject> 태그 </S.Subject>
                <S.Tags>
                  {tags.map(tag => {
                    return (
                      <div key={tag.id}>
                        <S.Tag>{tag.name}</S.Tag>;
                      </div>
                    );
                  })}
                </S.Tags>
              </S.StyledInfiniteScroll>
            ) : (
              loader
            )}
          </Grid>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default SearchedTags;
