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

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        loadCart(user.uid);
      }
    });
  }, []);

  const loadCart = async (userId) => {
    const snapshot = await db.collection('pGames').doc(userId).get();
    if (snapshot.exists) {
      setCart(snapshot.data().cart);
    } else {
      setCart([]);
    }
  };  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [balance, setBalance] = useState(0);
  const [inputBalance, setInputBalance] = useState(0);

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

  useEffect(() => {
    // Получаем текущего пользователя Firebase
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Загружаем баланс пользователя из Firestore
        db
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              setBalance(userData.balance);
            }
          })
          .catch((error) => {
            console.error('Ошибка при загрузке баланса пользователя:', error);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
            <button className='test' onClick={addMoney}>Пополнить баланс</button>
            <input onChange={(e) => setInputBalance(e.target.value)} />
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