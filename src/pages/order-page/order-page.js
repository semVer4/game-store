import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { OrderItem } from '../../components/order-item';
import { calcTotalPrice, enumerate } from '../../components/utils';
import './order-page.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

export const OrderPage = () => {
    const history = useHistory();
    //const items = useSelector((state) => state.cart.itemsInCart);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [pGames, setpGames] = useState([]);
    
    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        setUser(user);
        if (user) {
          // Если пользователь авторизован, загрузите его корзину из базы данных
          loadCart(user.uid);
          loadpGames(user.uid);
        }
      });
    }, []);
  
    const loadCart = async (userId) => {
      const snapshot = await db.collection('carts').doc(userId).get();
      if (snapshot.exists) {
        setCart(snapshot.data().cart);
      } else {
        setCart([]);
      }
    };  

    const loadpGames = async (userId) => {
      const snapshot = await db.collection('pGames').doc(userId).get();
      if (snapshot.exists) {
        setpGames(snapshot.data().cart);
      } else {
        setpGames([]);
      }
    };  

    const [balance, setBalance] = useState(0);

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

    const isGameInCart = async (userId, gameId) => {
      // try {
      //   const querySnapshot = await firestore()
      //     .collection('')
      //     .where('userId', '==', userId)
      //     .where('gameId', '==', gameId)
      //     .get();
    
      //   return !querySnapshot.empty;
      // } catch (error) {
      //   console.error('Ошибка при проверке наличия игры в корзине:', error);
      //   return false;
      // }
    };
    
    const buyGame = async () => {
      const isAlreadyInCart = await isGameInCart(user.uid, cart.map(item => item.id));

      const price = calcTotalPrice(cart);
      const newCart = [...cart, product];

        if (balance >= price) {
          try {
            const userRef = db.collection('pGames').doc(user.uid);
            const userSnapshot = await userRef.get();
        
            if (userSnapshot.exists) {
              db.collection('pGames').doc(user.uid).set({ cart: newCart }, { merge: true });
              setCart(newCart);
            } 
          } catch (error) {
          }
          const newBalance = Number(balance) - Number(price);
          setBalance(newBalance);
              
          updateBalance(user.uid, Number(newBalance));
        } else {
          alert('Недостаточно денег на балансе!');
        }
    };

    if(cart.length < 1) {
        return <h1>Ваша корзина пуста!</h1>
    }

    return (
        <div className="order-page">
            <div className="order-page__left">
                { cart.map(game => <OrderItem game={game} key={game.id} />) }
            </div>
            <div className="order-page__right">
                <div className="order-page__total-price">
                    <span>{ cart.length } { enumerate(cart.length, ['товар', 'товара', 'товаров'])} на сумму {calcTotalPrice(cart)} руб.</span>
                    <button className='btn btn--primary btn--medium' onClick={buyGame}>Приобрести</button>
                </div>
            </div>
        </div>
    )
}
