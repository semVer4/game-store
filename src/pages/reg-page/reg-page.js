import React, { useState } from 'react';
import './reg-page.css';

export const RegPage = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // отправляем данные на сервер для регистрации
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, role, password }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          // если регистрация прошла успешно, перенаправляем пользователя на страницу логина
          window.location.href = '/auth';
        } else {
          console.error(data.message);
        }
        } catch (err) {
            console.error(err);
        }
    };  

    return (
        <div className="reg-page">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
