function openModal(modal){
    modal.classList.add('popup_is-opened');
    modal.addEventListener('mousedown', closeByOverlay)
    document.addEventListener('keydown', closeByEscape)
}

function closeModal(modal){
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('mousedown', closeByOverlay)
    document.removeEventListener('keydown', closeByEscape)
}

function closeByOverlay (evt) {
    if(evt.target === evt.currentTarget) {
        closeModal(evt.target)
    }
}

function closeByEscape (evt) {
    if(evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}


export {openModal, closeModal}
