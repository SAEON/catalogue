import DialogTitle from '@material-ui/core/DialogTitle'

export default ({ draggableId }) => (
  <DialogTitle style={{ cursor: 'move', textAlign: 'center' }} id={draggableId}>
    New metadata
  </DialogTitle>
)
