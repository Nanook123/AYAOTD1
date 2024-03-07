import React, { useState } from 'react'




export default function Login({ user }:{user: {}}){
const LoginForm = ({ onLogin }) => {
    const [errors, setErrors] = useState([])
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const [isloading, setIsLoading] = useState(false)

    const handleChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(login)
        }).then((res) => {
            setIsLoading(false);
            if (res.ok) {
                res.json().then((user) => onLogin(user));
            } else {
                res.json().then((error) => setErrors(error.error));
            }
        });
    }






    return (

    
        
        <form onSubmit={handleSubmit}>
            <h2 className="loginh2">Login</h2>
            <input className='input-box' placeholder='Your Username' type='text' id='username'
            name='username' autoComplete='off' value={login.username}
            onChange={handleChange} />
            <input className='input-box' placeholder='Password' type='password' id='password'
            name='password' autoComplete='current-password' value={login.password}
            onChange={handleChange} />
            <button type='submit'>
                {isloading ? "loading...." : "login"}
            </button>
        
        <span>{errors}</span>
           

        </form>
    )
}
};