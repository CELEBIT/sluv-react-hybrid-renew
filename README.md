# Sluv Frontend
![Group 37271](https://github.com/ezenjun/ezenjun/assets/44547064/9596eb2a-f9e6-4be7-8a77-ce11d56ce580)
<br/><br/>
[![Google Play](https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg)](https://PlayBadges.pavi2410.me/badge/full?id=com.sluv&hl=ko)
[![Apple App Store](https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg)]([YOUR_APP_STORE_URL](https://apps.apple.com/kr/app/%EC%8A%A4%EB%9F%BD-sluv/id1635250785))
<br/><br/>

## Detailed Roles
[박준용](https://github.com/ezenjun)
- Frontend, React Native
- 전체적인 FE 구조 설정
- 유저, 셀럽, 브랜드, 옷장, 아이템, 질문, 댓글, 공지, 검색 구현
- JS -> TS 마이그레이션
- React Query를 활용한 무한 스크롤 및 데이터 캐싱

<br>

## 2차 MVP 개발(정식버전)

### Webview를 활용한 React 애플리케이션 개발
- 모바일 기기 별로 다른 사이즈를 위해 **반응형으로 개발**했습니다.
- **React-Native**로 정식 버전 Android 기기를 위한 네이티브 앱 또한 개발했습니다
 
      
### JS에서 TS로 변환
- 모듈 간 상호작용의 복잡성이 증가하고, 런타임 오류로 인해 Javascript에서 → **Typescript로 정식 버전을 개발했습니다.**
- 이를 통해 안정적이고 유지보수가 가능한 서비스를 개발할 수 있었습니다.
 
    
### Tanstack-Query 활용
- 데이터가 변화할 때 불필요한 리렌더링이 발생하는 문제를 개선했습니다.
- 기존의 Axios만을 사용해 데이터를 불러올 때는 페이지에 진입할 때마다 데이터를 새로 불러와 서버 자원이 낭비될 수 있다고 생각했습니다.
- Tanstack Query를 도입하여, 쿼리의 Stale, Cache Time을 조절해 불필요한 쿼리를 보내지 않도록 개선하였습니다.
- Intersection Observer와 useInfiniteQuery를 활용해 **무한 스크롤을 안정적으로 지원**합니다.
 
      
### 재사용성 높은 컴포넌트 개발
- 자주 사용되는 컴포넌트를 효율적으로 사용할 수 있게 개발했습니다.
- 관심사 분리를 통해 코드의 가독성을 높이고 확장성 및 성능을 향상 시켰습니다.
- **Google Light House** 기준 높은 성능을 유지하기 위해 노력했습니다.
 
    
 ### React Memo, useCallback 사용 등 기능 최적화
- `React.memo` 를 활용하여 공통으로 사용되는 컴포넌트의 불필요한 리렌더링을 방지했습니다.특히 부모 컴포넌트의 상태 변화에도 props가 변경되지 않은 경우 리렌더링을 스킵하여 성능을 향상시켰습니다.
- `useCallback` 훅을 사용하여 컴포넌트 간 전달되는 콜백 함수의 참조 일관성을 유지했습니다. 이를 통해 불필요한 자식 컴포넌트의 리렌더링을 방지하고 메모리 사용을 최적화했습니다.
- Firebase FCM 푸쉬알림으로 **실시간 알림 개발**

<br/><br/>

## Tech Stack
<div>
    <img alt="Git" src ="https://img.shields.io/badge/Git-F05032.svg?&style=for-the-badge&logo=Git&logoColor=white"/>
    <img alt="Typescript"  src="https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="React"  src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
    <img alt="Recoil" src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" />
    <img alt="StyledComponents" src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
</div>

<br/><br/>

## Native Stack
<div>
    <img alt="React Native"  src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img alt="IOS"  src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white" />
</div>

<br>

# :bookmark: 개요 <a name = "outline"></a>

<details>
   <summary> 본문 확인 (👈 Click)</summary>
<br />
 
  - 셀럽이 사용한 아이템을 따라 구매하는 일이 증가하였습니다. 이에 따라 "손민수 아이템"이라는 단어까지 등장하며 인기는 꾸준히 증가하였습니다.
  - 인기가 증가함에 따라 트위터를 중심으로 다양한 SNS에서 손민수 아이템의 정보를 공유하는 계정들이 등장하였습니다.
  - 하지만 SNS로 공유하다 보니, 검색의 범위도 너무 광범위하며 공유자의 입장에서도 불편함이 발생하였습니다.
  - 검색 속도와 공유 속도 및 편의성을 개선하기 위해 서비스 운영을 하고자 합니다.
  <div align="center">
    <img width="700" alt="sluv_intro1" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/d6bac75b-475d-4054-afa7-582cf1c56009">
    <img width="700" alt="sluv_intro2" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/fd0efd3e-73f1-470f-9dd7-7e177ceee072">
    <img width="700" alt="sluv_intro3" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/53c979f6-665e-4aa5-9b9c-0ebee460f067">
  </div>

</details>

<br>

# :bulb: Solution <a name = "solution"></a>

<details>
   <summary> 본문 확인 (👈 Click)</summary>
<br />

### 획일화된 정보 형식 및 입력폼
- 검색자의 입장에서 다량의 정보를 획일화된 형식으로 얻을 수 있다.
- 공유자의 입장에서 필요한 정보만 입력할 수 있다.
<br> (많은 정보를 하나하나 텍스트로 입력하기 번거롭다는 점 해결)

### 관심 셀럽 및 필터링 기능
  - 검색자의 입장에서 원하는 셀럽의 정보를 중심으로 검색할 수 있다.
  <br>(방탄소년단 진의 티셔츠 -> 다른 셀럽의 티셔츠가 검색됨을 방지)
  - 검색자의 입장에서 필터링을 통해 원하는 조건의 정보만 검색할 수 있다.
  <br>(방탄소년단 진의 티셔츠 -> 다른 셀럽의 티셔츠가 검색됨을 방지)

### 질문 커뮤니티 및 댓글 기능
- 공유자의 입장에서 정보 공유 시 생기는 부담을 줄일 수 있다.
    <br>(혼자 정보를 공유하다 보니 정보 오전달 및 요청사항 수리에 대한 부담을 해결)
- 검색자의 입장에서 여러명에게 답을 들을 수 있으니, 정제된 정보를 얻을 수 있다.
<br><br/>
</details>

<br>

# :building_construction: Architecture <a name = "architecture"></a>

<details>
   <summary> 본문 확인 (👈 Click)</summary>
<br />

### Service Architecture
<br />
<img width="700" alt="service-arch" src="https://github.com/user-attachments/assets/db2bf0c8-8c22-4439-9d6c-054fe638a159">

<br />

### CD Pipe-Line Architecture

<br />
<img width="700" alt="cd-arch" src="https://github.com/user-attachments/assets/a49b8077-9b1e-4cbe-a180-c39f67940561">



</details>

<br>

# :tada: 결과물 <a name = "result"></a>

<details>
   <summary> 본문 확인 (👈 Click)</summary>
<br/>

### 앱 도입
<div align="center">
<img width="700" alt="intro_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/63e9bac9-f139-4940-8cc8-b9f07a8f83c1">
</div>
<br><br/>

- 3개의 소셜 로그인 제공합니다. (카카오, 구글, 애플)
- 약관 등록합니다.
- 프로필 사진, 닉네임을 등록합니다.
- 관심셀럽 선택합니다.

  각 단계에서 앱 종료하는 것을 대비하여 UserStatus를 통해 재접속 시에 첫 단계부터 다시 시작하는 상황을 방지하였습니다.

<br><br/>

### 관심셀럽
<div align="center">
<img width="700" alt="celeb_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/8c0c19ae-bae7-4974-aea6-02773b80cfb8">
</div>
<br><br/>

- 관심셀럽 설정을 통해 관심 있는 셀럽의 정보를 위주로 전달합니다.
- 동명이인 셀럽은 프로필을 통해 구분할 수 있습니다.
- 최대 50명까지 설정 가능합니다.

<br><br/>


### 마이페이지
<div align="center">
<img width="700" alt="mypage_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/bdac5fde-87a3-4385-95e8-b79c0c7fb546">
</div>
<br><br/>

- 유저별 마이페이지 운영.
- 내 마이페이지와 타인의 마이페이지 정보를 다르게 전달해 줍니다.
- 유저가 작성한 아이템, 유저의 옷장, 관심셀럽, 팔로워, 팔로잉 확인할 수 있습니다.
- 자신의 마이페이지에서 자신이 작성한 커뮤니티와 최근 본컨텐츠, 좋아요 한 게시글들을 확인할 수 있습니다.

<br><br/>

   
### 홈
<div align="center">
<img width="700" alt="home_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/f6c9b6f2-d71f-4ba2-9b18-972f6801ea35">
</div>
<br><br/>

- 앱의 홈 화면.
- 여러 셀럽의 아이템을 추천해 줍니다.
- 인기 아이템과 스러버 등을 추천해 줍니다.
- 설정한 관심셀럽들과 관련된 아이템 추천해 줍니다.

<br><br/>

### 커뮤니티 홈
<div align="center">
<img width="700" alt="community_home_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/ffae8e50-f221-4dee-a89d-44f21dcc3fb1">
</div>
<br><br/>

- 커뮤니티의 홈 화면.
- 일간, 주간 인기 커뮤니티 게시글 추천해 줍니다.
- 커뮤니티 게시글 타입별 검색을 할 수 있습니다.
   - 찾아주세요 : 셀럽별 필터링
   - 이 중에 뭐 살까 : 투표 상태별 필터링
   - 추천해 줘 : 해시태그별 필터링

<br><br/>

### 커뮤니티

<br><br/>

- 커뮤니티는 4개의 타입으로 구성되어 있습니다.

<br><br/>

#### 찾아주세요
<div align="center">
<img width="500" alt="question_find_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/25946a9a-71e1-44d6-af44-d4bda2da9e0d">
</div>
<br><br/>

- 셀럽을 기준으로 아이템을 찾아주는 게시글.
- 아이템 및 사진 첨부할 수 있습니다.


#### 이 중에 뭐 살까
<div align="center">
<img width="500" alt="question_buy_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/b77e9456-6b2a-48cb-a4fa-ca8f5c28ab72">
</div>

- 투표를 통해 고민되는 아이템을 추천받는 게시글.
- 아이템, 사진 첨부할 수 있습니다.
- 투표 마감시간 설정할 수 있습니다.

<br><br/>


#### 이거 어때
<div align="center">
<img width="500" alt="question_how_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/1a0275a7-9202-4684-9688-5152381cec14">
</div>

- 자유롭게 아이템과 사진을 올려 질문하는 게시글.
- 아이템, 사진 첨부할 수 있습니다.

<br><br/>


#### 추천해 줘
<div align="center">
<img width="500" alt="question_recommend_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/55f61e58-8ef9-41b8-9a97-54569e785fe9">
</div>

- 해시태그를 설정하여 주제를 기준으로 질문하고 추천받는 게시글.
- 해시태그 설정을 할 수 있습니다.
- 아이템, 사진 첨부할 수 있습니다.


<br><br/>

### 커뮤니티 댓글
<div align="center">
<img width="500" alt="comment_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/6f7c2433-10f6-4dc9-a8ef-975b5ce0d8fb">
</div>

- 커뮤니티 게시글에 아이템/사진을 첨부하여 댓글을 남길 수 있습니다.
- 댓글에 대댓글을 추가할 수 있습니다. 
- 좋아요 기능이 있습니다.

<br><br/>


### 정보공유
<div align="center">
<img width="700" alt="item_result1" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/34789c09-5e2f-42e0-be14-9c9f39f17320">
</div>
<br><br/>

- 필수 정보만 입력해도 되는 입력폼 제공합니다.
- 임시 보관함 기능을 통해 작성을 이어갈 수 있습니다.

<br><br/>

<div align="center">
<img width="700" alt="item_result2" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/65ccec99-8b02-424f-9c4d-8a48cd5ca63e">
</div>
<br><br/>

- 획일화된 정보 게시글을 제공합니다.
- 게시글과 같은 셀럽, 같은 브랜드, 함께 보관한 아이템을 추천해 줍니다.

<br><br/>


### 옷장
<div align="center">
<img width="700" alt="closet_result" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/6709bd2a-1cd1-45d3-84a3-ff46a6ded441">
</div>
<br><br/>

- 관심 있는 아이템 게시글을 옷장에 스크랩할 수 있습니다.
- 기본 옷장은 회원가입 시 제공됩니다.
- 배경 사진과 색, 이름을 변경할 수 있습니다.

<br><br/>



### 검색
<div align="center">
<img width="700" alt="search_result1" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/8e2803aa-d54a-47b0-b4ce-bbbab3ed53f8">
</div>
<br><br/>

- 통합검색을 통해 검색어와 관련된 아이템, 커뮤니티, 사용자를 검색할 수 있습니다.
- 일간 인기 검색어를 노출합니다.
- 필터를 통해 검색할 수 있습니다.

<br><br/>


<div align="center">
<img width="700" alt="search_result2" src="https://github.com/CELEBIT/sluv-springboot-server/assets/101792740/297ff13f-81fa-4867-8887-b718353c9c42">
</div>
<br><br/>

- 통합검색뿐만 아니라 아이템, 커뮤니티, 사용자로 묶어 검색할 수 있습니다.

<br><br/>

</details>

<br>
