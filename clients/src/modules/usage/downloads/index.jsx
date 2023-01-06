import { useContext, lazy, Suspense } from 'react'
import { context as downloadsContext } from './context'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Loading from '../../../components/loading'
import Typography from '@mui/material/Typography'
import Collapse from '../../../components/collapse'

const BarChart = lazy(() => import('./charts/bar-chart'))

export default () => {
  const { downloadsCount, referrerCount, deviceCount, downloadsByDate, ipLocationCount } =
    useContext(downloadsContext)

  return (
    <Grid container spacing={2}>
      {/* TITLE */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent sx={{ padding: theme => theme.spacing(2) }}>
            <Typography sx={{ display: 'block', textAlign: 'center' }} variant="overline">
              Downloads: {downloadsCount?.count}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Downloads by referrer */}
      <Grid item xs={6}>
        <Card variant="outlined" sx={{ maxHeight: 400 }}>
          <CardContent sx={{ padding: theme => theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart yScale="log" categoryFieldName="referrer" data={referrerCount} />
            </Suspense>
          </CardContent>
        </Card>
      </Grid>

      {/* Downloads by location */}
      <Grid item xs={6}>
        <Card variant="outlined" sx={{ maxHeight: 400 }}>
          <CardContent sx={{ padding: theme => theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart
                yScale="log"
                tooltip={{ show: false }}
                categoryFieldName="clientIpLocation"
                data={ipLocationCount}
              />
            </Suspense>
          </CardContent>
        </Card>
      </Grid>

      {/* Downloads by date */}
      <Grid item xs={6}>
        <Card variant="outlined" sx={{ maxHeight: 400 }}>
          <CardContent sx={{ padding: theme => theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart type="bar" categoryFieldName="date" data={downloadsByDate} />
            </Suspense>
          </CardContent>
        </Card>
      </Grid>

      {/* Downloads by device */}
      <Grid item xs={6}>
        <Card variant="outlined" sx={{ maxHeight: 400 }}>
          <CardContent sx={{ padding: theme => theme.spacing(1), position: 'relative' }}>
            <Suspense fallback={<Loading />}>
              <BarChart yScale="log" categoryFieldName="device" data={deviceCount} />
            </Suspense>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
