import React, { useState, useSelector } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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

export const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState();
  const [video, setVideo] = useState('');
  const [genres, setGenres] = useState(['']);
  const [description, setDescription] = useState('');

  const addProduct = () => {
    const id = uuidv4();

    const productDoc = doc(collection(db, "products"), id);

    setDoc(productDoc, {
      id: id,
      title: title,
      image: image,
      price: Number(price),
      video: video,
      genres: Array(genres),
      description: description
    });
  };

  return (
    <div>
      <input placeholder='name' onChange={e => setTitle(e.target.value)} />
      <input placeholder='image' onChange={e => setImage(e.target.value)} />
      <input placeholder='price' onChange={e => setPrice(e.target.value)} />
      <input placeholder='video' onChange={e => setVideo(e.target.value)} />
      <input placeholder='genre' onChange={e => setGenres(e.target.value)} />
      <input placeholder='description' onChange={e => setDescription(e.target.value)} />

      <button onClick={addProduct}>Создать</button>
    </div>
  );
}