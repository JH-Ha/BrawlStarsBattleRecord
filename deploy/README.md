# EC2 배포 셋업 가이드

GitHub Actions(`deploy-backend.yml`, `deploy-frontend.yml`)가 SSH로 EC2에 배포한다.
빌드는 GitHub 러너에서 수행하고, EC2는 산출물을 받아 실행만 한다.
아래는 EC2에서 **최초 1회** 수행하는 설정이다. (`ubuntu` 사용자 기준 — 다르면 치환)

## 1. 디렉토리 준비

```bash
mkdir -p ~/apps/backend ~/apps/frontend
```

## 2. 배포 전용 SSH 키 등록

로컬(또는 아무 곳)에서 배포 전용 키를 새로 생성하고, 공개키를 EC2에 등록한다.

```bash
ssh-keygen -t ed25519 -f deploy_key -N "" -C "github-actions-deploy"
# deploy_key.pub 내용을 EC2의 ~/.ssh/authorized_keys 에 추가
# deploy_key(개인키) 내용을 GitHub Secrets의 EC2_SSH_KEY 에 등록
```

## 3. 환경변수 파일 (백엔드)

```bash
sudo mkdir -p /etc/brawlstars
sudo tee /etc/brawlstars/api.env > /dev/null <<'EOF'
SPRING_PROFILES_ACTIVE=prod
BRAWL_API_TOKEN=<토큰>
EOF
sudo chmod 600 /etc/brawlstars/api.env
```

DB 비밀번호 등 prod에서 쓰는 다른 환경변수도 이 파일에 추가한다.

## 4. systemd 서비스 등록

`deploy/brawlstars-api.service`, `deploy/brawlstars-web.service`를 EC2로 복사한 뒤:

```bash
# 파일 내 User / 경로 / java·npm 절대 경로를 환경에 맞게 수정한 후
sudo cp brawlstars-api.service brawlstars-web.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable brawlstars-api brawlstars-web
```

주의: nvm으로 Node를 설치했다면 `which npm` 결과(예: `/home/ubuntu/.nvm/versions/node/v22.x.x/bin/npm`)를
`brawlstars-web.service`의 `ExecStart`에 절대 경로로 넣어야 한다.

첫 배포 전에 기존 수동 실행 프로세스(`java -jar`, `npm run start`)를 종료해 둔다.
첫 배포가 jar와 프론트엔드 빌드를 올려준 후 서비스가 정상 기동된다.

## 5. sudo 비밀번호 없이 재시작 허용

배포 스크립트가 `sudo systemctl restart`를 실행할 수 있도록:

```bash
sudo tee /etc/sudoers.d/brawlstars-deploy > /dev/null <<'EOF'
ubuntu ALL=(root) NOPASSWD: /usr/bin/systemctl restart brawlstars-api, /usr/bin/systemctl restart brawlstars-web, /usr/bin/systemctl is-active brawlstars-api, /usr/bin/systemctl is-active brawlstars-web, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t, /usr/bin/cp /home/ubuntu/nginx-brawlmeta.conf /etc/nginx/sites-available/brawlmeta.conf, /usr/bin/cp /etc/nginx/sites-available/brawlmeta.conf /home/ubuntu/nginx-brawlmeta.conf.bak
EOF
sudo chmod 440 /etc/sudoers.d/brawlstars-deploy
```

## 6. 보안 그룹

GitHub 호스티드 러너는 고정 IP가 아니므로 SSH(22) 인바운드를 열어야 한다.
`0.0.0.0/0` 개방이 부담스러우면 키 인증만 허용(`PasswordAuthentication no`)을 확인하고,
추후 AWS SSM 방식으로 전환을 고려한다.

## 7. nginx 리버스 프록시 (80/443 → 프론트엔드)

EC2로 직접 들어오는 80/443 트래픽을 nginx가 받아 프론트엔드(8081)로 넘긴다.
백엔드(8080)는 프론트 서버가 `127.0.0.1:8080`으로 내부 호출하므로 외부에 노출하지 않는다.

conf의 소스는 repo의 `deploy/nginx-brawlmeta.conf`이며, Actions 탭에서
`Deploy Nginx Config`를 수동 실행(`workflow_dispatch`)하면 EC2에 복사 후
`nginx -t` 검증을 거쳐 reload한다. (자동 배포 아님 — 버튼 실행 전용)
**certbot이 conf를 수정하지 않도록 인증서 발급은 `certonly` 모드만 사용한다**
(수정해도 다음 배포 때 repo 버전으로 덮어써진다).

