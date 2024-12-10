
import './styles/index.css';
import {initialCards} from './scripts/cards';
import {createCard, removeCard, likeButtonFunction} from './scripts/card';
import {openModal, closeModal} from './scripts/modal';
import {enableValidation, clearValidation} from './scripts/validation';
import {getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard, updateUserAvatar} from './scripts/api';

const template = document.querySelector('#card-template').content; 
const cardsContainer = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');



const avatarEditButton = document.querySelector('.profile__image_edit-button');
const avatarModal = document.querySelector('.popup_type_new-avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarFormInput = avatarForm.elements.link;

avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarForm, validationConfig);
    openModal(avatarModal);
})


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

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 

let myId = '';

function handleOpenImageModal (cardData) {
    cardModalImage.src  = cardData.link;
    cardModalImage.alt  = cardData.name;
    cardModalCaption.textContent = cardData.name;
    openModal (cardModal)
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    const button = profileEditForm.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    updateUserInfo(profileEditFormNameInput.value,profileEditFormDescriptionInput.value)
    .then(userData => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about; 
        closeModal (profileEditModal)  
    })
    .catch(err => console.log(err))
        .finally(() => {
            button.textContent = 'Сохранить'
        })

}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();

    addNewCard(newCardFormNameInput.value, newCardFormLinkInput.value)
    .then(newCardData => {
        const createdCard = createCard(
            newCardData, 
            template,
            handleOpenImageModal,
            likeButtonFunction,
            myId
        );
            cardsContainer.prepend(createdCard);
            newCardForm.reset();
            closeModal(profileAddModal)
    })
    .catch(err => {
        console.error('Ошибка добавления новой карточки:', err);
    });
};
  
function handleAvatarFormSubmit () {
    updateUserAvatar(avatarFormInput.value).then(userData => {
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(avatarModal);
        avatarForm.reset();
    })
    .catch(err => {
        console.error('Ошибка добавления новой карточки:', err);
    });
};


Promise.all([getUserInfo(), getInitialCards()]).then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    myId = userData._id;
    cards.forEach(function(card) {
        const createdCard = createCard(card, 
        template, handleOpenImageModal, likeButtonFunction, myId);
        cardsContainer.append(createdCard);
        
});

})
    .catch(err => {
    console.error('Ошибка загрузки данных пользователя или карточек:', err);
});

modals.forEach(modal => {
    modal.classList.add('popup_is-animated')
});

profileEditButton.addEventListener('click', () => {
    profileEditFormNameInput.value = profileTitle.textContent;
    profileEditFormDescriptionInput.value = profileDescription.textContent;
    clearValidation(profileEditForm, validationConfig);
    openModal(profileEditModal)
});

profileAddButton.addEventListener('click', () => {
    clearValidation(newCardForm, validationConfig);
    openModal(profileAddModal)
});

modalCloseButtons.forEach(button => {
    const modal = button.closest('.popup');
    button.addEventListener('click', () => {
    closeModal(modal);
 });
})

profileEditForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(validationConfig);