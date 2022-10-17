//Función auxiliar para generar la orden de compra
const ordenGenerada = (nombre, email, telefono, direccion, cart, total) => {
    return {
        buyer: {
            name: nombre,
            email: email,
            phone: telefono,
            address: direccion,
        },
        items: cart,
        total: total,
        created: new Date().toLocaleString()
    }
}

export default ordenGenerada;