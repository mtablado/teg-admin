/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  // IBM tst Milan
  // server_url: 'https://teg-api.iscp-demo.ibm.com:3443',
  // server_api: 'https://teg-api.iscp-demo.ibm.com:3443/private/api/v1',
  // IBM Roks
  server_url: 'https://teg-tracker.ibc02-abc-001-k01-4b190db9285fe795bac33ec62b1ece4d-0001.osl01.containers.appdomain.cloud',
  server_api: 'https://teg-tracker.ibc02-abc-001-k01-4b190db9285fe795bac33ec62b1ece4d-0001.osl01.containers.appdomain.cloud/private/api/v1',
  // GKE
  // server_url: 'http://35.198.98.50:28080',
  // server_api: 'http://35.198.98.50:28080/private/api/v1',
  refresh_traffic_interval: 20000,
  refresh_drivers_interval: 20000,
};
