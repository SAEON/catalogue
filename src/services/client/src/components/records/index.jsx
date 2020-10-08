import React from 'react'
import Results from './results'
import SearchBar from './search-bar'
import { isMobile } from 'react-device-detect'

export default ({ showSearchBar = false, ...props } = {}) => {
  return showSearchBar ? (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'block', width: '100%' }}>
            <SearchBar />
          </div>
        </div>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <div style={{ display: 'block', width: '100%' }}>
            <Results {...props} hideSidebar={isMobile ? true : false} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Results {...props} hideSidebar={isMobile ? true : false} />
  )
}
