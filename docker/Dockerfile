FROM nginx:1.11.3
LABEL maintainer "Miguel Tablado migueltablado@gmail.com"

ARG tar_file=""
#RUN echo "TAR file:" ${tar_file}

# Install wget and install/updates certificates
#RUN apt-get update \
# && apt-get install -y ca-certificates wget \
# && apt-get clean \
# && rm -r /var/lib/apt/lists/*

RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf
COPY ./sites-available/teg-admin.elgarabato-ttes.com /etc/nginx/sites-available/teg-admin.elgarabato-ttes.com

RUN mkdir -p /etc/nginx/sites-enabled/ \
	&& ln -s /etc/nginx/sites-available/teg-admin.elgarabato-ttes.com /etc/nginx/sites-enabled/teg-admin.elgarabato-ttes.com

RUN ls -lia /tmp
RUN cp -R /tmp/ /usr/share/nginx/html
COPY ${tar_file} /tmp
RUN mkdir -p /tmp/tar/

RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/nginx.html

WORKDIR /tmp/tar
RUN tar -xzvf /tmp/${tar_file}
RUN mkdir -p /usr/share/nginx/html/spa-corp-demo/
RUN cp -R /tmp/tar/* /usr/share/nginx/html/
RUN ls -lia /usr/share/nginx/html

WORKDIR /
