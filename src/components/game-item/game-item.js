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
