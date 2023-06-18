import React, { useState, useEffect } from 'react';
import { GameItem } from '../../components/game-item';
import './home-page.css';
import { db } from "../../config/config";

export const HomePage = () => {  
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');

    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');
    const [categor, setCategor] = useState('');

    const prices = ['0-50', '50-100', '100-150', '150-200', '200-250', '250-300'];

    const [genres, setGenres] = useState([]);
    const categors = ['Обучающие', 'Исторические', 'Детские'];
    const [game, setGame] = useState([]);

    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };

    function handleGenreChange(event) {
      setGenre(event.target.value);
    }

    function handleCategorChange(event) {
      setCategor(event.target.value);
    }

    function handlePriceChange(event) {
      setPrice(event.target.value);
    }

    const filteredProducts = game.filter((product) => {
      return product.title.includes(searchQuery);
    });

    useEffect(() => {
      const unsubscribe = db.collection('products')
        .onSnapshot((querySnapshot) => {
          const products = [];
          querySnapshot.forEach((doc) => {
            setLoading(false);
            products.push(doc.data());
          });
          setGame(products.filter((item) => (price ? item.price >= Number(price.split('-')[0]) && 
            item.price <= Number(price.split('-')[1]) : true) && (genre ? item.genres[0] === genre : true) &&
              (categor ? item.categor[0] === categor : true)));
       
            setGenres(products.map(products => products.genres));
        });
      return unsubscribe;
    }, [genre, price, categor]);

    return [
        <div>
          <div className='telegram'>
            <img 
                src="https://www.t-developers.com/wp-content/uploads/2022/09/Telegram-logo-2048x1280.png" 
                width="100px"
              />
            <div className='tg_left'>
              <h1>С Telegram стало проще!</h1>
              <span>Наш интернет-магазин теперь доступен и в Telegram!</span>
            </div>
            <div className='tg_right'>
              <a href='https://t.me/Nationwide_bot'>Перейти в Telegram</a>
            </div>
          </div>
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
            <div className='select'>
              <select value={categor} onChange={handleCategorChange}>
                  <option value="">Фильтрация по категориям</option>
                    {categors.map((categor) => (
                    <option key={categor} value={categor}>
                  {categor}
                  </option>
              ))}
                </select>
            </div>
          </div>
          <h1 className='spis'>Список доступных игр:</h1>
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
