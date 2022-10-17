import React from 'react';
import './styles.css';
import { useState, useEffect } from 'react';
import ItemList from '../../components/ItemList';
import { useParams } from 'react-router-dom';
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const ItemListContainer = () => {
  
  const [productos, setProductos] = useState([]);
    const {categoryId} = useParams();
    console.log(categoryId);

    useEffect(() => {
      (async () => {
          try {
              const q = categoryId ? query(collection(db, "products"), where("category", "==", categoryId)) : query(collection(db, "products"));

              const querySnapshot = await getDocs(q);
              const productos = [];
      
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                productos.push({id: doc.id, ...doc.data()})
              });
      
              setProductos(productos);
          } catch (error) {
              console.log(error);
          }
      })();
  }, [categoryId]);


  return (    
    <>          
      {
        productos.length ? <ItemList products={productos} /> : <h1>Cargando...</h1> 
      }          
    </>
  )
}

export default ItemListContainer;
