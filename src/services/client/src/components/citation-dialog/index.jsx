import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { Typography, Tabs, Tab, Box } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'

//citations array represents the would be citation. to be replaced by citations.js
const citations = [
  'apa cite',
  'harvard cite',
  'mla cite',
  'vancouver cite',
  'chicago cite',
  'ieee cite',
  'bibtex cite',
  'ris cite',
]

function TabPanel(props) {
  const { children, value, index } = props

  return (
    <div hidden={value !== index} style={{ alignSelf: 'center' }}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
          <Button
            style={{ position: 'absolute', right: '5px', bottom: '5px' }}
            onClick={() => {
              navigator.clipboard.writeText(citations[index])
            }}
            startIcon={<AssignmentIcon />}
          >
            Copy to clipboard
          </Button>
        </Box>
      )}
    </div>
  )
}

function TabsDialog(props) {
  const { onClose, open, json } = props
  const [tabValue, setTabValue] = React.useState(0)
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <div
        style={{
          display: 'flex',
          width: 600,
        }}
      >
        <Tabs
          value={tabValue}
          orientation="vertical"
          variant="scrollable"
          onChange={(event, newValue) => {
            setTabValue(newValue)
          }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="APA" />
          <Tab label="Harvard" />
          <Tab label="MLA" />
          <Tab label="Vancouver" />
          <Tab label="Chicago" />
          <Tab label="IEEE" />
          <Tab label="BibTeX" />
          <Tab label="RIS" />
        </Tabs>
        <TabPanel value={tabValue} index={0} json={json}>
          {citations[0]}
        </TabPanel>
        <TabPanel value={tabValue} index={1} json={json}>
          {citations[1]}
        </TabPanel>
        <TabPanel value={tabValue} index={2} json={json}>
          {citations[2]}
        </TabPanel>
        <TabPanel value={tabValue} index={3} json={json}>
          {citations[3]}
        </TabPanel>
        <TabPanel value={tabValue} index={4} json={json}>
          {citations[4]}
        </TabPanel>
        <TabPanel value={tabValue} index={5} json={json}>
          {citations[5]}
        </TabPanel>
        <TabPanel value={tabValue} index={6} json={json}>
          {citations[6]}
        </TabPanel>
        <TabPanel value={tabValue} index={7} json={json}>
          {citations[7]}
        </TabPanel>
      </div>
    </Dialog>
  )
}

export default props => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        size={props.size || 'medium'}
        color="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        “ Cite
      </Button>
      <TabsDialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        json={props.json}
      />
    </>
  )
}
