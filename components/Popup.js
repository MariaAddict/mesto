export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('modal_opened');
    }

    close() {
        this._popup.classList.remove('modal_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
              if (this._popup.classList.contains('modal_opened')) {
                this.close();
              }
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', () => {this._handleEscClose(evt)});
        document.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('modal_opened')) {
                       this.close();
                     }
        });
    }
}

// const closeByOverlay = (evt) => {
//     if (evt.target.classList.contains('modal_opened')) {
//       closeModal(evt.target);
//     }
//   }
  
//   function openModal(modal) {
//     modal.classList.add('modal_opened');
//     document.addEventListener('keydown', closeModalEsc);
//     document.addEventListener('click', closeByOverlay);
//   }
  
//   function closeModal(modal) {
//     modal.classList.remove('modal_opened');
//     document.removeEventListener('keydown', closeModalEsc);
//     document.removeEventListener('click', closeByOverlay);
//   }
  
//   function closeModalEsc(evt) {
//     const modals = Array.from(document.querySelectorAll('.modal'));
//     if (evt.key === 'Escape') {
//       modals.forEach((modal) => {
//         if (modal.classList.contains('modal_opened')) {
//           closeModal(modal);
//         }
//       });
//     }
//   }