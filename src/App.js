import React, { Component } from 'react'

import { connect } from './context'
import Tabs from './components/Tabs'
import PortSelector from './PortSelector'
import Console from './Console'

export class App extends Component {
  static removeSplash() {
    document.body.removeChild(document.getElementById('splash'))
  }

  componentDidMount() {
    App.removeSplash()
    this.props.initMidiAccess()
  }

  updateView = (index, view) => {
    this.props.update({ view })
  }

  render() {
    const { inputs, selectedInputs, view, toggleInputSelected } = this.props

    const views = ['ports', 'console']

    return (
      <div>
        <Tabs
          tabs={views}
          activeIndex={views.indexOf(view)}
          onClickTab={this.updateView}
        />

        {view === 'ports' && (
          <PortSelector
            inputs={inputs}
            selectedInputs={selectedInputs}
            onToggle={toggleInputSelected}
          />
        )}

        {view === 'console' && <Console />}
      </div>
    )
  }
}

export default connect()(App)
