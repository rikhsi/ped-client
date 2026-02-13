# ---- Stage 1: Build ----
FROM node:22-alpine AS build

ARG ENVIRONMENT
ENV ENVIRONMENT=$ENVIRONMENT

WORKDIR /app

# Настройка npm
RUN npm config set registry https://registry.npmjs.org \
    && npm set fetch-retry-mintimeout 20000 \
    && npm set fetch-retry-maxtimeout 120000 \
    && npm set fetch-timeout 300000

COPY package*.json ./

RUN npm install --prefer-offline --no-audit --progress=false --ignore-scripts

COPY . .

RUN npm run generate:outline \
 && npm run generate:fill \
 && npm run generate:two-tone \
 && npm run generate:colorful


RUN npm run $ENVIRONMENT


FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
