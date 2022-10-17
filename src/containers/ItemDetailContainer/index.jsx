import React, { useEffect, useState }from "react";
import ItemDetail from "../../components/ItemDetail";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import ItemListContainer from "../ItemListContainer";

const ItemDetailContainer = () => {
    
    const [productDetail, setProductDetail] = useState([]);
    const {productId} = useParams();
    
    useEffect( () => {
        const getProducts = async () => { 
            const producto = [];            
            try{                
                const docRef = doc(db, "products", productId);                
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    producto.push({id:docSnap.id, ...docSnap.data()});
                    setProductDetail(producto);
                }                
            } 
            catch (error) {
                console.log(error);                
            }
        }
        getProducts();
    }, [productId]);
        
    return (
        <>
            {        
                productDetail.length ? productDetail.map((producto, indx) => {
                    return <ItemDetail key={indx} product={producto}/>;
                }) : <ItemListContainer/>
            }
        </>
    )
};

export default ItemDetailContainer;
