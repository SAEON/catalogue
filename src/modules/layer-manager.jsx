import { Component } from 'react'
import LayerGroup from 'ol/layer/Group'

export default class extends Component {
  state = { render: 0 }

  constructor(props) {
    super(props)
    const { map } = this.props
    const reRender = this.reRender

    this.proxy = new Proxy(
      // Map proxy object
      Object.defineProperties(
        {},
        {
          reorderLayers: {
            value: (startIndex, endIndex) => {
              const layers = Array.from(map.getLayers().getArray())
              const [removed] = layers.splice(startIndex, 1)
              layers.splice(endIndex, 0, removed)
              map.setLayerGroup(new LayerGroup({ layers }))
              reRender()
            }
          },
          removeLayer: {
            value: layer => {
              map.removeLayer(layer._target)
              reRender()
            }
          },
          addLayer: {
            value: layer => {
              // TODO no duplicates
              map.addLayer(layer)
              reRender()
            }
          },
          getLayers: {
            get: () => () =>
              new Proxy(
                // Collection proxy object
                Object.defineProperties(
                  {},
                  {
                    _target: {
                      value: map.getLayers()
                    },
                    getArray: {
                      get: () => () =>
                        new Proxy(
                          map
                            .getLayers()
                            .getArray()
                            .map(
                              layer =>
                                new Proxy(
                                  // Layer proxy object
                                  Object.defineProperties(
                                    {},
                                    {
                                      _target: {
                                        value: layer
                                      },
                                      get: {
                                        get: () => attribute => layer.get(attribute)
                                      }
                                    }
                                  ),
                                  {
                                    get: (target, prop) =>
                                      target.hasOwnProperty(prop)
                                        ? target[prop]
                                        : typeof target._target[prop] === 'function'
                                        ? (...args) => {
                                            target._target[prop].apply(target._target, [...args])
                                            reRender()
                                          }
                                        : target._target[prop]
                                  }
                                )
                            ),

                          // getArray() proxy handler (proxies an array)
                          // Arrays as proxy objects are transparent
                          {
                            get: (target, prop) => target[prop]
                          }
                        )
                    }
                  }
                ),

                // getLayers() proxy handler (proxies an OpenLayers Collection)
                {
                  get: (target, prop) =>
                    target.hasOwnProperty(prop)
                      ? target[prop]
                      : typeof target[prop] === 'function'
                      ? (...args) => {
                          target._target[prop].apply(target._target, [...args])
                          reRender()
                        }
                      : target._target[prop]
                }
              )
          }
        }
      ),

      // map proxy object (proxies the map object)
      {
        get: (target, prop) =>
          target.hasOwnProperty(prop)
            ? target[prop]
            : typeof map[prop] === 'function'
            ? (...args) => {
                map[prop].apply(map, [...args])
                reRender()
              }
            : map[prop]
      }
    )
  }

  reRender = () => this.setState({ render: this.state.render + 1 })

  render() {
    const { proxy } = this
    return this.props.children({ proxy })
  }
}
