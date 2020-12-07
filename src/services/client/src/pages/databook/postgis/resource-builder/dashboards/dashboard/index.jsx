import { Toolbar, Typography } from '@material-ui/core'
import AddChartButton from './_add-chart-button'
import DeleteButton from './_delete-button'
import ShareButton from './_share-button'
import Chart from './chart'

export default ({ dashboard, activeTabIndex, setActiveTabIndex }) => {
  const { id, charts = [] } = dashboard
  return (
    <>
      <Toolbar variant={'dense'}>
        <Typography>{id}</Typography>
        <span style={{ marginLeft: 'auto' }} />
        <AddChartButton dashboard={dashboard} />
        <span style={{ marginRight: 16 }} />
        <ShareButton id={id} />
      </Toolbar>

      {charts?.map(chart => (
        <Chart key={chart.id} chart={chart} dashboard={dashboard} />
      ))}

      <DeleteButton id={id} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
    </>
  )
}
