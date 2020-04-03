import React from 'react'
import { DragMenu } from '../../components'
import { Typography } from '@material-ui/core'
import { MenuContext } from '../../modules/menu-provider'

export default ({ id, layer, onClose }) => {
  const InfoMenu =
    layer.get('InfoMenu') ||
    (() => (
      <div style={{ marginBottom: 10 }}>
        <Typography>No component specified for {layer.get('title')}</Typography>
      </div>
    ))

  return (
    <MenuContext.Consumer>
      {({ getMenuById, setActiveMenu }) => (
        <DragMenu
          onMouseDown={() => setActiveMenu(id)}
          zIndex={getMenuById(id).zIndex}
          defaultPosition={{ x: 650, y: 25 }}
          defaultWidth={230}
          title={'Layer info'}
          active={true}
          close={onClose}
        >
          {() => <InfoMenu />}
        </DragMenu>
      )}
    </MenuContext.Consumer>
  )
}
