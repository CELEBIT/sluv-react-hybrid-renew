/**
[SVG 파일을 import하는 방법을 정의]
- declare module : TypeScript에서 모듈 선언을 할 때 사용하는 구문
- "*.svg" : 확장자가 .svg인 파일에 대한 모듈 선언을 하겠다는 것을 의미
- .svg 파일 import 예시 : import ReactComponent from './image.svg'
 */
declare module '*.svg' {
  import React = require('react')

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
