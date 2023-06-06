import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import { GameBuy } from "../../components/game-buy";
import { GameCover } from "../../components/game-cover/game-cover";
import { GameGenre } from "../../components/game-genre";
import "./game-page.css";
import ReactSwipe from 'react-swipe';
import '../home-page/home-page.css';
import { GameItem } from '../../components/game-item';

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

export const GamePage = () => {
  const [allGame, setAllGame] = useState([]);

  const game = useSelector(state => state.games.currentGame);

  const [genre_, setGenre] = useState(game.genres.map((genre) => genre));

  useEffect(() => {
    const unsubscribe = db.collection('products')
      .onSnapshot((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
        });
        setAllGame(products.filter((item) => (genre_ ? item.genres[0] === genre_ : true)));
      });
    return unsubscribe;
  }, [genre_]);

  if(!game) return null

  let reactSwipeEl;

  return (
    <div className="game-page">
      <div className="game-page__content">
        <div className="game-page__left">
          <ReactSwipe
            className="carousel"
            swipeOptions={{ continuous: false }}
            ref={el => (reactSwipeEl = el)}
          >
            <div>
              <img src={game.image} width="100%" height="400px" />
            </div>
            <div>
              <iframe
                  width="100%"
                  height="400px"
                  src={game.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
          </ReactSwipe>
          <button onClick={() => reactSwipeEl.next()}>Next</button>
          <button onClick={() => reactSwipeEl.prev()}>Previous</button>
        </div>
        <div className="game-page__right">
          <h1 className="game-page__title">{ game.title }</h1>
          <p className="secondary-text">{game.description}</p>
          {game.genres.map((genre) => (
            <GameGenre genre={genre} key={genre} />
          ))}
          <div className="game-page__buy-game">
            <GameBuy game={game} />
          </div>
          <div className="comments">
            <p>Комментарии:</p>
          </div>
        </div>
      </div>
      <div className="similar">
        <h1 className="game-page__title">Похожие игры:</h1>
        <div className="home-page">
            <GameItem game={game} key={game.id} />
        </div>
      </div>
    </div>
  );
};
