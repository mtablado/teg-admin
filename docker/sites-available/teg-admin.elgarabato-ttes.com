##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# http://wiki.nginx.org/Pitfalls
# http://wiki.nginx.org/QuickStart
# http://wiki.nginx.org/Configuration
#
# Generally, you will want to move this file somewhere, and start with a clean
# file but keep this around for reference. Or just disable in sites-enabled.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
	listen 80 default_server;
	listen [::]:80 default_server;

        # allow large uploads of files - refer to nginx documentation
        client_max_body_size 1G;

        # optimize downloading files larger than 1G - refer to nginx doc before adjusting
        #proxy_max_temp_file_size 2G;

	server_name teg-admin.elgarabato-ttes.com;
	root /usr/share/nginx/html;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.

                # try_files $uri $uri/ =404;
                try_files $uri /index.html;
	}

}
