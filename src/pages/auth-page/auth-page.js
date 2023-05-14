import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useHistory } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDM0QhgW7r0EFvTJsx8SQo7Ot4BSsTIbO0",
  authDomain: "game-store-one.firebaseapp.com",
  projectId: "game-store-one",
  storageBucket: "game-store-one.appspot.com",
  messagingSenderId: "777893446023",
  appId: "1:777893446023:web:4b00b8586c28f06cd69322",
  measurementId: "G-MYLWLR99PX"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const AuthPage = () => {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        setUser(user);
      });
    }, []);  

    const handleLogin = async (event) => {
      event.preventDefault();

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleLogout = () => {
      firebase.auth().signOut();
    };

    return (
      <div>
        {user ? (
          <div>
            <h2>Добро пожаловать, {user.email}!</h2>
            <button onClick={handleLogout}>Выйти</button>
          </div>
        ) : (
          <div>
            <h2>Войдите или зарегистрируйтесь, чтобы продолжить</h2>
            <form>
              <input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} />
              <input type="password" placeholder="Пароль" onChange={event => setPassword(event.target.value)} />
              <button onClick={handleLogin}>Войти</button>
            </form>
          </div>
        )}
      </div>
    );
}