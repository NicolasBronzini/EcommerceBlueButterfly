import React, { useContext } from 'react'
import './styles.css';
import CartWidget from '../CartWidget';
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const NavBar = () => {
  const {qty, sumaCantidadCarrito} = useContext(CartContext);
  sumaCantidadCarrito();
  return (
    <header className="menu__principal">
      <h1>BLueButterfly</h1>                              
        <nav align="center">            
            <ul class="menu__ul">
                <Link className="menu__li--a" to="/"> <li className="menu__li">Home</li></Link>
                <Link className="menu__li--a" to="/category/Electrodomesticos"><li className="menu__li">Electrodomesticos</li></Link>
                <Link className="menu__li--a" to="/category/Informatica"><li className="menu__li">Informatica</li></Link>
                <Link className="menu__li--a" to="/category/Deportes"><li className="menu__li">Deportes</li></Link>                         
                           
                <Link className="menu__li--a" to={qty ? "/cart" : "/"}><button id="cesta-carrito"><i><CartWidget/></i><span id="contador-carrito">{qty}</span></button></Link>                                
            </ul>
        </nav> 
    </header>
  )
}                         

export default NavBar