import styled from 'styled-components';
import MaterialGrid from '@material-ui/core/Grid';

import { BREAKPOINT, fontWeight } from '../../constants';

export const SignUp = styled.div`
  height: 100%;
  user-select: none;
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 8rem 2rem 4rem 2rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 12rem 0 4rem 0;
    max-width: 120rem;
  }
`;

export const ContainerGrid = styled(MaterialGrid)`
  && {
    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: calc(100% + 24px);
      margin: -12px;
    }
  }

  && > .MuiGrid-item {
    @media only screen and (min-width: ${BREAKPOINT}px) {
      padding: 12px;
    }
  }
`;

export const HeadMessage = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-size: 2.8rem;
  font-weight: ${fontWeight.extraBold};
  margin-bottom: 5.5rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 6rem;
    font-size: 3.2rem;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  vertical-align: top;
`;

export const RequireMark = styled.div`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: #02cf5d;
  margin: 0rem 0rem 0.9rem 0.2rem;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3rem;
  width: 100%;

  input[type='text'] {
    display: block;
    background-color: #484c50;
    width: 100%;
    height: 5rem;
    border: none;
    font-size: 1.6rem;
    border-radius: 0.5rem;
    color: white;
    padding: 1rem;
  }
  input[type='checkbox'] {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #484c50;
    font-size: 1.6rem;
    margin: 0;
    margin-right: 1rem;
    vertical-align: middle;
    cursor: pointer;
  }

  textarea {
    display: block;
    width: 100%;
    height: 12rem;
    font-size: 1.6rem;
    resize: unset;
    background-color: #484c50;
    border: none;
    border-radius: 0.5rem;
    color: white;
    padding: 1rem;
  }

  > span {
    display: ${props => (props.valid ? 'none' : 'inline')};
    margin-top: 1rem;
    font-size: 1.4rem;
    font-weight: ${fontWeight.bold};
    color: #e52528;
  }
`;

export const Label = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
  label {
    color: white;
    font-size: 1.6rem;
    font-weight: ${fontWeight.bold};
    margin-right: 0.5rem;
  }
  span {
    display: inline-block;
    color: white;
    font-size: 1.4rem;
    opacity: 0.7;
  }
  .agreement {
    display: inline-block;
    color: #ffffffb3;
    font-size: 1.6rem;
    font-weight: ${fontWeight.bold};
    vertical-align: middle;
    u {
      cursor: pointer;
      color: white;
    }
  }
`;

export const SubmitButton = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  button {
    width: 15.8rem;
    height: 4.4rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-weight: ${fontWeight.bold};
    color: white;
    background-color: #02cf5d;
    cursor: pointer;
  }
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-top: 2rem;
  }
`;
