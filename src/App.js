import { Component } from 'react';
import Searchbar from './Components/Searchbar';
import ImagesGalleryInfo from './Components/ImageGalleryInfo';
import Modal from './Components/Modal';

export default class App extends Component {
  state = {
    searchQuery: null,
    modalImageInfo: null,
    showModal: false,
  };

  onSearchbarSubmit = searchQuery => {
    if (!searchQuery.trim()) {
      alert('Empty query');
      return;
    }
    this.setState({
      searchQuery,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal, modalImageInfo }) => ({
      showModal: !showModal,
      modalImageInfo: modalImageInfo && null,
    }));
  };

  onImageClick = ({ originUrl, tags }) => {
    this.toggleModal();
    this.setState({
      modalImageInfo: {
        url: originUrl,
        tags,
      },
    });
  };

  render() {
    const { searchQuery, showModal, modalImageInfo } = this.state;

    const onSearchbarSubmit = this.onSearchbarSubmit;
    const toggleModal = this.toggleModal;
    const onImageClick = this.onImageClick;
    return (
      <>
        <Searchbar onSubmit={onSearchbarSubmit} />
        <ImagesGalleryInfo searchQuery={searchQuery} onClick={onImageClick} />
        {showModal && <Modal onClose={toggleModal} image={modalImageInfo} />}
      </>
    );
  }
}
