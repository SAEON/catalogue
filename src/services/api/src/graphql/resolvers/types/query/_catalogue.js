import hash from 'object-hash'
import packageJson from '../../../../../package.json'

export default async (_, args, ctx, info) => {
  const referrer = args?.referrer || undefined
  const clientSession = ctx?.cookies.get('ClientSession') || undefined
  const { operation, fragments, variableValues } = info
  const { insertLogs: logToMongo } = ctx.mongo.dataInserters

  const query = {
    operation: JSON.stringify(operation),
    fragments: JSON.stringify(fragments),
    variableValues: JSON.stringify(variableValues),
  }

  const log = {
    clientSession,
    referrer,
    apiVersion: packageJson.version,
    type: 'query',
    queryHash: hash(query),
    ...query,
  }

  logToMongo(log)

  return {
    id: hash(JSON.stringify(log)),
  }
}
