
const template = document.querySelector('#card-template').content; 
const cardsContainer = document.querySelector('.places__list');

function createCard(name, link) {
    const copyTemplateElement = template.querySelector('.card').cloneNode(true);

    copyTemplateElement.querySelector('.card__image').src = link;
    copyTemplateElement.querySelector('.card__image').alt = name;
    copyTemplateElement.querySelector('.card__title').textContent = name;

    const deleteButton = copyTemplateElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
        copyTemplateElement.remove(); 

    });

    return copyTemplateElement;
}

initialCards.forEach(function(element) {
    const createdCard = createCard(element.name, element.link);
    cardsContainer.append(createdCard);
});
