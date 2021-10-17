import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import { ReactComponent as CloseIcon } from './icon-close.svg';

const portal = document.getElementById('portal');

export default function Modal({ image, onClose }) {
  const { url, tags } = image;
  useEffect(() => {
    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  });

  const onBackdropClick = e => {
    const { currentTarget, target } = e;
    if (currentTarget === target) {
      this.props.onClose();
    }
  };

  const onEscape = e => {
    const { code } = e;

    if (code === 'Escape') {
      onClose();
    }
  };

  const onCloseBtnClick = e => {
    e.preventDefault();
    onClose();
  };

  return createPortal(
    <div className="Overlay" onClick={onBackdropClick}>
      <img src={url} alt={tags} />
      <Button className="CloseModalButton" onClick={onCloseBtnClick}>
        <CloseIcon />
      </Button>
    </div>,
    portal,
  );
}

Modal.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    tags: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
