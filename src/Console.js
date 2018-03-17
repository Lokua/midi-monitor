import React, { Component } from 'react'
import styled from 'styled-components'
import { ellipsis } from 'polished'

import { connect } from './context'
import ax from './styles'

const Container = styled.div`
  position: relative;
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

  th,
  td {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  tbody {
    display: block;
    height: 100%;
    overflow: auto;
  }
`

const enhance = connect(['log', 'consoleSettings'])

class Console extends Component {
  componentDidUpdate() {
    if (this.props.consoleSettings.follow) {
      this.scrollToBottomOfTable()
    }
  }

  scrollToBottomOfTable() {
    this.tableBody.scrollTop = this.tableBody.scrollHeight
  }

  render() {
    const { log } = this.props

    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Port</th>
              <th>Status</th>
              <th>Data 1</th>
              <th>Data 2</th>
            </tr>
          </thead>
          <tbody ref={node => (this.tableBody = node)}>
            {log.map(({ input, timestamp, data }, index) => (
              <tr key={index}>
                <td>{timestamp}</td>
                <td>{input}</td>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }
}

export default enhance(Console)
