import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'NanumSquare', sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    font-family: 'NanumSquare', sans-serif;
    height: 100%;
    font-size: 10px;
  }

  #__next {
    height: 100%;
  }
`;

export default GlobalStyles;
