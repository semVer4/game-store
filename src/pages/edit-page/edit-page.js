import React, { useState, useEffect } from "react";
import { useSelector} from 'react-redux';
import { auth, db } from "../../config/config";
import "./edit-page.css";

export const EditPage = () => {
  const game = useSelector(state => state.games.currentGame);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [video, setVideo] = useState('');
  const [genre, setGenre] = useState([]);
  const [categor, setCategor] = useState([]);
  const [description, setDescription] = useState('');

  if(!game) return null

  const productRef = db.collection('products').doc(game.id);

  const deleteGame = () => {
    productRef.delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  };

  const editTitle = () => {
    productRef.update({
      title: title,
    })
    .then(() => {
      console.log('Product successfully updated');
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });    
  };

  const editImage = () => {
    productRef.update({
      image: image,
    })
    .then(() => {
      console.log('Product successfully updated');
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });    
  };

  const editVideo = () => {
    productRef.update({
      video: video,
    })
    .then(() => {
      console.log('Product successfully updated');
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });    
  };

  const editDescription = () => {
    productRef.update({
      description: description,
    })
    .then(() => {
      console.log('Product successfully updated');
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });    
  };

  const editGenre = () => {
    productRef.update({
      genre: Array(genre),
    })
    .then(() => {
      console.log('Product successfully updated');
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });    
  };

  const editPrice = () => {
    productRef.update({
      price: Number(price),
    })
    .then(() => {
      console.log('Product successfully updated');
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });    
  };

  return (
    <div className="edit-page">
  
      <div className="container__item">
      <button id="delete" className="btnz btns btn--inside uppercase" onClick={deleteGame}>Удалить игру</button>
        <div className="form">
          <h1>Изменить название игры</h1>
          <input className="form__field" placeholder={game.title} value={title} onChange={(e) => setTitle(e.target.value)} />
          <button className="btnz btns btn--inside uppercase" onClick={editTitle}>Изменить</button>

          <h1>Изменить ссылку на видео</h1>
          <input className="form__field" placeholder={game.video} value={video} onChange={(e) => setVideo(e.target.value)} />
          <button className="btnz btns btn--inside uppercase" onClick={editVideo}>Изменить</button>

          <h1>Изменить ссылку на изображение</h1>
          <input className="form__field" placeholder={game.image} value={image} onChange={(e) => setImage(e.target.value)} />
          <button className="btnz btns btn--inside uppercase" onClick={editImage}>Изменить</button>

          {game.genres.map((item) => {
            return (
              <>
                <h1>Изменить жанр</h1>
                <input className="form__field" placeholder={item} onChange={(e) => setGenre(e.target.value)} />
                <button className="btnz btns btn--inside uppercase" onClick={editGenre}>Изменить</button>
              </>
            )
          })}

          <h1>Изменить описание</h1>
          <input className="form__field" placeholder={game.description} value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className="btnz btns btn--inside uppercase" onClick={editDescription}>Изменить</button>

          <h1>Изменить цену</h1>
          <input className="form__field" placeholder={game.price} value={price} onChange={(e) => setPrice(e.target.value)} />
          <button className="btnz btns btn--inside uppercase" onClick={editPrice}>Изменить</button>
        </div>
      </div>
    </div>
  );
};
