import Row from '../_row'
import { Typography } from '@material-ui/core'

export default ({ publisher, publicationYear }) => (
  <Row title="Publisher">
    <Typography variant="body2">{`${publisher} (${publicationYear || '?'})`}</Typography>
  </Row>
)
