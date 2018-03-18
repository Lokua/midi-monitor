import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ax from '../styles'
import Icon from './Icon'

const Dialog = styled.dialog`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3rem;
  border: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

const ModalDialog = styled.div`
  z-index: 2;
  position: relative;
  top: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: ${ax.color('background')};
  border-radius: 2px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5);
`

const Close = styled(Icon).attrs({ name: 'close' })`
  position: absolute;
  top: 1rem;
  right: 3rem;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`

export default class Modal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func
  }

  state = {
    documentBodyOverflow: ''
  }

  componentDidMount() {
    this.setState({
      documentBodyOverflow: global.document.body.style.overflow
    })
  }

  componentWillReceiveProps(nextProps) {
    this.handleDocumentOverflow(nextProps)
  }

  handleDocumentOverflow(nextProps) {
    const { style } = global.document.body

    if (!this.props.open && nextProps.open) {
      style.overflow = 'hidden'
    } else if (this.props.open && !nextProps.open) {
      style.overflow = this.state.documentBodyOverflow
    }
  }

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose()
    }
  }

  render() {
    const { open, onClose, children } = this.props

    return (
      <Dialog open={open} onClick={this.onBackdropClick}>
        {open && (
          <ModalDialog>
            {onClose && <Close onClick={onClose} />}
            {children}
          </ModalDialog>
        )}
      </Dialog>
    )
  }
}
