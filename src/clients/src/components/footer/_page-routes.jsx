import { useContext } from 'react'
import { context as authorizationContext } from '../../contexts/authorization'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { Div } from '../../components/html-tags'

export default ({ routes }) => {
  const theme = useTheme()
  const { hasPermission } = useContext(authorizationContext)

  return (
    <Grid container spacing={2} sx={{ alignContent: 'flex-start' }}>
      <Grid item xs={12}>
        <Typography variant="h5">Quick links</Typography>
      </Grid>
      <Grid container item xs={12}>
        {routes
          .filter(({ group, requiredPermission = false }) => {
            if (requiredPermission) {
              if (!hasPermission || !hasPermission(requiredPermission)) {
                return false
              }
            }

            if (group === 'legal') return false
            if (group === 'source code') return false

            return true
          })
          .map(({ label, Icon, href, to }) => (
            <Grid item xs={12} key={label}>
              <Div
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Icon size={18} />
                <Typography
                  component={({ style, ...otherProps }) => (
                    <Link
                      {...otherProps}
                      style={{ ...style, color: 'white', marginLeft: theme.spacing(1) }}
                      to={href ? undefined : to}
                      href={href}
                      rel={href && 'noopener noreferrer'}
                      target={href && '_blank'}
                      component={href ? 'a' : RouterLink}
                      key={label}
                    >
                      {label}
                    </Link>
                  )}
                  variant="overline"
                >
                  {label}
                </Typography>
              </Div>
            </Grid>
          ))}
      </Grid>
    </Grid>
  )
}
