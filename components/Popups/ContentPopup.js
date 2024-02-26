const ContentPopup = ({ children, onOpen, onClose, className }) => {
  return (
    <div className={`popup-main content-popup ${className} ${onOpen ? 'active' : ''}`}>
      <div className="popup-container">
        <div className="popup-wrap">
          <button onClick={onClose} className="close-popup">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="popup-holder">
            <div className="popup-block">
              <div className="popup-content">
                <div className="popup-props">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPopup;
