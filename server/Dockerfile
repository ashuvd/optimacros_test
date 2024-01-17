FROM node:18-alpine

WORKDIR /usr/src/app

EXPOSE 4200

COPY ./entrypoint.sh ./
ENTRYPOINT ["sh", "./entrypoint.sh"]