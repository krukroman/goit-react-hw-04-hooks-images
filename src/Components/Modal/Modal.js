import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import { ReactComponent as CloseIcon } from './icon-close.svg';

const portal = document.getElementById('portal');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  onBackdropClick = e => {
    const { currentTarget, target } = e;
    if (currentTarget === target) {
      this.props.onClose();
    }
  };

  onEscape = e => {
    const { code } = e;

    if (code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseBtnClick = e => {
    e.preventDefault();
    this.props.onClose();
  };

  render() {
    const { url, tags } = this.props.image;
    const onBackdropClick = this.onBackdropClick;
    return createPortal(
      <div className="Overlay" onClick={onBackdropClick}>
        <img src={url} alt={tags} />
        <Button className="CloseModalButton" onClick={this.onCloseBtnClick}>
          <CloseIcon />
        </Button>
      </div>,
      portal,
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    tags: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
