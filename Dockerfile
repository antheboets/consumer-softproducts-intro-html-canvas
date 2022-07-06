FROM node:18-alpine3.15 AS Build

RUN apk -U upgrade
RUN apk add git
RUN npm install -g npm@8.13.2

#get source code from git
RUN git clone https://github.com/antheboets/consumer-softproducts-intro-html-canvas.git
WORKDIR /consumer-softproducts-intro-html-canvas

#get source code from local repo
#WORKDIR /consumer-softproducts-intro-html-canvas
#COPY ./ /consumer-softproducts-intro-html-canvas

RUN npm install --silent
RUN npm run build

FROM nginx:1.23.0-alpine

COPY --from=Build consumer-softproducts-intro-html-canvas/dist /usr/share/nginx/html
COPY --from=Build consumer-softproducts-intro-html-canvas/src/fonts /usr/share/nginx/html/fonts
COPY --from=Build consumer-softproducts-intro-html-canvas/src/audio /usr/share/nginx/html/audio

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]