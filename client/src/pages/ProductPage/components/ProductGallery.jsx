/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from "react";
import NoImage from "../../../shared/image/no-img.png";
import PropTypes from "prop-types";
import Lightbox from "react-images";
import "./productPage.scss";

export default class ProductGallery extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
      })
    ).isRequired,
  };

  constructor() {
    super();
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      currentImagePreview: 0,
    };
  }

  changeImg = (i, e) => {
    e.preventDefault();
    this.setState({
      currentImagePreview: i,
      currentImage: i,
    });
  };

  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  };

  closeLightbox = () => {
    this.setState((prevState) => ({
      currentImage: prevState.currentImagePreview,
      lightboxIsOpen: false,
    }));
  };

  gotoPrevious = () => {
    this.setState((prevState) => ({
      currentImage: prevState.currentImage - 1,
    }));
  };

  gotoNext = () => {
    this.setState((prevState) => ({
      currentImage: prevState.currentImage + 1,
    }));
  };

  gotoImage = (index) => {
    this.setState({
      currentImage: index,
    });
  };

  handleClickImage = () => {
    const { images } = this.props;
    const { currentImage } = this.state;
    if (currentImage === images.length - 1) return;
    this.gotoNext();
  };

  render() {
    const { images } = this.props;
    const { currentImage, currentImagePreview, lightboxIsOpen } = this.state;
    console.log(images, currentImage, currentImagePreview, lightboxIsOpen);
    const url =
      images &&
      images.map((el) => {
        return {
          src: el.url,
        };
      });
    return (
      <>
        <div className="product-gallery">
          <a
            className="product-gallery__current-img"
            onClick={(e) => this.openLightbox(currentImage, e)}
            // href={images && images[currentImage].url}
          >
            {images ? (
              <img
                src={
                  images[currentImage] == undefined
                    ? NoImage
                    : images[currentImage].url
                }
              />
            ) : (
              <img src={NoImage} />
            )}
          </a>
          <div className="product_gallery__gallery">
            {images &&
              images.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={(e) => this.changeImg(i, e)}
                  className="product-gallery__img-preview"
                >
                  <img src={img.url} alt="product-img" />
                </button>
              ))}
          </div>
          <Lightbox
            currentImage={currentImage}
            images={url ? url : []}
            isOpen={lightboxIsOpen}
            onClickImage={this.handleClickImage}
            onClickNext={this.gotoNext}
            onClickPrev={this.gotoPrevious}
            onClickThumbnail={this.gotoImage}
            onClose={this.closeLightbox}
          />
        </div>
      </>
    );
  }
}

// </div>
