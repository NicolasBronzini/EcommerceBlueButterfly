import React from 'react'
import Item from '../Item'
import Row from 'react-bootstrap/Row';

const ItemList = ({products}) => {
  return (    
    <Row  className="ItemCard">
      {products.map(product => {            
        return (
          <Item key={product.id} product={product}/>
        )
      })}              
    </Row>  
  )
}

export default ItemList