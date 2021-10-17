import { useState } from 'react';
import Searchbar from './Components/Searchbar';
import ImagesGalleryInfo from './Components/ImageGalleryInfo';
import Modal from './Components/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImageInfo, setModalImageInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onSearchbarSubmit = searchQuery => {
    if (!searchQuery.trim()) {
      alert('Empty query');
      return;
    }
    setSearchQuery(searchQuery);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
    setModalImageInfo(modalImageInfo => modalImageInfo && null);
  };

  const onImageClick = ({ originUrl, tags }) => {
    toggleModal();
    setModalImageInfo({ url: originUrl, tags });
  };

  return (
    <>
      <Searchbar onSubmit={onSearchbarSubmit} />
      <ImagesGalleryInfo searchQuery={searchQuery} onClick={onImageClick} />
      {showModal && <Modal onClose={toggleModal} image={modalImageInfo} />}
    </>
  );
}
