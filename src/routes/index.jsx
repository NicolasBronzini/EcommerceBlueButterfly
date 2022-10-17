import React from 'react'
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes,Route} from "react-router-dom";
import NotFound from '../components/NotFound';
import CartContainer from '../containers/CartContainer';
import Form from '../components/Form';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import ItemListContainer from '../containers/ItemListContainer';
import ItemDetailContainer from '../containers/ItemDetailContainer';
// Importing toastify module
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css'; 

const RootIndex = () => {
  return (
    <BrowserRouter>       
        <NavBar/>
        <ToastContainer></ToastContainer>
        <Container className="fluid my-5"> 
          <Routes>         
              <Route path='/' element={<ItemListContainer/>} />
              <Route path='/category/:categoryaId' element={<ItemListContainer/>} />
              <Route path='/detalles/:productId' element={<ItemDetailContainer/>} />
              <Route path='/cart' element={<CartContainer />} />
              <Route path='/form' element={<Form/>} />
              <Route path='*' element={<NotFound/>}/>
          </Routes>        
        </Container>
        <Footer/>
    </BrowserRouter>
  )
}

export default RootIndex