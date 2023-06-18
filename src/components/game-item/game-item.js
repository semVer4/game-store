import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GameGenre } from "../game-genre";
import { GameCategor } from "../game-categor";
import { GameBuy } from "../game-buy";
import { GameCover } from "../game-cover/game-cover";
import { setCurrentGame } from "../../store/games/reducer";
import "./game-item.css";
import { auth } from "../../config/config";

export const GameItem = ({ game }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentGame(game));
    auth.onAuthStateChanged((user) => {
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
        <div className="menuCenter">
          <div className="game-item__genre">
            {game.genres.map((genre) => (
              <GameGenre genre={genre} key={genre} />
            ))}
          </div>
          <div className="game-item__genre">
            {game.categor.map((categor) => (
              <GameCategor categor={categor} key={categor} />
            ))}
          </div>
        </div>
        <div className="game-item__buy">
          <GameBuy game={game} />
        </div>
      </div>
    </div>
  );
};
