import { injectGlobal } from 'styled-components'
import theme from './theme'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700|Roboto:400,500,700');

  *, 
  *:before, 
  *:after {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    font-size: 8px;
  }

  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 24px;
    background-color: ${theme.color.background};
  }

  #title-bar {
    -webkit-app-region: drag;
    width: 100%;
    height: ${theme.unit.titleBarHeight};
  }

  #root {
    height: calc(100vh - ${theme.unit.titleBarHeight});
    overflow: hidden;
  }
  
  p {
    margin: 0 0 0.125rem;
  }

  pre, 
  code {
    font-family: 'Roboto Mono', monospace;
    margin: 0;
    padding: 0;
  }
`
