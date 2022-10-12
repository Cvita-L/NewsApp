import { useState } from 'react';
import './Login.scss';

const Login = ({ login, register }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = e => {
        e.preventDefault();
        login(username, password);
    }

    const onRegister = e => {
        e.preventDefault();
        register(username, password);
    };

    return <form className='login-form' onSubmit={onLogin}>
        <label 
            className='login-label '
        >
            Username
        </label>
        <input 
            className='login-input'
            type="text" 
            value={username}
            onChange={e => setUsername(e.target.value)}
        />
        <label 
            className='login-label '
        >
                Password
        </label>
        <input 
            className='login-input'
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <button 
            className='login-button'
            type='submit'
        >
            Login
        </button>
        <button 
            className='register-button'
            onClick={onRegister}
        >
            Register
        </button>
    </form>
}

export default Login;