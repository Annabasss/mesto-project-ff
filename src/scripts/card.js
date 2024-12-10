import {deleteCard, likeCard} from './api';


function createCard(cardData, template, modalOpenCard, likeFunction, userId) {
    const copyTemplateElement = template.querySelector('.card').cloneNode(true);

    const cardImage = copyTemplateElement.querySelector('.card__image');
    const cardTitle = copyTemplateElement.querySelector('.card__title');
    const likeButton = copyTemplateElement.querySelector('.card__like-button');
    const likeCount = copyTemplateElement.querySelector('.card__like-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes ? cardData.likes.length : 0;


    const deleteButton = copyTemplateElement.querySelector('.card__delete-button');
    const isCardLiked = cardData.likes.find(el => el._id === userId);

    if (userId !== cardData.owner._id) {
        deleteButton.style.display = 'none'
    }
    else {
        deleteButton.addEventListener('click', () => {
            deleteCard(cardData._id)
            .then(() => {
                copyTemplateElement.remove();
            })
            .catch((err) => console.error('Ошибка удаления карточки:', err));
    });
}

    cardImage.addEventListener('click', () => {
        modalOpenCard(cardData)
    } )

    if(isCardLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', (evt) => {
        likeFunction(likeButton,  cardData._id, likeCount)
    })
    return copyTemplateElement;
}

function likeButtonFunction(button, id, countElement) {
    const isLiked = button.classList.contains('card__like-button_is-active');

    likeCard(id, isLiked).then(cardData => {
        button.classList.toggle('card__like-button_is-active')
        countElement.textContent = cardData.likes.length;
    })
    .catch((err) => {
        console.log(err);
    });

}

export {createCard, likeButtonFunction}