FROM node:19

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV REACT_APP_GRAPHQL_ENDPOINT="" \
    REACT_APP_GRAPHQL_TOKEN=""
EXPOSE 3000

CMD ["npm", "run", "serve", "--", "-s", "build"]
