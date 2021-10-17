import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  previewUrl,
  originUrl,
  tags,
  onClick,
}) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={previewUrl}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={e => onClick({ originUrl, tags })}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  previewUrl: PropTypes.string,
  originUrl: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
