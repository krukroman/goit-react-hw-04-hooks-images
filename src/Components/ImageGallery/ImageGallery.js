import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';
export default function ImageGallery({ galleryData, onClick }) {
  return (
    <ul className="ImageGallery">
      {galleryData.map(({ webformatURL, largeImageURL, tags }, index) => {
        return (
          <ImageGalleryItem
            key={index}
            previewUrl={webformatURL}
            originUrl={largeImageURL}
            tags={tags}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  galleryData: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    }).isRequired,
  ),
  onClick: PropTypes.func.isRequired,
};
