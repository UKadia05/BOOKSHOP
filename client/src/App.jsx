import { useState } from 'react'
import ShowAll from './showall'
import AddBook from './AddBook'

function App() {


  return (
    <>
      <h1 className='text-amber-500 bg-slate-900 text-5xl text-center'>WELCOME TO BOOKSHOP</h1>
      <AddBook/>
      <ShowAll />

    </>
  )
}

export default App
