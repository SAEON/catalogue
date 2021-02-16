import { Component } from 'react'
import DialogContentText from '@material-ui/core/DialogContentText'
import Link from '@material-ui/core/Link'
import MessageDialogue from '../../components/message-dialogue'
import { CATALOGUE_TECHNICAL_CONTACT } from '../../config'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './style'
import clsx from 'clsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: undefined }
  }

  static getDerivedStateFromError(error) {
    return { error: error.message }
  }

  render() {
    const { props, state } = this
    const { children, classes } = props
    const { error } = state

    // NO APP ERROR
    if (!error) {
      return children
    }

    // APP ERROR
    return (
      <MessageDialogue
        permanent
        hideIcon
        defaultOpen
        title="Application Error"
        text={
          <>
            <DialogContentText variant="body2" gutterBottom>
              Please try refreshing this page in a few minutes. If the error persists, or if
              assistance is required, please contact{' '}
              {
                <Link variant="body1" href={`mailto:${CATALOGUE_TECHNICAL_CONTACT}`}>
                  {CATALOGUE_TECHNICAL_CONTACT}
                </Link>
              }{' '}
              with a screenshot of this page so that we may resolve the issue speedily
            </DialogContentText>
            <DialogContentText
              component={({ children }) => (
                <pre className={clsx(classes.errorBlock)}>
                  <code>{children}</code>
                </pre>
              )}
              gutterBottom
              style={{ marginBottom: 16 }}
            >
              {error}
            </DialogContentText>
          </>
        }
      />
    )
  }
}

export default withStyles(style, { withTheme: true })(ErrorBoundary)
