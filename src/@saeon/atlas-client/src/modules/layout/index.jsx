import React, { PureComponent } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap, esriLayer } from '../../lib/ol'
import { NavigationDial, navItem } from './_navigation'
import { SaeonSearch, LayerManager } from '..'
import {
  Settings as SettingsIcon,
  BeachAccess as BeachAccessIcon,
  Search as SearchIcon,
  Layers as LayersIcon,
  List as ListIcon,
  BarChart as BarChartIcon,
  Menu as MenuIcon
} from '@material-ui/icons'
import { DragMenu, SideMenu } from '../../components'

const esriUrls = [
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_rain_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_AveTemp_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_rain_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/SA_flood_hazard_index/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Drought_tendencies_base_v2/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_vhd_v4/MapServer'
]

export default class extends PureComponent {
  state = {
    menuAnchor: null
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { menuAnchor } = this.state
    return (
      <>
        <AppBar variant="outlined" position="static">
          <Toolbar disableGutters={false} variant="dense">
            <IconButton
              onClick={e => this.setState({ menuAnchor: e.currentTarget })}
              style={{ padding: 0 }}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={menuAnchor}
              keepMounted
              open={Boolean(menuAnchor)}
              onClose={() => this.setState({ menuAnchor: null })}
            >
              <MenuItem onClick={() => alert('hi')}>Not</MenuItem>
              <MenuItem onClick={() => alert('hi')}>sure</MenuItem>
              <MenuItem onClick={() => alert('hi')}>if</MenuItem>
              <MenuItem onClick={() => alert('hi')}>this</MenuItem>
              <MenuItem onClick={() => alert('hi')}>is</MenuItem>
              <MenuItem onClick={() => alert('hi')}>needed</MenuItem>
              <MenuItem onClick={() => alert('hi')}>yet</MenuItem>
            </Menu>
            <Typography style={{ padding: '10px' }} display="block" variant="body2">
              SAEON Atlas
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ height: 'calc(100% - 42px)', width: '100%' }}>
          <OlReact
            layers={[
              ...esriUrls.map((uri, i) => esriLayer({ uri, title: 'esri ' + i })),
              terrestrisBaseMap()
            ]}
            style={{ width: '100%', height: '100%' }}
          >
            {({ map }) => (
              <MapProxy map={map}>
                {({ proxy }) => (
                  <>
                    {/* Search SpeedDial menu */}
                    <NavigationDial
                      direction={'left'}
                      icon={<SearchIcon />}
                      searchSaeonOpen={false}
                      searchCSIROpen={false}
                      style={{ position: 'absolute', right: 20, top: 57 }}
                    >
                      {(toggle, { searchSaeonOpen, searchCSIROpen }) => [
                        navItem({
                          icon: <Avatar>S</Avatar>,
                          tooltip: 'Saerch SAEON data',
                          toggle: () => toggle({ searchSaeonOpen: !searchSaeonOpen }),
                          title: 'Search SAEON data',
                          active: searchSaeonOpen,
                          Component: (
                            <DragMenu
                              title={'Search SAEON data'}
                              active={searchSaeonOpen}
                              close={() => toggle({ searchSaeonOpen: false })}
                            >
                              <SaeonSearch proxy={proxy} />
                            </DragMenu>
                          )
                        }),
                        navItem({
                          icon: <Avatar>C</Avatar>,
                          tooltip: 'Saerch CSIR data',
                          toggle: () => toggle({ searchCSIROpen: !searchCSIROpen }),
                          title: 'Search CSIR data',
                          active: searchCSIROpen,
                          Component: (
                            <SideMenu
                              location="top"
                              active={searchCSIROpen}
                              toggle={() => toggle({ searchCSIROpen: !searchCSIROpen })}
                            >
                              hello world
                            </SideMenu>
                          )
                        })
                      ]}
                    </NavigationDial>

                    {/* Layers SpeedDial menu */}
                    <NavigationDial
                      direction={'left'}
                      icon={<LayersIcon />}
                      layerMenuOpen={false}
                      chartMenuOpen={false}
                      style={{ position: 'absolute', right: 20, top: 127 }}
                    >
                      {(toggle, { layerMenuOpen, chartMenuOpen }) => [
                        navItem({
                          icon: <ListIcon />,
                          tooltip: 'Layers menu',
                          toggle: () => toggle({ layerMenuOpen: !layerMenuOpen }),
                          Component: (
                            <DragMenu
                              title={'Open layers menu'}
                              active={layerMenuOpen}
                              close={() => toggle({ layerMenuOpen: false })}
                            >
                              <LayerManager layersActive={layerMenuOpen} proxy={proxy} />
                            </DragMenu>
                          )
                        }),
                        navItem({
                          icon: <BarChartIcon />,
                          tooltip: 'Charts',
                          toggle: () => toggle({ chartMenuOpen: !chartMenuOpen }),
                          Component: (
                            <DragMenu
                              title={'Open chart menu'}
                              active={chartMenuOpen}
                              close={() => toggle({ chartMenuOpen: false })}
                            >
                              TODO
                            </DragMenu>
                          )
                        })
                      ]}
                    </NavigationDial>

                    {/* App Configuration SpeedDial menu */}
                    <NavigationDial
                      direction={'left'}
                      icon={<SettingsIcon />}
                      configMenuOpen={false}
                      style={{ position: 'absolute', right: 20, top: 197 }}
                    >
                      {(toggleConfigMenu, { configMenuOpen }) => [
                        navItem({
                          icon: <BeachAccessIcon />,
                          tooltip: 'TODO',
                          toggle: () => toggleConfigMenu({ configMenuOpen: !configMenuOpen }),
                          title: 'Config TODO menu',
                          active: configMenuOpen,
                          Component: (
                            <DragMenu
                              title={'App configuration'}
                              active={configMenuOpen}
                              close={() => toggleConfigMenu({ configMenuOpen: false })}
                            >
                              hello world
                            </DragMenu>
                          )
                        })
                      ]}
                    </NavigationDial>
                  </>
                )}
              </MapProxy>
            )}
          </OlReact>
        </div>
      </>
    )
  }
}
