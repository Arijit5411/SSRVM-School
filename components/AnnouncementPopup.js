import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class AnnouncementPopup extends Component {
  state = {
    isOpen: false,
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { announcement ,siteUrl} = this.props;
    return (
      <>
        <button type="button" className="btn-home" onClick={this.openModal}>
          Know more
        </button>
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <div className="displayFlex displayBlock">
              <img
                src={`${siteUrl}${announcement.attributes.image.data.attributes.url}`}
                alt="school"
                className="imgPop"
              />
              <p className="popUptext">
                <span className="popupTitle">
                  {announcement.attributes.heading}
                </span>
                <br></br>
                {announcement.attributes.description}
              </p>
            </div>
          </Modal.Header>
        </Modal>
      </>
    );
  }
}

export default AnnouncementPopup;
