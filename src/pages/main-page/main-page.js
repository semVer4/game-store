import React from 'react';
import { useHistory } from 'react-router-dom';
import './main.css';

export const MainPage = () => {
  const history = useHistory();

  const clickToStore = () => {
    history.push('/home');
  };

  return (
      <div>
        <div className="logo" style={{backgroundImage: '/img/logo.svg'}}></div>
        <section className="layers">
          <div className="layers__container">
            <div className="layers__item layer-1" style={{backgroundImage: `url(/img/layer-1.jpg)`, backgroundRepeat: 'no-repeat'}}></div>
            <div className="layers__item layer-2" style={{backgroundImage: `url(/img/layer-2.png)`}}></div>
            <div className="layers__item layer-3">
              <div className="hero-content">
                <h1>GameStore<span>Игровой интернет-магазин, позволяющий приобретать<br /> и 
                устанавливать игры различного жанра<br /></span></h1>
                <button className="button-start" onClick={clickToStore}>смотреть игры!</button>
              </div>
            </div>
            <div className="layers__item layer-4">
              <canvas className="rain"></canvas>
            </div>
            <div className="layers__item layer-5" style={{backgroundImage: `url(/img/layer-5.png)`}}></div>
            <div className="layers__item layer-6" style={{backgroundImage: `url(/img/layer-6.png)`}}></div>
          </div>
        </section>
      </div>
  )
}
