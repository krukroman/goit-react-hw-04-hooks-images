import { useEffect, useState } from 'react';
import Searchbar from './Components/Searchbar';
import fetchImages from './services/apiService';
import ImageGallery from './Components/ImageGallery';
import Loader from './Components/Loader';
import Button from './Components/Button';
import Modal from './Components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOAST_OPTIONS = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const perPage = 12;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImageInfo, setModalImageInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const getImagesCollection = () => {
      setIsLoading(true);
      fetchImages(searchQuery, pageNumber, perPage)
        .then(response => {
          const { hits, total } = response;
          if (total === 0) {
            setImages([]);
            setIsLoading(false);
            setShowLoadMoreBtn(false);
            toast.error(
              `By query "${searchQuery}" images not found`,
              TOAST_OPTIONS,
            );
            return;
          }
          if (pageNumber === Math.ceil(total / perPage)) {
            setShowLoadMoreBtn(false);
            toast.warn(
              `That is all we found by query "${searchQuery}"`,
              TOAST_OPTIONS,
            );
          } else setShowLoadMoreBtn(true);
          setImages(prevImages => [...prevImages, ...hits]);
          setIsLoading(false);
          if (pageNumber > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })
        .catch(error => {
          setError(error.message);
        });
    };
    getImagesCollection();
  }, [searchQuery, pageNumber]);

  const onLoadMoreBtnClick = e => {
    e.preventDefault();
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const onSearchbarSubmit = searchQuery => {
    if (!searchQuery.trim()) {
      toast.error('Empty query', TOAST_OPTIONS);
      return;
    }
    setSearchQuery(searchQuery);
    setImages([]);
    setPageNumber(1);
    setShowLoadMoreBtn(false);
  };

  const onImageClick = ({ originUrl, tags }) => {
    toggleModal();
    setModalImageInfo({ url: originUrl, tags });
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
    setModalImageInfo(modalImageInfo => modalImageInfo && null);
  };

  return (
    <>
      <Searchbar onSubmit={onSearchbarSubmit} />
      {searchQuery && images.length > 0 && (
        <ImageGallery galleryData={images} onClick={onImageClick} />
      )}
      {showLoadMoreBtn && (
        <div className="ButtonWrapper">
          <Button className="Button" onClick={onLoadMoreBtnClick}>
            Load more
          </Button>
        </div>
      )}
      {isLoading && <Loader />}
      {showModal && <Modal onClose={toggleModal} image={modalImageInfo} />}
      {error && toast.error(error, TOAST_OPTIONS)}
      <ToastContainer />
    </>
  );
}
