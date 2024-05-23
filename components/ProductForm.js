import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
    title:existingTitle,
    description:existingDescription,
    price:existingPrice
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice) || '';
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }

  return (
    <form onSubmit={createProduct}>
      
      <label>Nombre del Producto </label>
      <input
        type="text"
        placeholder="Nombre del Producto"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
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
