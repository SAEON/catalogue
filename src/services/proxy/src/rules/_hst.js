import url from 'url'
import { normalize } from 'path'
import { CATALOGUE_PROXY_HST_ESRI_PROXY } from '../config.js'
const CATALOGUE_PROXY_HST_ESRI_PROXY_PARSED = url.parse(CATALOGUE_PROXY_HST_ESRI_PROXY)

export default ({ path, requestDetail }) => {
  const { protocol, hostname, host, port, path: proxyPath } = CATALOGUE_PROXY_HST_ESRI_PROXY_PARSED
  requestDetail.protocol = protocol
  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(`${proxyPath}${path.replace('/proxy/hst', '')}`),
  }
}
