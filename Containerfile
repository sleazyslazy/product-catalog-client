FROM registry.access.redhat.com/ubi8/nginx-120:1

COPY dist/* ./

CMD nginx -g "daemon off;"