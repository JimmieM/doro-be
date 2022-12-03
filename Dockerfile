#############################
# BUILD FOR LOCAL DEVELOPMENT
#############################

FROM node:18 As development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .


######################
# BUILD FOR PRODUCTION
######################

FROM node:18 As build

WORKDIR /usr/src/app

COPY  package.json ./

COPY  --from=development /usr/src/app/node_modules ./node_modules

COPY  . .

RUN npm run build

ENV NODE_ENV production

RUN npm install --only=production && npm cache clean --force


#############
# PRODUCTION
##############

FROM node:18 As production

COPY --from=build /usr/src/app/ ./

CMD [ "node", "dist/main.js" ]