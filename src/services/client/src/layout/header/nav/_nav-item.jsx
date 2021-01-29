import { forwardRef } from 'react'
import { Link, Route } from 'react-router-dom'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

export default forwardRef(({ onClick, label, to, Icon, exact = false, href }, ref) => (
  <Route path={to} exact={exact}>
    {({ match }) => {
      return (
        <MenuItem
          innerRef={ref}
          component={href ? 'a' : Link}
          active={match}
          rel={href && 'noopener noreferrer'}
          target={href && '_blank'}
          onClick={onClick}
          to={to}
          href={href}
        >
          <ListItemIcon>{<Icon color={match ? 'primary' : 'inherit'} />}</ListItemIcon>
          <ListItemText primary={label} />
        </MenuItem>
      )
    }}
  </Route>
))
