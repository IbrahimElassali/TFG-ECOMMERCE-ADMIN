import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice) || '';
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  
  // console.log("Print id: ",_id)
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if(_id){
      //update
      await axios.put('/api/products', {...data,_id});
    } else{
      //create
    await axios.post("/api/products", data);
    }
    setGoToProducts(true);
    
  }
  if (goToProducts) {
    router.push("/products");
  }

  return (
    <form onSubmit={saveProduct}>
      
      <label>Nombre del Producto </label>
      <input
        type="text"
        placeholder="Nombre del Producto"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>
        Imagenes <button></button>
      </label>
      <div className="mb-2">
        {!images?.lenght &&(<div>No hay imagenes de este producto</div>)}

      </div>
      <label>Descripcion</label>
      <textarea
        placeholder="Descripcion"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>Precio (EUR)</label>
      <input
        type="text"
        placeholder="Precio"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      <button type="submit" className="btn-primary">
        Añadir
      </button>
    </form>
  );
}
