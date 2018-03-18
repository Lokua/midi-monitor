import React, { Component } from 'react'
import styled from 'styled-components'
import { capitalize } from 'lodash/fp'
import { transparentize } from 'polished'

import { connect } from './context'
import ax from './styles'

const Container = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${ax.color('textInverted')};
  background-color: ${ax.color('backgroundInverted')};
  color: ${ax.color('textInverted')};
`

const Table = styled.table`
  display: block;
  width: 100%;
  height: 100%;

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead {
    border-bottom: 1px solid ${ax.color('background')};
  }

  tr {
    border-bottom: 1px solid ${ax.color('background')(transparentize(0.75))};
  }

  th,
  td {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  tbody {
    display: block;
    height: calc(100% - 7.25rem);
    overflow: auto;
  }
`

const enhance = connect(['log', 'settings'])

class Console extends Component {
  componentDidUpdate() {
    if (this.props.settings.console.follow) {
      this.scrollToBottomOfTable()
    }
  }

  scrollToBottomOfTable() {
    this.tableBody.scrollTop = this.tableBody.scrollHeight
  }

  humanReadableType(type) {
    return type
      .split(/([A-Z].+)/)
      .filter(Boolean)
      .map(s => ` ${capitalize(s)}`)
      .join('')
      .slice(1)
  }

  getValue(column, value) {
    if (column === 'type') {
      return this.humanReadableType(value)
    }

    return value
  }

  render() {
    const { log, settings } = this.props
    const { columns } = settings.console
    const columnKeys = Object.keys(columns).filter(key => columns[key])

    return (
      <Container>
        <Table>
          <thead>
            <tr>
              {columnKeys.map(column => (
                <th key={column}>{capitalize(column)}</th>
              ))}
            </tr>
          </thead>
          <tbody ref={node => (this.tableBody = node)}>
            {log.map((entry, index) => (
              <tr key={index}>
                {columnKeys.map(column => (
                  <td key={column}>{this.getValue(column, entry[column])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }
}

export default enhance(Console)
