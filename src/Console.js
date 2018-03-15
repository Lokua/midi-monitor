import React, { Component } from 'react'
import { connect } from './context'

const enhance = connect(['log'])

class Console extends Component {
  componentWillReceiveProps() {
    this.table.scrollTop = this.table.scrollHeight
  }

  render() {
    const { log } = this.props

    return (
      <div>
        <table ref={node => (this.table = node)}>
          <thead>
            <tr>
              <th>Port</th>
              <th>Status</th>
              <th>Data 1</th>
              <th>Data 2</th>
            </tr>
          </thead>
          <tbody>
            {log.map(({ input, data }, index) => (
              <tr key={index}>
                <td>{input}</td>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default enhance(Console)
