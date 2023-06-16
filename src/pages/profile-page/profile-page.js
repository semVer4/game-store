import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './profile-page.css';
import { GameItem } from '../../components/game-item';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBPKNt_f3VogrYTIZdZh6gGSoukXJW0do",
  authDomain: "game-store-fa9d2.firebaseapp.com",
  databaseURL: "https://game-store-fa9d2-default-rtdb.firebaseio.com",
  projectId: "game-store-fa9d2",
  storageBucket: "game-store-fa9d2.appspot.com",
  messagingSenderId: "90832189644",
  appId: "1:90832189644:web:455d9c512535d56f8d6a69",
  measurementId: "G-PXDYFJ2XFD"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        loadCart(user);
        loadBalance(user);
      }
    });
  }, []);

  const loadCart = async (user) => {
    const unsubscribe = db
    .collection('pGames')
    .where('id', '==', user.uid)
    .onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setCart(items);
    });

    return () => {
      unsubscribe();
    };
  };  

  const [balance, setBalance] = useState(0);
  const [inputBalance, setInputBalance] = useState(0);

  const loadBalance = async (user) => {
    const snapshot = await db.collection('users').doc(user.uid).get();
      
    if (snapshot.exists) {
      setBalance(snapshot.data().balance);
    }
  };  

  const updateBalance = async (userId, newBalance) => {
    try {
      const userRef = db.collection('users').doc(userId);
      const userSnapshot = await userRef.get();
  
      if (userSnapshot.exists) {
        await userRef.update({
          balance: newBalance,
        });
        console.log('Баланс пользователя успешно обновлен');
      } else {
        // Если документ не существует, создаем его
        await userRef.set({
          balance: Number(newBalance),
        });
        console.log('Документ пользователя создан с балансом', newBalance);
      }
    } catch (error) {
      console.error('Ошибка при обновлении баланса пользователя:', error);
    }
  };

  const addMoney = () => {
    const newBalance = Number(balance) + Number(inputBalance);
    updateBalance(user.uid, newBalance);
    setBalance(newBalance);
  };

  return (
    <div className='profile-page'>
      {user ? (
        <div>
          <p>Ваш баланс: {Number(balance)}р.</p>
          <div className='form1'>
            <button className='btn btn--primary btn--small' onClick={addMoney} style={{height: 40, marginTop: 15, borderRadius: 0}}>Пополнить баланс</button>
            <input className='form-style' placeholder='Введите желаемую сумму' onChange={(e) => setInputBalance(e.target.value)} style={{height: 40, padding: 10, marginLeft: 10}} />
          </div>
            <h1>Ваши игры:</h1>
              {cart.length > 0 ? 
                (
                  cart.map((game) => {
                    return (
                      <div className='gameItem'>
                        <img src={game.image} width={200} height={100} />
                        <a href='#'>Установить</a>
                        <p>{game.title}</p>
                      </div>
                    )
                  })
                ) : (
                  <h1>Приобретённых игр нет</h1>
                )
            }
        </div>
      ) : (
        <h1>Авторизуйтесь для просмотра профиля!</h1>
      )}
    </div>
  );
}