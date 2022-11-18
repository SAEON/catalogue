import { useContext, useMemo, useState, useEffect } from 'react'
import { context as ListsContext } from '../context'
import ContentNav from '../../../components/content-nav'
import Fade from '@mui/material/Fade'
import NoItems from '../components/no-items'
import ListItem from '../components/list-item'
import { Folder as InactiveIcon, FolderOpen as ActiveIcon } from '../../../components/icons'
import { Span } from '../../../components/html-tags'

export default () => {
  const [renderCount, setRenderCount] = useState(0)
  const { lists } = useContext(ListsContext)

  const navItems = useMemo(
    () =>
      lists.map(({ id, title, description, ...props }) => ({
        id,
        title,
        description,
        primaryText: title,
        secondaryText: description,
        Icon: ({ active }) => (active ? <ActiveIcon /> : <InactiveIcon />),
        ...props,
      })),
    [lists]
  )

  useEffect(() => {
    setRenderCount(c => c + 1)
  }, [navItems])

  if (!navItems.length) {
    return (
      <Fade unmountOnExit mountOnEnter in={true}>
        <Span>
          <NoItems />
        </Span>
      </Fade>
    )
  }

  return (
    <ContentNav activeIndex={renderCount === 1 ? 0 : lists.length - 1} navItems={navItems}>
      {({ activeIndex }) => {
        return navItems.map(({ id, ...props }, i) => (
          <Fade unmountOnExit mountOnEnter in={activeIndex === i} key={id}>
            <Span sx={{ display: activeIndex === i ? 'inherit' : 'none' }}>
              <ListItem key={id} id={id} {...props} />
            </Span>
          </Fade>
        ))
      }}
    </ContentNav>
  )
}
