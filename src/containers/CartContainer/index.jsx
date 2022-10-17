import React, { useContext } from 'react'
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const CartContainer = () => {
  const {cart, removeProduct, clearCart, sumaTotalCarrito} = useContext(CartContext);
  const navigate = useNavigate();
  let totalCarrito = sumaTotalCarrito(); 

  const removeCar = (e) => {    
    removeProduct(e.target.value);    
    if(totalCarrito > 0){
      navigate('/cart')}
    else {
      navigate('/');
    }
  }

  const cleanAllCart = () => {
    clearCart()
    navigate('/');
  }
  
  const terminarCompra = () => {
    navigate('/form');    
  }
  
  if(cart.length < 1){    
    navigate('/');
    return <Link to="/"></Link>
  } else {        
    return (
      <div>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Total</th>
            <th></th>
          </tr>      
        </thead>
        <tbody>
        {cart.map(product => {                   
          return (          
            <tr>
              <td width={'1px'}>{product.cantidad}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>${product.cantidad * product.price}</td>
              <td><Button variant="danger" value={product.id} onClick={removeCar}>Eliminar</Button></td>            
            </tr>          
          )
        })      
        }      
        </tbody>              
      </Table>  
        <h3><strong>TOTAL COMPRA: ${totalCarrito}</strong></h3>
        <br></br>
        <div>
          <Button variant="secondary" onClick={cleanAllCart}>Limpiar Carrito</Button>
          <Button variant="success" onClick={terminarCompra}>Checkout</Button>          
        </div>
      </div>
    )
  }
}

export default CartContainer