전제 조건:

- 보안 그룹에서 80, 443 인바운드를 `0.0.0.0/0`으로 개방 (8081, 8080은 외부 개방 불필요)
- 도메인 DNS의 A 레코드가 이 EC2를 가리켜야 함 (certbot 발급 검증에도 필요)
  — EC2 퍼블릭 IP는 재부팅 시 바뀔 수 있으므로 **Elastic IP**를 붙여서 그 IP로 연결 권장
- 기존에 ALB가 트래픽을 받고 있었다면: DNS를 ALB에서 EC2(Elastic IP)로 전환한 뒤
  ALB를 삭제하면 된다 (ALB 비용 절감). 전환 전까지는 ALB 경로와 nginx 경로가 공존해도 무방하다.

### 7-1. 설치 및 임시 conf 적용

최종 conf의 443 블록은 인증서 파일을 참조하므로, 인증서가 없는 최초 상태에서는
먼저 80 전용 임시 conf로 nginx를 띄운다.

```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx

sudo tee /etc/nginx/sites-available/brawlmeta.conf > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name brawlmeta.com www.brawlmeta.com;
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
    }
}
EOF
sudo ln -s /etc/nginx/sites-available/brawlmeta.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

### 7-2. 인증서 발급 (certonly)

```bash
sudo certbot certonly --nginx -d brawlmeta.com -d www.brawlmeta.com
```

- 성공 시 `/etc/letsencrypt/live/brawlmeta.com/`에 인증서 생성 (최종 conf가 이 경로를 참조)
- `--nginx`는 발급 검증에만 nginx를 사용하고, `certonly`라서 conf는 수정하지 않는다
- 갱신은 certbot이 설치한 systemd timer가 자동 수행. 갱신 후 nginx가 새 인증서를
  읽도록 reload 훅을 등록한다:

```bash
sudo tee /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh > /dev/null <<'EOF'
#!/bin/sh
systemctl reload nginx
EOF
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

### 7-3. 최종 conf 적용

인증서가 생겼으니 repo의 최종 conf(443 포함)로 교체한다.
Actions 탭에서 `Deploy Nginx Config`를 `workflow_dispatch`로 실행하거나, 수동으로:

```bash
# deploy/nginx-brawlmeta.conf 를 EC2로 복사한 뒤
sudo cp nginx-brawlmeta.conf /etc/nginx/sites-available/brawlmeta.conf
sudo nginx -t && sudo systemctl reload nginx
```

이후 conf 변경은 repo 파일 수정 → master merge 후 `Deploy Nginx Config` 수동 실행으로 반영한다.

## 8. GitHub Variables / Secrets 등록

저장소 Settings → Secrets and variables → Actions:

**Variables 탭** (등록 후에도 값 확인 가능):

| Variable | 값 |
|----------|-----|
| `EC2_HOST` | EC2 퍼블릭 IP 또는 도메인 |
| `EC2_USER` | SSH 접속 사용자 (예: `ubuntu`) |

**Secrets 탭** (값 비공개, 로그 자동 마스킹):

| Secret | 값 |
|--------|-----|
| `EC2_SSH_KEY` | 2번에서 만든 배포용 개인키 전문 |

## 배포 동작 방식

- `master`에 push 시 변경된 경로에 따라 백엔드/프론트엔드 워크플로우가 각각 실행된다.
  (Actions 탭에서 `workflow_dispatch`로 수동 실행도 가능)
- 백엔드: `bootJar` 빌드 → `apps/backend/app.jar` 교체 → `brawlstars-api` 재시작
- 프론트엔드: `next build` → `apps/frontend-new`에 전개 후 `apps/frontend`로 원자적 교체
  (직전 버전은 `apps/frontend-old`에 보존) → `brawlstars-web` 재시작
- nginx: `Deploy Nginx Config` 수동 실행 시 `deploy/nginx-brawlmeta.conf`를 EC2로 복사 → 기존 conf를
  `~/nginx-brawlmeta.conf.bak`에 백업 → `nginx -t` 통과 시에만 reload
  (검증 실패 시 reload되지 않으므로 서비스 중인 nginx는 영향 없음)

## 롤백

- 백엔드: 이전 커밋에서 `workflow_dispatch`로 재배포하거나, 이전 jar를 보관해 뒀다면 수동 교체
- 프론트엔드: `mv frontend frontend-broken && mv frontend-old frontend && sudo systemctl restart brawlstars-web`
