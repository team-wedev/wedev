import styled from 'styled-components';

import MaterialGrid from '@material-ui/core/Grid';

import { BREAKPOINT, fontWeight } from '../../constants';
import Tabs from '../../components/Tabs';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Container = styled.div`
  position: relative;
`;

export const Videos = styled.div`
  padding: 2rem 0rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 3rem 0;
  }
`;

export const Title = styled.div`
  font-size: 2rem;
  color: white;
  font-weight: ${fontWeight.bold};
  margin-bottom: 2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }
`;

export const StyledTabs = styled(Tabs)`
  margin-bottom: 2rem;
`;

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  height: auto;
  overflow: visible !important;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerGrid = styled(MaterialGrid)`
  && {
    margin-bottom: 0.8rem;
    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: calc(100% + 24px);
      margin: -12px;
      margin-bottom: 1.2rem;
    }
  }

  && > .MuiGrid-item {
    @media only screen and (min-width: ${BREAKPOINT}px) {
      padding: 12px;
    }
  }
`;
