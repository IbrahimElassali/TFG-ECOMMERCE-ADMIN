import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice) || "";
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const[images,setImages] = useState(existingImages || []);
  const router = useRouter();

  // console.log("Print id: ",_id)
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price,images };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {

    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();

      for (const file of files) {        
        data.append('file', file);
      }
      const res= await axios.post('/api/upload', data);
      //console.log(res.data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }

  }
  function updateImagesOrder(images){
    //console.log(arguments);
    //console.log(images);
    setImages(images)
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
        Imagenes
      </label>

      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
         list={images}
        setList={updateImagesOrder}
        className="flex flex-wrap gap-1">

        {!!images?.length && images.map(link =>(
          <div key={link} className="h-24 ">
            <img src={link} className="rounded-lg"></img>
            </div>
        ))}

         </ReactSortable>
        {isUploading && (
          <div className="h-24 items-center flex">
            <Spinner/>
            </div>
        )}

        <label className="w-24 h-24 cursor-pointer gap-1 rounded-lg text-gray-700 bg-gray-100 border text-center flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          <div>
            Subir
          </div>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
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
