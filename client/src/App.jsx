import {Route, Routes} from 'react-router-dom'
import NavBar from './components/Navbar'
import ShowAll from './components/ShowAll'
import AddBook from './components/AddBook'
import NotFound from './components/NotFound'
import UpdateBook from './components/UpdateBook'


function App() {


  return (
    <>
      <h1 className='text-amber-500 bg-slate-900 text-5xl text-center'>WELCOME TO BOOKSHOP</h1>
     <NavBar />
      <Routes>
        <Route path='/' element={<ShowAll/>}/>
        <Route path='/book'>
          <Route path='add' element={<AddBook/>}/>
          <Route path='update/:id' element={<UpdateBook/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

    </>
  )
}

export default App
