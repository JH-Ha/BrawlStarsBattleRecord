### 프로젝트 개요

브롤 스타즈의 전적 정보를 기록하는 사이트를 만드는 프로젝트입니다.

브롤스타즈의 전적은 최근 25게임만 조회가 가능합니다. 과거의 게임 기록을 조회할 수 없기에, 게임을 위한 유의미한 통계 데이터를 얻기가 힘듭니다. 그래서 게임 데이터를 지속적으로 저장하고 분석하기 위해서 이 프로젝트를 진행하게 되었습니다.

Front-End는 React로 제작되었고, Back-End는 Spring framework를 이용하여 제작되었습니다.


UserList 페이지에서 유저이름을 클릭하면, 해당 유저의 전적정보를 볼 수 있습니다. 

## version 1.0

React + firebase + nodejs를 이용해서 구현한 버전입니다.

nodejs 로 서버를 실행시켜 주기적으로 firestore에 전투 기록을 insert합니다.

### 구현된 기능

- User List에서 user 이름을 클릭하면 모드 별로 전투 기록을 볼 수 있습니다.
- 유저 이름으로 검색하여 전투 기록을 찾아볼 수 있습니다.

## version 2.0

React + Spring Boot + JPA 를 이용해서 구현하고 있습니다.

firestore에 paging 기능 부재, NoSQL이다 보니 join 이 불가능하여 통계적으로 유의미한 자료를 뽑아내는게 어려웠습니다. 그래서 Database를 RDBMS로 바꾸고 Spring Boot로 API서버를 구축하여 React에서 데이터를 가져오는 방식으로 구현하고 있습니다.

nodejs 서버가 아닌 Spring Boot의 Scheduler 를 이용해서 주기적으로 유저 데이터를 업데이트 합니다.

### 구현된 기능

- UserList에서 유저를 클릭하면 전투 기록을 볼 수 있습니다. V1.0과는 다르게 전체 모드에 상관없이 기록을 보여줄 수 있도록 구현을 바꾸었습니다.
- 유저 이름으로 검색하여 전투 기록을 찾아 볼 수 있습니다. (V1.0과 동일)
- 3대 3매칭에서 맵에서 어떤 브롤러가 승률이 높은지 확인할 수 있습니다.

상단의 Map List를 클릭하면 모드별로 어떤 맵들이 있는지 확인이 가능합니다. 
그리고 맵을 클릭하면 각 브롤러별 승률을 알 수 있습니다.

<div style="display:flex">
<img src="./readmeImage/mapListCapture.PNG" width ="500px">
<img src="./readmeImage/mapCapture.PNG" width ="500px">
</div>

### Update Log

- v2.2.0 (2022.02.12)
  - 구글 봇이 언어별로 검색기록을 따로 수집할 수 있도록 Url 에 언어정보가 추가 되었습니다.
  - navigation bar 디자인이 변경되었습니다.
  - blog 메뉴가 추가되었습니다.
  
- v2.1.0 (2022.02.05)
  - brawlstat.xyz에서 brawlmeta.com으로 도메인을 변경하였습니다.
  - https가 적용되었습니다.
  - 구글 애널리틱스를 적용시켰습니다.
  - 신규 유저 태그 조회 및 등록 기능이 추가되었습니다.
    
- v2.0.2 (2021.10.04)
   
   현재 로테이션인 이벤트 목록을 볼 수 있는 페이지 추가

- v2.0.1 (2021.04.28)

    API 호출 내역을 모니터링 하기 위해 Interceptor 추가

### 개발 예정

- Duel 모드 수집할 수 있도록 업데이트 예정
- 

## Demo Page

hosting page
- version 1 : http://brawlstars-260814.web.app
- version 2 : https://www.brawlmeta.com
