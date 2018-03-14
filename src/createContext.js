import React, { Component } from 'react'
import { identity } from 'lodash/fp'

export default function createContext(initialState = {}) {
  const Context = React.createContext()

  return {
    Consumer: Context.Consumer,
    Provider: createProvider(Context, initialState),
    connect: createConnect(Context)
  }
}

function createProvider(Context, initialState, methods = {}) {
  return class Provider extends Component {
    constructor(props) {
      super(props)

      this.state = {
        update: state =>
          new Promise(resolve => {
            this.setState(state, resolve)
          }),

        ...Object.keys(initialState).reduce((state, key) => {
          state[key] = initialState[key]

          if (typeof key === 'function') {
            state[key] = state[key].bind(this)
          }

          return state
        }, {})
      }
    }

    render() {
      return (
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      )
    }
  }
}

function createConnect(Context) {
  return (mapContextToProps = identity) => Comp => props => (
    <Context.Consumer>
      {context => <Comp {...props} {...mapContextToProps(context)} />}
    </Context.Consumer>
  )
}
