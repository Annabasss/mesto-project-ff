
import './styles/index.css';
import {initialCards} from './scripts/cards';
import {createCard, removeCard, likeButtonFunction} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';


const template = document.querySelector('#card-template').content; 
const cardsContainer = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const modals = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditModal = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditFormNameInput = profileEditForm.elements.name;
const profileEditFormDescriptionInput = profileEditForm.elements.description;

const profileAddButton = document.querySelector('.profile__add-button');
const profileAddModal = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];
const newCardFormNameInput = newCardForm.elements['place-name'];
const newCardFormLinkInput = newCardForm.elements.link;

const modalCloseButtons = document.querySelectorAll('.popup__close');

const cardModal = document.querySelector('.popup_type_image');
const cardModalImage = document.querySelector('.popup__image');
const cardModalCaption = document.querySelector('.popup__caption');




function handleOpenImageModal (cardData) {
    cardModalImage.src  = cardData.link;
    cardModalImage.alt  = cardData.name;
    cardModalCaption.textContent = cardData.name;
    openModal (cardModal)
}

function profileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = profileEditFormNameInput.value;
    profileDescription.textContent = profileEditFormDescriptionInput.value;
    closeModal (profileEditModal)
}

function newCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: newCardFormNameInput.value,
        link: newCardFormLinkInput.value
    }
    const createdCard = createCard(
        newCard, 
        template,
        removeCard,
        handleOpenImageModal,
        likeButtonFunction
    );
        cardsContainer.prepend(createdCard);
        newCardForm.reset();
        closeModal(profileAddModal)
}

initialCards.forEach(function(element) {
    const createdCard = createCard({name: element.name, link: element.link}, 
    template, removeCard, handleOpenImageModal, likeButtonFunction);
    cardsContainer.append(createdCard);
});


modals.forEach(modal => {
    modal.classList.add('popup_is-animated')
});

profileEditButton.addEventListener('click', () => {
    profileEditFormNameInput.value = profileTitle.textContent;
    profileEditFormDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal)
});

profileAddButton.addEventListener('click', () => {
    openModal(profileAddModal)
});

modalCloseButtons.forEach(button => {
    const modal = button.closest('.popup');
    button.addEventListener('click', () => {
    closeModal(modal);
 });
})

profileEditForm.addEventListener('submit', profileFormSubmit);
newCardForm.addEventListener('submit', newCardFormSubmit)