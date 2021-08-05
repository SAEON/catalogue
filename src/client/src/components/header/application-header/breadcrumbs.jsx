import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Link, useLocation } from 'react-router-dom'
import MuiLink from '@material-ui/core/Link'
import EditIcon from 'mdi-react/EditIcon'
import SubmissionIcon from 'mdi-react/DatabaseAddIcon'

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 18,
    height: 18,
  },
}))

export default function IconBreadcrumbs({ routes }) {
  const classes = useStyles()
  const { pathname } = useLocation() // Trigger re-render on location changes
  const tree = [...new Set(pathname.split('/'))].map(p => {
    return (
      routes.find(({ to }) => {
        to = to.replace('/', '')
        return to === p
      }) || { label: p?.titleize() || '404 (Not found)' }
    )
  })

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {tree.length > 1 &&
        tree.slice(0, -1).map(({ label, Icon, BreadcrumbsIcon, breadcrumbsLabel, to }) => {
          Icon = BreadcrumbsIcon || Icon
          label = breadcrumbsLabel || label
          if (label === 'New') {
            Icon = SubmissionIcon
            return (
              <Typography key={label} color="inherit" className={classes.link}>
                {Icon && <Icon size={18} className={classes.icon} />}
                {label}
              </Typography>
            )
          }

          return (
            <MuiLink
              component={Link}
              key={label}
              color="inherit"
              to={
                to ||
                tree
                  .slice(1, -1)
                  .map(({ to, label }) => to || label)
                  .join('/')
              }
              className={classes.link}
            >
              {Icon && <Icon size={18} className={classes.icon} />}
              {label}
            </MuiLink>
          )
        })}

      {tree.slice(-1).map(({ label, breadcrumbsLabel, Icon, BreadcrumbsIcon } = {}) => {
        Icon = BreadcrumbsIcon || Icon
        label = breadcrumbsLabel || label

        if (label === 'Edit') {
          Icon = EditIcon
        }

        return (
          <Typography key={label} color="textPrimary" className={classes.link}>
            {Icon && <Icon size={18} className={classes.icon} />}
            {label}
          </Typography>
        )
      })}
    </Breadcrumbs>
  )
}
