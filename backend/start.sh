docker compose up dev-db -d
npm i
npm i -g prisma
prisma migrate dev
npm run start:dev