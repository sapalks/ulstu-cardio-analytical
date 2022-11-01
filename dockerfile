FROM node:14-alpine as build

ARG CONFIG_NAME

# Папка приложения
RUN mkdir -p /app
WORKDIR /app

# Установка зависимостей
COPY package*.json tsconfig.json ./
# RUN npm install ${INSTALL_FLAG}
RUN npm install

# Копирование остальных файлов проекта
COPY . .

# Собираем проект
RUN npm run build

# В результате получается образ, состоящий из одного слоя
FROM nginx:1.17.8-alpine
# Копируем собранные файлы из папки build в папку app
COPY --from=build ./app/dist/ulstu-cardio-analytical /usr/share/nginx/html/
# Копируем nginx конфиг для приложения
COPY ./nginx/default.conf /etc/nginx/conf.d/