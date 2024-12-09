const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
    headers: {
        authorization: '71eac110-92fb-4363-a37d-1dddeea0562e',
        'Content-Type': 'application/json'
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}



export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
      })
      .then(checkResponse);
  } 


  export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',  
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
    })
    })
        .then(checkResponse);
  } 

  export const updateUserAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',  
      headers: config.headers,
      body: JSON.stringify({
        avatar: link
    })
    })
        .then(checkResponse);
  } 



  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(checkResponse);
  } 


  export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',  
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
    })
  })
        .then(checkResponse);
  } 

  export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',  
      headers: config.headers,
  })
  .then(checkResponse);
  } 


  export const likeCard = (id, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: isLiked? 'DELETE': 'PUT',  
      headers: config.headers,
  })
  .then(checkResponse);
  } 
