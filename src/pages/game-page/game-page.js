import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import { GameBuy } from "../../components/game-buy";
import { GameCover } from "../../components/game-cover/game-cover";
import { GameGenre } from "../../components/game-genre";
import "./game-page.css";
import ReactSwipe from 'react-swipe';
import '../home-page/home-page.css';
import { GameItem } from '../../components/game-item';
import { auth, db } from "../../config/config";
import { GameCategor } from "../../components/game-categor";

export const GamePage = () => {
  const game = useSelector(state => state.games.currentGame);

  const [user, setUser] = useState(null);

  const [allGame, setAllGame] = useState([]);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection('products')
    .onSnapshot((querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });
      setAllGame(products);
    });
  return unsubscribe;
  });

  const loadComments = async () => {
    const unsubscribe = db
        .collection('comments')
        .where('productId', '==', productId)
        .onSnapshot((snapshot) => {
          const items = snapshot.docs.map((doc) => doc.data());
          setComments(items);
        });

      return () => {
        unsubscribe();
    };
  };

  var productId = null;
  if (game) {
    productId = game.id;
  }

  useEffect(() => {
    const fetchComments = async () => {
      const snapshot = await db
        .collection('comments')
        .where('productId', '==', productId)
        .get();

      const commentsData = snapshot.docs.map((doc) => doc.data());
      setComments(commentsData);
    };

    fetchComments();
  }, [productId]);

  if(!game) return null;

  const handleAddComment = async () => {
    await db.collection('comments').add({
      productId,
      id: user.uid,
      email: user.email,
      comment: newComment,
    });

    setNewComment('');
    loadComments();
  };

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

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
          <button onClick={() => reactSwipeEl.next()} className="btn btn--primary btn--small" style={{width: 100, marginTop: 20}}>Далее</button>
          <button onClick={() => reactSwipeEl.prev()} className="btn btn--primary btn--small" style={{width: 100, marginLeft: '45%'}}>Назад</button>
        </div>
        <div className="game-page__right">
          <h1 className="game-page__title">{ game.title }</h1>
          <p className="secondary-text">{game.description}</p>
          {game.genres.map((genre) => (
            <GameGenre genre={genre} key={genre} />
          ))}
          {game.categor.map((categor) => (
            <GameCategor categor={categor} key={categor} />
          ))}
          <div className="game-page__buy-game">
            <GameBuy game={game} />
          </div>
        </div>
      </div>
      <div className="similar">
          <h1>Похожие игры:</h1>
            <div className="home-page">
              {
                allGame.map((games) => {
                  const gGames = games.genres;
                  const gGame = game.genres;

                  if (gGames[0] == gGame[0]) {
                    return <GameItem game={games} key={games.id} />
                  }
                })
              }
            </div>
          </div>
      <div className="comments">
          <h2>Комментарии</h2>
            {comments.length > 0 ? 
              comments.map((comment, index) => (
                <div key={index}>
                  <p className="styleEmail">Автор: {comment.email}</p>
                  <p>Комментарий: {comment.comment}</p>
                </div>
              ))
              : <p className="secondary-text">Комментариев нет!</p>
            }

            {user && (
              <div>
                <input 
                  className="form-style"
                  style={{width: 400, padding: 15}}
                  value={newComment}
                  onChange={handleInputChange}
                  placeholder="Введите комментарий..."
                />
                <button onClick={handleAddComment} className="btn btn--primary btn--small" style={{marginTop: 10, marginLeft: 30}}>Добавить комментарий</button>
              </div>
            )}
          </div>
    </div>
  );
};
