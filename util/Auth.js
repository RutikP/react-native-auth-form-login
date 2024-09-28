import axios from "axios";
// To install axios this use 'npm install axios'
// In Auth Firebase Auth REST API we go to 'sign up with email and password' -- 'https://firebase.google.com/docs/reference/rest/auth#section-create-email-password'
// There we get endpoint as 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
// In this endpoint api we have to replace 'API_KEY' with our API KEY from
// Firebase > settings > project settings > general > Web API

const API_KEY = "AIzaSyB1QBjlGlPwpbUiQSPhH1-U1APFjRH4eTQ";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(
    url,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    },
    {
      headers: {
        "Content-Type": "application/json", // Optional, but good practice
      },
    }
  );

  // console.log(response.data);
  const token = response.data.idToken;
  //   console.log(token);

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
