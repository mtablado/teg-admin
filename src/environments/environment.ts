/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // server_url: 'http://localhost:8080',
  // server_api: 'http://localhost:8080/private/api/v1',
  server_url: 'http://35.198.98.50:28080',
  server_api: 'http://35.198.98.50:28080/private/api/v1',
  refresh_traffic_interval: 5000,
  refresh_drivers_interval: 5000,
};
