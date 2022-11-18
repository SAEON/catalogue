import { useContext } from 'react'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'
import { context as globalContext } from '../../../../../../contexts/global'
import Link from '@mui/material/Link'
import { useEffect } from 'react'
import TabPanel from './_panel'
import { gql, useMutation } from '@apollo/client'
import packageJson from '../../../../../../../package.json'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../../../config'
import { Div } from '../../../../../../components/html-tags'

/**
 * TODO This should probably be generated from a GraphQL type query
 * otherwise in the future this may become outdated, causing bugs
 * that are difficult to track down
 */
const FILTER_KEYS = ['identifiers', 'ids', 'dois', 'text', 'terms', 'extent']

/**
 * Dialogue contents of the share dialogue
 * This component will be mounted AFTER the
 * dialogue is opened. The useEffect hook will
 * fire every time the dialogue is opened
 */
export default ({ tabIndex, search = undefined }) => {
  const { global } = useContext(globalContext)
  const [saveList, { loading, error, data }] = useMutation(gql`
    mutation ($filter: JSON, $createdBy: String!) {
      saveList(filter: $filter, createdBy: $createdBy) {
        id
      }
    }
  `)

  useEffect(() => {
    console.log('global', global)
    console.log(
      'filter',
      Object.fromEntries(
        Object.entries(global)
          .map(([key, value]) => {
            if (key === 'filter' || key === 'selectedIds' || key === 'selectAll') {
              return null
            }

            if (key === 'extent') {
              return [key, value || global.filter[key]]
            }

            if (value?.constructor === Array) {
              return [
                key,
                [
                  ...(global.filter[key] || []),
                  ...value,
                  ...(key === 'ids' ? global.selectedIds || [] : []),
                ].filter(_ => _),
              ]
            }

            if (key === 'text') {
              return [key, `${value || ''} ${global.filter[key] || ''}`.trim()]
            }

            return [key, global.filter[key] || value]
          })
          .filter(_ => _)
      )
    )

    saveList({
      variables: {
        createdBy: `${packageJson.name} v${packageJson.version}`,
        filter: Object.fromEntries(
          Object.entries(global)
            .map(([key, value]) => {
              if (!FILTER_KEYS.includes(key)) {
                return null
              }

              if (key === 'text') {
                return [key, `${value || ''} ${global.filter[key] || ''}`.trim()]
              }

              if (key === 'extent') {
                return [key, value || global.filter[key]]
              }

              if (value?.constructor === Array) {
                return [
                  key,
                  [
                    ...(global.filter[key] || []),
                    ...value,
                    ...(key === 'ids' ? global.selectedIds || [] : []),
                  ].filter(_ => _),
                ]
              }

              return [key, global.filter[key] || value]
            })
            .filter(_ => _)
        ),
      },
    })
  }, [global, saveList, search])

  const id = data?.saveList.id || undefined
  const uri = `${CLIENTS_PUBLIC_ADDRESS}/list/records?search=${id}&disableSidebar=false&showSearchBar=true`

  return error ? (
    'Error'
  ) : loading ? (
    <Fade key="loading" in={loading}>
      <Div
        sx={{
          margin: theme => theme.spacing(8),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Div>
    </Fade>
  ) : (
    <Fade in={Boolean(data)} key="data">
      <Div>
        <TabPanel value={tabIndex} index={0}>
          <Link target="_blank" rel="noopener noreferrer" href={uri}>
            {uri}
          </Link>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {`<iframe width="100%" height="100%" src="${uri}" frameborder="0" allowfullscreen></iframe>`}
        </TabPanel>
      </Div>
    </Fade>
  )
}
