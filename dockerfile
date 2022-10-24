FROM node:18

WORKDIR /backend
COPY ./package.json /backend/
COPY ./package-lock.json /backend/

RUN npm install
COPY . /backend/

COPY ./prisma /backend/
RUN npx prisma generate

CMD npm run start:dev