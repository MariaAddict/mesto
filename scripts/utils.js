const closeByOverlay = (evt) => {
    if (evt.target.classList.contains('modal_opened')) {
      closeModal(evt.target);
    }
}
  
  function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', closeModalEsc);
    document.addEventListener('click', closeByOverlay);
  }
  
  function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', closeModalEsc);
    document.removeEventListener('click', closeByOverlay);
  }
  
  function closeModalEsc(evt) {
    const modals = Array.from(document.querySelectorAll('.modal'));
    if (evt.key === 'Escape') {
      modals.forEach((modal) => {
        if (modal.classList.contains('modal_opened')) {
          closeModal(modal);
        }
      });
    }
  }

  export {closeByOverlay, openModal, closeModal, closeModalEsc};