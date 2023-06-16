import React, { useState, useEffect, useRef } from 'react';
import { useSelector} from 'react-redux';
import { OrderItem } from '../../components/order-item';
import { calcTotalPrice, enumerate } from '../../components/utils';
import './order-page.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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

export const OrderPage = () => {
    const history = useHistory();
    //const items = useSelector((state) => state.cart.itemsInCart);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        setUser(user);
        if (user) {
          loadCart(user);
          loadBalance(user);
        }
      });
    }, []);
  
    const loadBalance = async (user) => {
      const snapshot = await db.collection('users').doc(user.uid).get();
      
      if (snapshot.exists) {
        setBalance(snapshot.data().balance);
      }
    };  

    const loadCart = async (user) => {
      const unsubscribe = db
      .collection('cart')
      .where('id', '==', user.uid)
      .onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => doc.data());
        setCart(items);
      });

      return () => {
        unsubscribe();
      };
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
          await userRef.set({
            balance: Number(newBalance),
          });
          console.log('Документ пользователя создан с балансом', newBalance);
        }
      } catch (error) {
        console.error('Ошибка при обновлении баланса пользователя:', error);
      }
    };
    
    const buyGame = async () => {
      const price = calcTotalPrice(cart);

      if (balance >= price) {
          const gameRef = db.collection("cart").where('id', '==', user.uid);
      
          if (user) {
            cart.map((cart) => {
              db
              .collection('pGames')
              .add({
                id: user.uid,
                title: cart.title,
                image: cart.image,
              });
            });
          }

          history.push('/profile');

          gameRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });   

          const newBalance = Number(balance) - Number(price);
          setBalance(newBalance);
              
          updateBalance(user.uid, Number(newBalance));
        } else {
          alert('Недостаточно денег на балансе!');
        }
    };

    return (
        <div className="order-page">
            <div className="order-page__right">
                <div className="order-page__total-price">
                  {cart.length > 0 ? 
                    <div>
                      <span>{ cart.length } { enumerate(cart.length, ['игра', 'игры', 'игр'])} = {calcTotalPrice(cart)} руб.</span>
                      <button className='btn btn--primary btn--medium' onClick={buyGame}>Приобрести</button>  
                    </div>
                    : <h1>В корзине нет игр!</h1>
                  }
                </div>
            </div>
            <div className="order-page__left">
                {cart.map(game => <OrderItem game={game} key={game.id} />)}
            </div>
        </div>
    )
}
