import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "./auth-page.css";
import { BiMailSend } from "react-icons/bi";
import { BiLockAlt } from "react-icons/bi";
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
        alert('Неверный пароль/email');
        console.error(error);
      }
    };

    const checkUserExists = (email) => {
      return firebase.auth()
        .fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
          return signInMethods.length > 0;
        })
        .catch((error) => {
          console.error('Ошибка проверки существования пользователя:', error);
          return false;
        });
    };
  
    const [userExists, setUserExists] = useState(false);
    const handleRegister = async () => {
      try {
        checkUserExists(email).then((exists) => {
          setUserExists(exists);
        });

        if (userExists) {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
        } else {
          alert('Пользователь с данным email уже существует!');
        }
    
        console.log('Пользователь успешно зарегистрирован');
      } catch (error) {
        console.error('Ошибка регистрации пользователя:', error.message);
      }
    }

    const resetPassword = () => {
      const email = prompt();

      firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('Письмо для восстановления пароля отправлено');
          console.log('Письмо для восстановления пароля отправлено');
        })
        .catch((error) => {
          console.error('Ошибка отправки письма для восстановления пароля:', error);
        });
    };

    const handleLogout = () => {
      firebase.auth().signOut();
    };

    return (
      <div>
        {user ? (
          <div className='logout'>
            <h2>Добро пожаловать, {user.email}!</h2>
            <a href="#" className="btnLogout" onClick={handleLogout}>выйти</a>
          </div>
        ) : (
          <div>
            <div className="section">
              <div className="container">
                <div className="row full-height justify-content-center">
                  <div className="col-12 text-center align-self-center py-5">
                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                        <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/> 
                        <label for="reg-log" />
                      <div className="card-3d-wrap mx-auto">
                        <div className="card-3d-wrapper">
                          <div className="card-front">
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4 className="mb-4 pb-3" style={{ marginLeft: '110px' }}>Авторизация</h4>
                                <div className="form-group">
                                  <input name="logemail" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off" onChange={(e) => setEmail(e.target.value)} />
                                  <i class="input-icon uil uil-lock-alt">
                                    <BiMailSend />
                                  </i>
                                </div>	
                                <div className="form-group mt-2">
                                  <input name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off" onChange={(e) => setPassword(e.target.value)} />
                                  <i className="input-icon uil uil-lock-alt">
                                    <BiLockAlt />
                                  </i>
                                </div>
                                <a href="#" className="btn mt-4" onClick={handleLogin}>войти</a>
                                    <p className="mb-0 mt-4 text-center"><a href="#0" className="link" onClick={resetPassword}>Восстановить пароль?</a></p>
                                  </div>
                                </div>
                              </div>
                          <div className="card-back">
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4 className="mb-4 pb-3" style={{ marginLeft: '110px' }}>Регистрация</h4>
                                <div className="form-group mt-2">
                                  <input name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off" onChange={(e) => setEmail(e.target.value)} />
                                  <i class="input-icon uil uil-at">
                                    <BiMailSend />
                                  </i>
                                </div>	
                                <div className="form-group mt-2">
                                  <input name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off" onChange={(e) => setPassword(e.target.value)} />
                                  <i class="input-icon uil uil-lock-alt">
                                    <BiLockAlt />
                                  </i>
                                </div>
                                <a href="#" className="btn mt-4" onClick={handleRegister}>войти</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    );
}