import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { capitalize } from 'lodash/fp'
import { getLuminance, transparentize } from 'polished'

import { connect } from './context'
import ax from './styles'

function handleColorProps(props) {
  const luminance = getLuminance(props.theme.color.background)

  if (luminance < 0.5) {
    return css`
      border: 1px solid ${ax.color('text')(transparentize(0.75))};
      background-color: ${ax.color('background')};
      color: ${ax.color('text')};

      thead {
        border-bottom-color: ${ax.color('backgroundInverted')};
      }

      tr {
        border-bottom-color: ${ax.color('backgroundInverted')(
          transparentize(0.75)
        )};
      }
    `
  }

  return css`
    border: 1px solid ${ax.color('textInverted')};
    background-color: ${ax.color('backgroundInverted')};
    color: ${ax.color('textInverted')};

    thead {
      border-bottom-color: ${ax.color('background')};
    }

    tr {
      border-bottom-color: ${ax.color('background')(transparentize(0.75))};
    }
  `
}

const Container = styled.div`
  position: relative;
  height: calc(100% - 4rem);
  overflow: hidden;
  margin-top: 0.75rem;
  ${handleColorProps};
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

  thead,
  tr {
    border-bottom-style: solid;
    border-bottom-width: 1px;
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
    height: calc(100% - (4rem - 2px));
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

  getLog() {
    const { log, settings: { console: { filters } } } = this.props

    return log.filter(
      entry => filters.types[entry.type] && filters.channels[entry.channel]
    )
  }

  render() {
    const { settings } = this.props
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
            {this.getLog().map((entry, index) => (
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
