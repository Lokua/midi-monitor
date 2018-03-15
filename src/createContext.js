import React, { Component } from 'react'
import { identity, pick } from 'lodash/fp'

export default function createContext(createInitialState) {
  const Context = React.createContext()

  return {
    Consumer: Context.Consumer,
    Provider: createProvider(Context, createInitialState),
    connect: createConnect(Context)
  }
}

function createProvider(Context, createInitialState) {
  return class Provider extends Component {
    constructor(props) {
      super(props)

      const getState = () => this.state

      const update = state =>
        new Promise(resolve => {
          this.setState(state, resolve)
        })

      this.state = {
        getState,
        update
      }

      const initialState = createInitialState({
        getState,
        update
      })

      Object.keys(initialState).forEach(key => {
        const value = initialState[key]
        this.state[key] =
          typeof value === 'function' ? value.bind(this.state) : value
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
      {context => {
        const map = Array.isArray(mapContextToProps)
          ? pick(mapContextToProps)
          : mapContextToProps

        const mappedProps = map(context)

        return <Comp {...props} {...mappedProps} />
      }}
    </Context.Consumer>
  )
}
