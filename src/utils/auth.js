import { processServerResponse, checkToken } from "./api";

const baseUrl = "http://localhost:3001";
const baseHeaders = { "Content-Type": "application/json" };

export function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
}

// name: string
// avatar: string
// token: string
export function update({ name, avatar }) {
  return checkToken((jwt) => {
    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name, avatar }),
    }).then(processServerResponse);
  });
}

export function signUp({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(processServerResponse);
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}
