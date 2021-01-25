import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import WithGqlQuery from '../../hooks/with-gql-query'
import { setShareLink } from '../../hooks/use-share-link'
import { getUriState } from '../../lib/fns'
import Loading from '../../components/loading'
import Footer from '../../components/footer'
import DashboardContextProvider from './context'
import { gql } from '@apollo/client'
import { AppBar, Grid, Toolbar, Card, Typography } from '@material-ui/core'
import Layout from './layout'
import Filters from './drawer/_filters'
import useStyles from './style'
import clsx from 'clsx'
import FiltersDrawer from './drawer/index'

const POLLING_INTERVAL = 500
export default ({ id }) => {
  const classes = useStyles()
  const { poll } = getUriState()
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/dashboard?id=${id}`,
    params: false,
  })

  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          dashboard(id: $id) {
            id
            title
            subtitle
            description
            layout
            filters
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data, startPolling }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw error
        }

        if (poll) {
          startPolling(POLLING_INTERVAL)
        }

        const { layout, filters: filterIds, title, subtitle, description } = data.dashboard
        const MenuProps = {
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }
        return (
          <>
            <Grid container justify="center">
              <DashboardContextProvider filterIds={filterIds || []}>
                <Grid item xs={12}>
                  <AppBar
                    style={window.location.pathname.includes('/render') ? {} : { marginTop: 48 }}
                    variant="elevation"
                  >
                    {/* STEVEN: TO-DO: Bug: Toolbar height is not accounted for by cards beneath it. If toolbar grows large enough,
                  it will cover the cards */}
                    <Toolbar variant="dense" style={{ overflowX: 'auto' }}>
                      <FiltersDrawer />
                      {/* <Filters filterIds={filterIds} /> */}
                    </Toolbar>
                  </AppBar>
                </Grid>
                <Grid item xs={12} style={{ margin: '36px 0' }} />
                <div style={{ height: '400px', width: '1px' }}></div>
                <Grid justify="space-evenly" container item xs={12} sm={10} md={8}>
                  <Grid item xs={12}>
                    <div className={clsx(classes.layout)}>
                      <Typography variant="h2" className={clsx(classes.title)}>
                        {title || 'Untitled'}
                      </Typography>
                      <Typography className={clsx(classes.subtitle)} variant="overline">
                        {subtitle || 'No subtitle'}
                      </Typography>
                      <Typography className={clsx(classes.description)} variant="body2">
                        {description || 'No description'}
                      </Typography>
                    </div>
                  </Grid>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <Layout items={layout} />
                  </div>
                </Grid>
                <Grid item xs={12} style={{ margin: '16px 0' }} />
                <Grid item xs={12}>
                  <Footer />
                </Grid>
              </DashboardContextProvider>
            </Grid>
          </>
        )
      }}
    </WithGqlQuery>
  )
}
