function createCard(cardData, template, deleteCard, modalOpenCard, likeFunction) {
    const copyTemplateElement = template.querySelector('.card').cloneNode(true);

    const cardImage = copyTemplateElement.querySelector('.card__image');
    const cardTitle = copyTemplateElement.querySelector('.card__title');
    const likeButton = copyTemplateElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const deleteButton = copyTemplateElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
        deleteCard(copyTemplateElement);
    });

    cardImage.addEventListener('click', () => {
        modalOpenCard(cardData)
    } )

    likeButton.addEventListener('click', likeFunction)
    return copyTemplateElement;
}

function removeCard(cardElement) {
    cardElement.remove(); 
};

function likeButtonFunction(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}

export {createCard, removeCard, likeButtonFunction}