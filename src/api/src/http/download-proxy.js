import fetch from 'request'
import { URL } from 'url'
import { CURATOR_CONTACT } from '../config.js'

const HOSTNAME_WHITELIST = ['media.dirisa.org', 'dap.saeon.ac.za']

export default async ctx => {
  const { uri } = ctx.request.query
  const { hostname } = new URL(uri)

  if (HOSTNAME_WHITELIST.includes(hostname)) {
    ctx.body = fetch(uri)
  } else {
    ctx.body = `The hostname ${hostname} is potentially insecure. If you would like to download the resource anyway, navigate to ${uri} in a new tab. If you think this message is in error, please contact the SAEON curation team to whitelist this URL at ${CURATOR_CONTACT}`
  }
}
