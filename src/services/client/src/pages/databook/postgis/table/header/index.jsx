import clsx from 'clsx'
import { Toolbar } from '@material-ui/core'
import useStyles from '../../../style'

export default () => {
  const classes = useStyles()

  return <Toolbar variant="dense" className={clsx(classes.toolbar)}></Toolbar>
}
