import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Categories() {

  const [name, setName] = useState('');
  const [parentCategory, setparentCategory] = useState('');
  const[categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  },[])


  function fetchCategories(){
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }


  async function saveCategory(ev){
    ev.preventDefault();
  await axios.post('/api/categories',{name,parentCategory});
  setName('');
  fetchCategories();
  }


  return (
    <Layout>
      <h1>Categorias</h1>
      <label>Nueva Categoria</label>

      <form onSubmit={saveCategory} 
      className="flex gap-1">
      <input className="mb-0" 
      type="text" 
      placeholder={'Category name'} 
      value={name} 
      onChange={ev =>setName(ev.target.value)}/>

      <select className="mb-0"
      onChange={ev =>setparentCategory(ev.target.value)} 
      value={parentCategory}>
        <option value="">Rama Raiz</option>
        {categories.length > 0 && categories.map(category =>(
            <option value={category._id}>{category.name}</option>
          ))}
      </select>

      <button type="submit" className="btn-primary py-1">Añadir</button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Nombre de categorias</td>
            <td>Rama Categoria</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map(category =>(
            <tr>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
              <td>
                <button className="btn-primary mr-1">Editar</button>
                <button className="btn-primary">Borrar</button>
              </td>
              </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}