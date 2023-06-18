import React from 'react';
import './game-categor.css';

export const GameCategor = ({ categor = '' }) => {
    return <span className="game-categor">{ categor }</span>
}
