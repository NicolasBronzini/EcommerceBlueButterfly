import React, { useContext, useState } from 'react'
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Swal from "sweetalert2";
import ordenGenerada from "../../services/generarOrden";
import validator from 'validator'


const Form =  ()=> {
    const {cart, clearCart, sumaTotalCarrito} = useContext(CartContext);
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const handleInputChange = (event) => {        
        setDatos ({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const realizarCompra = async (event)  => {
        event.preventDefault();
        const importeTotal = sumaTotalCarrito();
                
        if (datos.name.length === 0 || datos.address.length === 0 || datos.email.length === 0 || datos.phone.length === 0) {                     
            Swal.fire (
                'Verificar Datos',
                `Favor completar todos los datos`,
                'warning'
            );         
        }
        else {
            if (validator.isEmail(datos.email)) {                
                const orden = ordenGenerada(
                    datos.name,
                    datos.email,
                    datos.phone,
                    datos.address,
                    cart,
                    importeTotal
                );
                
                try {
                    // Generación de la orden de compra
                    const docRef = await addDoc(collection(db, "orders"), orden);
                
                    //Actualizamos el stock de los productos vendidos
                    cart.forEach(async (productoEnCarrito) => {      
                        const productRef = doc(db, "products", productoEnCarrito.id);      
                        const productSnap = await getDoc(productRef);      
                        await updateDoc(productRef, {
                            stock: productSnap.data().stock - productoEnCarrito.cantidad,
                        });
                    });

                    Swal.fire (
                        'Gracias por tu Compra',
                        `Tu orden de compra es ID: ${docRef.id}`,
                        'success'
                    );
                
                    cleanAllCart();                
                }
                catch (error){
                    console.log(error);
                }
            }
            else {
                Swal.fire (
                    'Correo Electrónico',
                    `Favor de validar tu Correo Electrónico`,
                    'warning'
                );
            }
        }
    }
      
    const cleanAllCart = () => {
        clearCart()
        navigate('/');
    }

  return (
    <form className='form-horizontal' id="Formulario" onSubmit={realizarCompra}>
        <fieldset>
            <legend className="titulo-formulario">Datos para el Envio</legend>
                <div className="form-group">
                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                    <div className="col-md-8">
                        <input id="fname" name="name" type="text" placeholder="Nombre Completo" className="form-control" onChange={handleInputChange} />
                    </div>
                </div>                                   
                <div className="form-group">
                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-envelope-o bigicon"></i></span>
                    <div className="col-md-8">
                        <input id="email" name="email" type="text" placeholder="Email" className="form-control" onChange={handleInputChange} />
                    </div>
                </div>
    
                <div className="form-group">
                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-phone-square bigicon"></i></span>
                    <div className="col-md-8">
                        <input id="phone" name="phone" type="text" placeholder="WhatsApp" className="form-control" onChange={handleInputChange} />
                    </div>
                </div>
    
                <div className="form-group">
                    <span className="col-md-1 col-md-offset-2 text-center"><i class="fa fa-pencil-square-o bigicon"></i></span>
                    <div className="col-md-8">
                        <textarea className="form-control" id="address" name="address" placeholder="Direccion" rows="3" onChange={handleInputChange}></textarea>
                    </div>
                </div>
    
                <div className="form-group">
                    <div className="col-md-12 text-center">                                                                        
                        <input type="submit" value ="Comprar" className="btn btn-primary btn-lg" />
                    </div>
                </div>
        </fieldset>
    </form>
  )
}

export default Form