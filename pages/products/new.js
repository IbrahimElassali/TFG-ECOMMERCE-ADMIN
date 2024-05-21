import Layout from "@/components/layout";
import { useState } from "react";
import axios from "axios";

export default function NewProduct(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    async function createProduct(ev){
        ev.preventDefault();
        const data ={title,description,price}
        await axios.post('/api/products', data)


    }

    return (
        <Layout>
            <form onSubmit={createProduct}>
            <h1>Productos Nuevos</h1>
            <label>Nombre del Producto </label>
           <input type="text" placeholder="Nombre del Producto" value={title} onChange={ev=>setTitle(ev.target.value)}/>
           <label>Descripcion</label>
           <textarea placeholder="Descripcion" value={description} onChange={ev=>setDescription(ev.target.value)}></textarea>
           <label>Precio (EUR)</label>
           <input type="text" placeholder="Precio" value={price} onChange={ev=>setPrice(ev.target.value)}/>

           <button type="submit" className="btn-primary">Añadir</button>
           </form>
        </Layout>
    );
}