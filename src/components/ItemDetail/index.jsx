import React, { useContext, useState } from 'react'
import './styles.css';
import ItemCount from '../ItemCount'
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Button from 'react-bootstrap/Button';


const ItemDetail = ({product}) => {

    const [qty, setQty] = useState(0);
    const navigate = useNavigate();
    const {addItem} = useContext(CartContext);

    const agregarAlCarrito = (cantidad) => {        
        setQty(cantidad);                
    };

    const finalizarCarrito = () => {
        const productToSave = {...product, cantidad: qty};
        addItem(productToSave);        
        navigate('/cart');
    };
    
    return (  
        <article className='card-main'>            
            <div className="containerDetail">
                <div >
                    <img src={product.image} className="img-detail" alt="product-detail"/>
                </div>
                <div className="detail-subcontainer">
                    <h1>{product.title}</h1>  
                    <p><strong>Descripción:</strong> {product.description}</p>
                    <p><strong>Precio:</strong> ${product.price}</p>
                    { qty ? (
                        <Button variant="success" onClick={finalizarCarrito}>Finalizar Compra</Button>                        
                    ) : (
                        <ItemCount initial={1} stock={product.stock} onAdd={agregarAlCarrito} product={product} />
                    )}
                </div>
            </div>
        </article>     
    )
}

export default ItemDetail


