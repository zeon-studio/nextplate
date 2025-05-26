'use client';
import React, { useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Page () {
    const [Username, setUsername] = useState ('');
    const [Password, setPassword] = useState('');
    const Router = useRouter();
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(Username && Password){
        Router.push('/dashboard');
    }
    console.log('Username:', Username);
    console.log('Password:', Password);

};
    return (
        <>
            <div className="container text-center ">
                <h1>Login </h1>
            </div>
            <section className="section pt-14">
                <div className="container">
                    <form className="form-box dark:bg-dark dark:bg-darmode-body text-white shado-lg rounded-lg p-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input className="text-center mb-4 border border-dark rounded p-2 w-full dark:bg-gray-800 dark:border-gray-600"
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={Username}
                        onChange={e => setUsername(e.target.value)}
                        />
                        <input className="text-center mb-2 border border-dark-300 rounded p-2  dark:bg-gray-800 dark:border-gray-600 w-full"
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={Password}
                        onChange={e => setPassword(e.target.value)}
                        />
                        <button className="btn btn-primary w-full">Log in</button>
    <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        <span className="mx-2 text-gray-400">or</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
    </div>
    <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 flex items-center justify-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.98C7.69 8.98 4.07 7.13 1.64 4.15c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.91 3.97 2.94A8.6 8.6 0 0 1 2 19.54c-.32 0-.63-.02-.94-.06A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/></svg>
       Continue with Twitter
    </button>
    <button type="button" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.23-1.41 3.6-5.27 3.6-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.8 0 3.01.77 3.7 1.43l2.53-2.46C16.13 3.99 14.3 3 12.17 3 6.98 3 2.65 7.33 2.65 12.5S6.98 22 12.17 22c5.13 0 8.5-3.6 8.5-8.67 0-.58-.06-1.02-.14-1.47z"/></svg>
       Continue with Google
    </button>
    <div className="text-center mt-4">
        <p className="text-gray-500 dark:text-gray-400">No account ? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
    </div>
                    </form>
            </div>
             </section>
        </>
    )
};