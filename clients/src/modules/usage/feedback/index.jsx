import Provider from './context'
import MsgThreads from './msg-threads'

export default () => {
  return (
    <Provider>
      <MsgThreads />
    </Provider>
  )
}
