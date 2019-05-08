
#SPA eg-admin running on NGINX

This image is prepared to deliver the ElGarabato TTES admin web static content at the following url: `http://teg-admin.elgarabato-ttes.com/`

## Required parameters
This image requires the tar file with the content of the application. So the following parameters must be sent:
- `tar_file`: the relative path (in the context) and name of the file.
- `ports`: The port 80 must be accessed.

## How to deploy to gcloud
- Run `npm run build:prod`
- cd into dist directory
- Run `tar -gvzf teg_admin.tar.gz .`
- Move file to docker directory.
- Build the docker image: `docker build -t eu.gcr.io/k8s-elgarabato-ttes/teg-admin:latest --build-arg tar_file=teg_admin.tar.gz .`
- Login to registry: `docker login -u oauth2accesstoken -p "$(gcloud auth print-access-token)" https://eu.gcr.io`
- Push image: `docker login -u oauth2accesstoken -p "$(gcloud auth print-access-token)" https://eu.gcr.io`
- Redeploy kubernetes pod.

