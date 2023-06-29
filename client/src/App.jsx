import React from 'react'
import Register from './register/Register'
import axios from 'axios'

function App() {

  axios.defaults.baseURL = "http://localhost:4040"
  axios.defaults.withCredentials = true

  return (
    <Register/>
  )
}

export default App