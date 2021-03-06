import styled from 'styled-components';
import { BREAKPOINT, fontWeight } from '../../constants';

export const Subject = styled.div`
  padding-top: 2rem;
  margin-bottom: 2rem;
  color: white;
  font-size: 2.2rem;
  font-weight: ${fontWeight.bold};
  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding-top: 3rem;
    margin-bottom: 3rem;
  }
`;

export const Tag = styled.span`
  display: inline-block;
  user-select: none;
  padding: 0rem 2rem;
  height: 3.4rem;
  line-height: 3.4rem;
  font-size: 1.6rem;
  font-weight: ${fontWeight.bold};
  color: white;
  background: #484c50;
  border-radius: 10rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

export const User = styled.div`
  margin-bottom: 2rem;
  a {
    display: inline-block;
  }
`;

export const Avatar = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 1.6rem;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    background-color: red;
    vertical-align: middle;
    cursor: pointer;
  }
`;

export const Username = styled.div`
  display: inline-block;
  vertical-align: middle;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  font-size: 1.6rem;
  font-weight: ${fontWeight.bold};
`;

export const Videos = styled.div`
  margin-bottom: 2rem;
`;
