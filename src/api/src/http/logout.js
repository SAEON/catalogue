import { HOSTNAME } from '../config.js'

export default async ctx => {
  const { redirect = HOSTNAME } = ctx.request.query
  ctx.session = null
  ctx.redirect(redirect)
}
