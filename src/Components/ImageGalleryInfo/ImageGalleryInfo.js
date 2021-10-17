import { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImages from '../../services/apiService';
import ImageGallery from './ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
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

export default class ImagesGalleryInfo extends Component {
  stateDefault = {
    pageNumber: 1,
    perPage: 12,
  };

  state = {
    pageNumber: this.stateDefault.pageNumber,
    images: null,
    showLoadMoreBtn: false,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSeachQuery = this.props.searchQuery;

    const defaultPageNumber = this.stateDefault.pageNumber;
    const defaultPerPage = this.stateDefault.perPage;

    const prevPageNumber = prevState.pageNumber;
    const nextPageNumber = this.state.pageNumber;
    const prevImages = prevState.images;

    if (prevSearchQuery !== nextSeachQuery) {
      this.resetPageNubmer();
      this.getImages(nextSeachQuery, defaultPageNumber, defaultPerPage);
    }
    if (nextPageNumber > prevPageNumber) {
      this.getImages(
        prevSearchQuery,
        nextPageNumber,
        defaultPerPage,
        prevImages,
      );
    }
  }

  getImages = (query, page, perPage, prevImages) => {
    this.setState({
      status: 'pending',
    });
    fetchImages(query, page, perPage)
      .then(response => {
        const { hits, total } = response;
        if (total === 0) {
          this.setState({
            images: null,
            showLoadMoreBtn: false,
            status: 'rejected',
          });
          toast.error(`By query "${query}" images not found`, TOAST_OPTIONS);
          return;
        }
        if (page === Math.ceil(total / perPage)) {
          toast.warn(`That is all we found by query "${query}"`, TOAST_OPTIONS);
          this.setState({
            showLoadMoreBtn: false,
            status: 'resolved',
          });
        } else {
          this.setState({
            showLoadMoreBtn: true,
            status: 'resolved',
          });
        }
        this.setState({
          images: prevImages ? [...prevImages, ...hits] : [...hits],
        });
        prevImages ? this.smoothScrollDown() : this.smoothScrollUp();
      })
      .catch(error => {
        this.setState({
          error: error.message,
        });
      });
  };

  onLoadMoreBtnClick = e => {
    e.preventDefault();
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  resetPageNubmer = () => {
    this.setState({
      pageNumber: this.stateDefault.pageNumber,
    });
  };

  smoothScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  smoothScrollUp = () => {
    window.scrollTo({
      top: document.getElementById('root'),
      behavior: 'smooth',
    });
  };

  render() {
    const { images, showLoadMoreBtn, status } = this.state;
    const { onClick } = this.props;
    const onLoadMoreBtnClick = this.onLoadMoreBtnClick;

    return (
      <>
        <ImageGallery galleryData={images} onClick={onClick} />
        {showLoadMoreBtn && (
          <div className="ButtonWrapper">
            <Button className="Button" onClick={onLoadMoreBtnClick}>
              Load more
            </Button>
          </div>
        )}
        {status === 'pending' && <Loader />}
        <ToastContainer />
      </>
    );
  }
}

ImagesGalleryInfo.propTypes = {
  searchQuery: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
