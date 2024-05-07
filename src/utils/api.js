const baseUrl = "http://localhost:3001";

export const checkToken = (callback) => {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    return callback(jwt);
  } else {
    return Promise.reject("Error: jwt token is null");
  }
};

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
}

export function addItem(item) {
  return checkToken((jwt) => {
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(item),
    }).then(processServerResponse);
  });
}

export function removeItem(_id) {
  return checkToken((jwt) => {
    return fetch(`${baseUrl}/items/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then(processServerResponse);
  });
}

export function likeClothingItem(_id) {
  return checkToken((jwt) => {
    return fetch(`${baseUrl}/items/${_id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then(processServerResponse);
  });
}

export function dislikeClothingItem(_id) {
  return checkToken((jwt) => {
    return fetch(`${baseUrl}/items/${_id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then(processServerResponse);
  });
}

export function request(url, options) {
  return fetch(url, options).then(processServerResponse);
}
