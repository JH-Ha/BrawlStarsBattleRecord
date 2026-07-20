# BrawlStarsBattleRecord — CLAUDE.md

Brawl Stars 맵별 브롤러 승률 통계 서비스 ([brawlmeta.com](https://www.brawlmeta.com)). 약 10,000명의 무작위 플레이어 데이터를 수집해 집계한다.

## 프로젝트 구조

```
BrawlStarsBattleRecord/
├── nextjs-brawlstars/       # Next.js 프론트엔드
├── SpringBootBrawlStars/    # Spring Boot 백엔드
└── .github/workflows/       # CI/CD (Firebase 배포, Java CI)
```

---

## Frontend — `nextjs-brawlstars`

**스택:** Next.js 14, React 18, TypeScript 4, Bootstrap 5, Sass, next-i18next (en/ja/ko), Axios

### 주요 명령어

```bash
cd nextjs-brawlstars
npm run dev      # 개발 서버 실행 (port 8081)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행 (port 8081)
npm run lint     # ESLint 검사
```

### 디렉토리 구조

```
pages/
  index.tsx              # 홈
  statistics.tsx         # 전체 통계
  userList.tsx           # 플레이어 검색
  user.tsx               # 유저 프로필
  map/                   # 맵 통계
  mapList/[mode].tsx     # 게임 모드별 맵 목록
  battleLog/[tag].tsx    # 플레이어 전적
  blog/                  # 블로그
components/              # 공용 컴포넌트
types/                   # TypeScript 타입 정의
styles/                  # SASS 스타일시트
public/
  locales/en|ja|ko/      # i18n 번역 파일
  images/                # 게임 이미지
```

### 설정 파일

- `next.config.js` — 이미지 캐시 헤더(86400s), TypeScript 빌드 에러 허용
- `next-i18next.config.js` — 기본 언어 `en`, 지원 언어 `en/ja/ko`
- `tsconfig.json` — target ES5, strict 비활성화

### 배포

AWS EC2 인스턴스에서 Spring Boot 백엔드와 함께 서빙 (`npm run start`, 8081 포트). ALB를 통해 트래픽을 받으며, 배포는 수동(SSH 접속 후 빌드/재시작) — 저장소에 프론트엔드 배포용 CI/CD 워크플로우는 없음.

> `.github/workflows/firebase-hosting-*.yml`은 2022년 초 설정 이후 방치된 미사용 워크플로우이며 `firebase.json`/`.firebaserc`도 저장소에 없어 실제로 동작하지 않음.

---

## Backend — `SpringBootBrawlStars`

**스택:** Spring Boot 3.5.3, Java 25, JPA/Hibernate, QueryDSL 7, MySQL (prod) / H2 (dev·test), Caffeine Cache, Lombok, Gradle

### 주요 명령어

```bash
cd SpringBootBrawlStars
./gradlew build                        # 빌드 (테스트 포함)
./gradlew test                         # 테스트 실행
./gradlew bootRun                      # 앱 실행 (기본 local 프로필)
SPRING_PROFILES_ACTIVE=local ./gradlew bootRun  # 명시적으로 local 프로필 지정
```

### 프로필

| 프로필 | 데이터베이스 | 용도 |
|--------|-------------|------|
| `local` | H2 in-memory | 개발 / CI 테스트 |
| `prod`  | AWS RDS MySQL | 프로덕션 |

### 패키지 구조 (`com.brawlstars`)

```
api/          # REST 컨트롤러 (Record, Member, Event, Main, GameMap, Statistics)
service/      # 비즈니스 로직
repository/   # JPA 레포지토리
domain/       # JPA 엔티티
config/       # Spring 설정
cache/        # Caffeine 캐시 유틸
filter/       # HTTP 필터
interceptor/  # 요청/응답 인터셉터
remote/       # Brawl Stars 외부 API 클라이언트
json/         # 외부 API 응답 JSON 모델
schedule/     # 배치 스케줄러 (주기적 데이터 수집)
util/         # 유틸리티
```

### 환경변수 / 시크릿

- `BRAWL_API_TOKEN` — Brawl Stars API 토큰 (CI: GitHub Secrets, prod: 서버 환경변수)
- DB 비밀번호 — prod 전용, secrets 관리

### CI

`java-ci.yml` — PR 및 `master` push 시 JDK 25 환경에서 `./gradlew test` 실행 (`SPRING_PROFILES_ACTIVE=local`, H2 사용). `BRAWL_API_TOKEN` 없으면 API 호출 테스트 스킵. **배포 스텝은 없음** — 프로덕션 배포는 EC2에 수동으로 진행.

---

## 게임 모드 (BrawlMode enum)

`siege`, `gemGrab`, `brawlBall`, `bounty`, `heist`, `hotZone`, `knockout`, `duels`, `paintBrawl`, `5v5`, `trophyEscape` 등. `unknown` 모드도 저장 가능.

## 브랜치 전략

- `master` — 프로덕션 배포 기준
- `release/vX.Y.Z` — 릴리스 준비 브랜치
- 커밋 접두사: `[front]`, `[back]`, `[test]`, `[ci]`, `[docs]`
