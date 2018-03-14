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

function createProvider(Context, initialState = {}) {
  return class Provider extends Component {
    constructor(props) {
      super(props)

      this.state = {
        getState: () => this.state,
        update: state =>
          new Promise(resolve => {
            this.setState(state, resolve)
          })
      }

      Object.keys(initialState).forEach(key => {
        const value = initialState[key]
        this.state[key] = value
        typeof value === 'function' &&
          (this.state[key] = value.bind(this.state))
      })
    }

    componentDidUpdate(prevProps, prevState) {
      if (process.env.NODE_ENV === 'development') {
        console.group('Provider#componentDidUpdate')
        console.log('prevState:', prevState)
        console.log('state:', this.state)
        console.groupEnd()
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
