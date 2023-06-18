import React, { useState, useSelector } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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

export const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState();
  const [video, setVideo] = useState('');
  const [genres, setGenres] = useState(['']);
  const [categor, setCategor] = useState(['']);
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
      categor: Array(categor),
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
      <input placeholder='categor' onChange={e => setCategor(e.target.value)} />
      <input placeholder='description' onChange={e => setDescription(e.target.value)} />

      <button onClick={addProduct}>Создать</button>
    </div>
  );
}