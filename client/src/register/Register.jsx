import axios from 'axios'
import React, { useState } from 'react'

function Register() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

async function regsiterHandler(e){
  e.preventDefault()

    await axios.post('/register', {username , password})
  }

  return (
   <div className="bg-blue-50 h-screen flex items-center">
    <form className='w-64 mx-auto mb-12' onSubmit={regsiterHandler}>

        <input type="text" placeholder='Username' value={username} onChange={(e => setUsername(e.target.value))} className='block w-full rounded-sm p-2 mb-2 border ' />

        <input type="password" placeholder='Password' value={password} onChange={(e => setPassword(e.target.value))} className='block w-full rounded-sm p-2 mb-2 border' />

        <button className='bg-blue-500 text-white block w-full rounded-sm border p-2 mb-2'>Register</button>
    </form>
   </div>
  ) 
}

export default Register