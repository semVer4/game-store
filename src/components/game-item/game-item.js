import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GameGenre } from "../game-genre";
import { GameBuy } from "../game-buy";
import { GameCover } from "../game-cover/game-cover";
import { setCurrentGame } from "../../store/games/reducer";
import "./game-item.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

export const GameItem = ({ game }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentGame(game));
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const email = user.email;
        
        if (email == 'admin@gmail.com') {
          history.push(`/admin/${game.title}`);
        } else {
          history.push(`/app/${game.title}`);
        }
      } else {
        history.push(`/app/${game.title}`);
      }
    });    
  };

  return (
    <div className="game-item" onClick={handleClick}>
      <GameCover image={game.image} />
      <div className="game-item__details">
        <span className="game-item__title">{game.title}</span>
        <div className="game-item__genre">
          {game.genres.map((genre) => (
            <GameGenre genre={genre} key={genre} />
          ))}
        </div>
        <div className="game-item__buy">
          <GameBuy game={game} />
        </div>
      </div>
    </div>
  );
};
