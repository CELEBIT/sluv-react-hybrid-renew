<div align="center">
<h1 align="center">Sluv React Project</h1>

![version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

</div>

## 목차

- [권장버전](#권장버전)
- [설치방법](#설치방법)
- [실행방법](#실행방법)
- [빌드방법](#빌드방법)
- [프로젝트 구조](#프로젝트-구조)
- [커밋 컨벤션](#커밋-컨벤션)

## 권장버전

```sh
npm -v
# 8.5.5

node -v
# v16.15.0
```

## 설치방법

```sh
npm install -g eslint prettier
# lint 와 prettier 가 작동 할 수 있도록 global 로 설치해주세요.

npm i
```

## 실행방법

```sh
npm run start # 로컬에서 실행
```

## 빌드방법

```sh

```

## 프로젝트 구조

```text
> .husky                    # git hook 을 실행시켜주는 폴더 (수정X)
> public
    > favicon.ico           # 브라우저 탭에 나오는 아이콘 파일
    > index.html            # React 소스를 랜더링하기 위한 Root DOM
    > manifest.json         # index.html 에 쓰일 값들 정의
> src
    > apis
        > core
            > index.ts      # axios 사용시 request, response 설정 파일
        > businessModel.ts  # 리소스 단위로 파일을 만들어서 API 를 호출하도록 관리
    > assets                # jpg, png, svg 등 이미지 에셋 폴더
        > ...
    > components            # 반복적으로 쓰이는 컴포넌트 폴더
        > ...
    > config                # 프로젝트 내에 사용되는 설정 파일 폴더
        > constant.ts       # 상수 파일
    > models                # API Request, Response 에 쓰이는 모델 클래스 폴더
        ...
    > pages                 # 화면별 폴더를 만들고 index.ts, styles.tsx 로 html, css 파일 분리
        > ...
    > utils                 # 공통적으로 쓰이는 함수 모음 유틸 폴더
        > ...
    App.tsx
    index.tsx               # 프로젝트 Root 파일
    routes.ts               # 프로젝트 Routing 정의 파일
.env
.eslintrc.json              # 코드 퀄리티를 통일하기 위한 lint 설정 파일
.gitignore
.gitmessage.txt
.prettierrc                 # 코드 컨벤션을 통일하기 위한 prettier 설정 파일
package-lock.json
package.json                # node 모듈을 설치하고 실행, 빌드하는 명령어와 설정 모음 파일
README.md
svg.d.ts                    # svg 파일을 ts 에서 불러올 수 있도록 하는 설정 파일
tsconfig.json               # typescript 를 javascript 로 변환하는 설정 파일
```

# 커밋 컨벤션

**제목**

- [#이슈번호] <타입> : <제목> 의 형식으로 제목 작성
- 제목은 50자 이내 / 변경사항이 "무엇"인지 명확히 작성 / 끝에 마침표 금지
- 예) [#7] feat : 로그인 기능 추가

**커밋 타입**

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우
- refactor : 코드 리팩터링
- test : 테스트 코드, 리팩터링 테스트 코드 추가(프로덕션 코드 변경 X)
- chore : 빌드 업무 수정, 패키지 매니저 수정(프로덕션 코드 변경 X)
- design : CSS 등 사용자 UI 디자인 변경
- comment : 필요한 주석 추가 및 변경
- rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
- remove : 파일을 삭제하는 작업만 수행한 경우
- !BREAKING CHANGE : 커다란 API 변경의 경우
- !HOTFIX : 급하게 치명적인 버그를 고쳐야 하는 경우
