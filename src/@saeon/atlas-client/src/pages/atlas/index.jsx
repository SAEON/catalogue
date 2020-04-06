import React from 'react'
import TopBar from './_top-bar'
import SearchMenu from './_search-menu'
import MapMenu from './_map-menu'
import ConfigMenu from './_config-menu'
import ScreenshotMenu from './_screenshot-menu'

export default () => (
  <>
    <TopBar />
    <SearchMenu />
    <MapMenu />
    <ConfigMenu />
    <ScreenshotMenu/>
  </>
)
