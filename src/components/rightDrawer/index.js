import { h } from 'preact';

export const Modal = ({ onClose, title, children, isThisPreviewModal, modalSize, modalHeight, modalDisplay, isHeaderImage, imageURL, modalFor, isProfileModal, closeID }) => {
  return (
    <div className={'modal ' + modalDisplay + (isThisPreviewModal ? ' previewModalStyling' : '')}>
      <div  id={modalFor} className={'modal-content ' + modalSize + (modalHeight ? (' ' + modalHeight) : '') + ((closeID === 'CustomerVisitMenu' || closeID === 'userProfileMenu') ? ' full-modal' : '')}>
        {
          !isProfileModal && (
            <header class="modal-header" style={isHeaderImage ? 'height: auto !important; display: block !important; ;' : ''}>
              {
                isHeaderImage && (
                  <img src={imageURL} />
                )
              }
              <h6>{title}</h6>
              {/*<a class="close" onClick={onClose}>
            x {modalFor}
          </a>*/}
              <div class="right-drawer-label" style="z-index: -1;top: 0; right: 0;" onClick={onClose}>
                <div class="right-drawer-close-btn" title="Close">
                  <div class="right-drawer-close-btn-inner" />
                </div>
                <span class="right-drawer-label-text"><strong>{modalFor}</strong></span>
              </div>
            </header>
          )}

        {/*
            modified by : Vihang
            modified at : 04/04/2022
            modification: closing button on right bottom position
          */}
        {
          isProfileModal && (
            <div class="right-drawer-label" id={closeID} style="top: 0; left: -49px;" onClick={onClose}>
              <div class="right-drawer-close-btn" title="Close">
                <div class="right-drawer-close-btn-inner" />
              </div>
              <span class="right-drawer-label-text"><strong>{modalFor}</strong></span>
            </div>
          )}
        {children}
      </div>
    </div>
  );
};

export const ModalBody = ({ children, modalFullHeight, modalPadding }) => {
  return (
    <section style="overflow: auto;" class={'modal-body ' + (modalFullHeight === 'fullHeight' ? ('modal-full-height') : '') + (modalPadding === 'noPadding' ? (' no-padding') : '')}>
      { children}
    </section>
  );
};

export const ModalFooter = ({ children }) => {
  return (
    <footer class="modal-footer">
      { children}
    </footer>
  );
};
