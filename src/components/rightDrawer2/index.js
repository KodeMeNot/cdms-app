import { h } from 'preact';

export const Modal2 = ({ onClose, title, children, isThisPreviewModal, modalSize, modalHeight, modalDisplay, isHeaderImage, imageURL, modalFor, isProfileModal, closeID, modalCustomWidth }) => {
  return (
    <div className={'modal ' + modalDisplay + (isThisPreviewModal ? ' previewModalStyling' : '') + (modalSize === 'minimized' ? ' zIndex0' : '')}>
      <div id={title} className={'modal-content ' + modalSize + (modalHeight ? (' ' + modalHeight) : '') +  (modalCustomWidth ? " " + modalCustomWidth : '')}>

        { children }
      </div>
    </div>
  );
};

export const ModalBody2 = ({ children, modalFullHeight, modalPadding, onClose}) => {
  return (
    <section style="overflow: auto;" class={'modal-body ' + (modalFullHeight === 'fullHeight' ? ('modal-full-height') : '') + (modalPadding === 'noPadding' ? (' no-padding') : '')}>
      <div class="right-drawer-label" style="top: 17px;" onClick={onClose}>
        <div class="right-drawer-close-btn" title="Close">
          <div class="right-drawer-close-btn-inner" />
        </div>
      </div>
      { children }
    </section>
  );
};

export const ModalFooter2 = ({ children }) => {
  return (
    <footer class="modal-footer">
      { children }
    </footer>
  );
};
