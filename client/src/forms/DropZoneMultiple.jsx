/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { connect } from "react-redux";

class DropZoneMultipleField extends PureComponent {
  // static propTypes = {
  //   onChange: PropTypes.func.isRequired,
  //   name: PropTypes.string.isRequired,
  //   value: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.arrayOf(
  //       PropTypes.shape({
  //         name: PropTypes.string,
  //       })
  //     ),
  //   ]).isRequired,
  // };

  state = {
    images: [],
  };
  getInfo = (files) => {
    console.log(files);
    const { token } = this.props.currentUser;
    let uploadFiles = [];
    files.map((fl, i) => {
      Resizer.imageFileResizer(
        fl,
        400,
        400,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post(
              "http://localhost:5000/api/uploadimages",
              { image: uri },
              {
                headers: {
                  "Access-Control-Allow-Origin": true,
                  authtoken: token ? token : "",
                },
              }
            )
            .then((res) => {
              uploadFiles.push(res.data);
              this.setState({
                images: [...uploadFiles],
              });
            });
        },
        "base64"
      );
    });
    return uploadFiles;
  };

  handleImage = (files) => {
    if (files) {
      return this.getInfo(files);
    }
  };

  onDrop(files) {
    const { value, onChange } = this.props.input;

    const y = this.handleImage(files);

    onChange(y);
  }

  removeFile = (index, e) => {
    const { value, onChange } = this.props.input;
    console.log(index);
    const files = this.state.images;
    e.preventDefault();
    onChange(
      files.filter((fl, i) => {
        if (i !== index) {
          this.setState(
            {
              images: fl[index],
            },
            () => console.log(this.state.images)
          );
        }
      })
    );
  };

  render() {
    const { name, value } = this.props.input;
    const files = this.state.images;

    console.log(files);

    return (
      <div className="dropzone dropzone--multiple">
        <Dropzone
          className="dropzone__input"
          accept="image/jpeg, image/png"
          name={name}
          onDrop={(filesToUpload) => {
            this.onDrop(value ? value.concat(filesToUpload) : filesToUpload);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone__input">
              {(!files || files.length === 0) && (
                <div className="dropzone__drop-here">
                  <span className="lnr lnr-upload"> Upuść plik </span>
                </div>
              )}
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
        {files && Array.isArray(files) && (
          <div className="dropzone__imgs-wrapper">
            {files.map((file, i) => (
              <div className="dropzone__img" key={i}>
                <img
                  src={file.url}
                  alt=""
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundSize: "cover",
                  }}
                />
                {/* <p className="dropzone__img-name">{file.name}</p> */}
                <button
                  className="dropzone__img-delete"
                  type="button"
                  onClick={(e) => this.removeFile(i, e)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

// const renderDropZoneMultipleField = (props) => {
//   const { input } = props;
//   console.log(input);
//   return <DropZoneMultipleField {...input} />;
// };

// renderDropZoneMultipleField.propTypes = {
//   input: PropTypes.shape({
//     onChange: PropTypes.func,
//     name: PropTypes.string,
//   }).isRequired,
// };

export default connect(mapStateToProps)(DropZoneMultipleField);
