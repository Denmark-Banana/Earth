## NodeJS API Server
Node.js, Express, PM2
## [TDD Library] 
mocha, superTest
## [API Document]
swagger2.0 UI
## [Logger Module]
morgan, winston

### config
server.properties에 directory 경로를 입력해주세요.


### node 설치 유무 확인
node --version

### pm2 설치 유무 확인
npm install -g pm2 : pm2 globally 설치
pm2 start app.js --name "example" : 프로세스 등록 및 시작
pm2 list : 프로세스 리스트 확인
pm2 show example : 프로세스 정보 확인
pm2 restart example : 프로세스 재시작 
pm2 stop example : 프로세스 중단
pm2 delete example : 프로세스 리스트에서 삭제
pm2 kill example : 프로세스 강제 종료
pm2 logs example : 로그 확인
pm2 flush : 로그파일 삭제
pm2 monit : 모니터링 모드
