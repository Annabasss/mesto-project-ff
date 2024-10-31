
const template = document.querySelector('#card-template').content; 
const cardsContainer = document.querySelector('.places__list');

function addCard(name, link) {
    const copyTemplateElement = template.querySelector('.card').cloneNode(true);

    copyTemplateElement.querySelector('.card__image').src = link;
    copyTemplateElement.querySelector('.card__title').textContent = name;
    
    const deleteButton = copyTemplateElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
        copyTemplateElement.remove(); 
        /*const card = deleteButton.closest('.card');
        card.remove();*/
    });

    cardsContainer.append(copyTemplateElement); 
}

initialCards.forEach(function(element) {
    addCard(element.name, element.link);

});
