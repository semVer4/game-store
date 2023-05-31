import React, { useState, useEffect } from 'react';
import { GameItem } from '../../components/game-item';
import './home-page.css';
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

/*const GAMES = [
    {
        image: '/game-covers/forza_5.jpeg',
        title: 'Forza Horizon 5',
        genres: ['Гонки', 'Симулятор', 'Открытый мир'],
        price: 2343,
        video: 'https://www.youtube.com/embed/FYH9n37B7Yw',
        id: 1,
        description: "Вас ждёт бесконечный калейдоскоп приключений Horizon! Совершайте увлекательные поездки по невероятно красивому и самобытному миру Мексики за рулём величайших автомобилей в истории. Начните своё приключение Horizon уже сегодня, добавив игру в свой список желаний!",
    },
    {
        image: '/game-covers/battlefield_2042.jpg',
        title: 'Battlefield 2042',
        genres: ['Экшен', 'Шутер', 'Война'],
        video: 'https://www.youtube.com/embed/ASzOzrB-a9E',
        price: 2433,
        id: 2,
        description: 'Battlefield™ 2042 — это шутер от первого лица, в котором серия возвращается к легендарным масштабным сражениям. В будущем, где царит хаос, адаптируйтесь и процветайте на постоянно меняющихся полях боя благодаря своему отряду и арсеналу новейших технологий.'
    },
    {
        image: '/game-covers/life_is_strange_true_colors.jpeg',
        title: 'Life is Strange True Colors',
        genres: ['Глубокий сюжет', 'Протагонистка'],
        video: 'https://www.youtube.com/embed/b6CkzwVAr0M',
        price: 3021,
        id: 3,
        description: 'Алекс Чэнь от всех скрывает своё «проклятие» — сверхъестественную способность считывать сильные эмоции других и влиять на них. Но когда её брат погибает — якобы в результате несчастного случая, — Алекс использует её, чтобы узнать правду.'
    },
    {
        image: '/game-covers/gta_v.jpeg',
        title: 'Grand Theft Auto V',
        genres: ['Открытый мир', 'Экшен'],
        video: 'https://www.youtube.com/embed/QkkoHAzjnUs',
        price: 789,
        id: 4,
        description: 'Grand Theft Auto V для PC позволяет игрокам исследовать знаменитый мир Лос-Сантоса и округа Блэйн в разрешении до 4k и выше с частотой 60 кадров в секунду.'
    },
    {
        image: '/game-covers/rainbow_siege.jpeg',
        title: 'Tom Clancy\'s Rainbow Six® Siege',
        video: 'https://www.youtube.com/embed/6wlvYh0h63k',
        genres: ['Тактика', 'Шутер'],
        price: 982,
        id: 5,
        description: 'Tom Clancy\'s Rainbow Six Осада – это продолжение нашумевшего шутера от первого лица, разработанного студией Ubisoft Montreal.'
    },
    {
        image: '/game-covers/assassins_creed_valhalla.png',
        title: 'Assassin’s Creed Valhalla',
        genres: ['Паркур', 'РПГ', 'Открытый мир'],
        video: 'https://www.youtube.com/embed/ssrNcwxALS4',
        price: 2863,
        id: 6,
        description: 'Assassin’s Creed Valhalla — мультиплатформенная компьютерная игра в жанре action/RPG, разработанная студией Ubisoft Montreal под издательством компании Ubisoft. Является двенадцатой игрой в серии игр Assassin’s Creed.'
    },
]*/

export const HomePage = () => {  
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');

    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');

    const prices = ['0-50', '50-100', '100-150', '150-200', '200-250', '250-300'];
    const genres = ['Abc', 'Test'];
    const [game, setGame] = useState([]);

    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };

    function handleGenreChange(event) {
      setGenre(event.target.value);
    }

    function handlePriceChange(event) {
      setPrice(event.target.value);
    }

    const filteredProducts = game.filter((product) => {
      return product.title.includes(searchQuery);
    });

    useEffect(() => {
      const unsubscribe = firebase.firestore().collection('products')
        .onSnapshot((querySnapshot) => {
          const products = [];
          querySnapshot.forEach((doc) => {
            setLoading(false);
            products.push(doc.data());
          });
          setGame(products.filter((item) => (price ? item.price >= Number(price.split('-')[0]) && 
            item.price <= Number(price.split('-')[1]) : true) && (genre ? item.genres[0] === genre : true)));
        });
      return unsubscribe;
    }, [genre, price]);
    
    useEffect(() => {
      const unsubscribe = firebase.firestore().collection('products')
      .onSnapshot((querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
          setLoading(false);
          products.push(doc.data());
        });
        setGame(products.filter((item) => (price ? item.price >= Number(price.split('-')[0]) && 
          item.price <= Number(price.split('-')[1]) : true) && (genre ? item.genres[0] === genre : true)));
      });
    return unsubscribe;
    });

    return [
        <div>
          <div className="flex-center">
            <div class="search-box">
              <button class="btn-search"><i class="gg-search"></i></button>
              <input type="text" class="input-search" placeholder="Поиск по названию..." onChange={handleSearchInputChange} />
            </div>
            <div className="select">
              <select value={genre} onChange={handleGenreChange}>
                <option value="">Фильтрация по жанру</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                </option>
              ))}
              </select>
            </div>
            <div className='select'>
              <select value={price} onChange={handlePriceChange}>
                  <option value="">Фильтрация по ценам</option>
                    {prices.map((price) => (
                    <option key={price} value={price}>
                  {price}
                  </option>
              ))}
                </select>
            </div>
          </div>
      </div>,
      <div>
        {loading ? (
          <main>
          <svg class="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#452C66" />
                <stop offset="33%" stop-color="#2285F6" />
                <stop offset="67%" stop-color="#481A9F" />
                <stop offset="100%" stop-color="#481A9F" />
              </linearGradient>
              <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stop-color="#481A9F" />
                <stop offset="33%" stop-color="#2285F6" />
                <stop offset="67%" stop-color="#8100B7" />
                <stop offset="100%" stop-color="#452C66" />
              </linearGradient>
            </defs>
            <g fill="none" stroke-linecap="round" stroke-width="16">
              <g class="ip__track" stroke="#ddd">
                <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
              </g>
              <g stroke-dasharray="180 656">
                <path class="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                <path class="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
              </g>
            </g>
          </svg>
        </main>
        ) : (
          <div className="home-page">
            {filteredProducts.map((game) => (
              <GameItem game={game} key={game.id} />
            ))}
          </div>
        )}
      </div>
    ];
}
