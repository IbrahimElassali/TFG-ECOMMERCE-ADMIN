import ProductForm from "@/components/ProductForm";
import Layout from "@/components/layout";

export default function NewProduct(){
    return (
    <Layout>
        <h1>Productos Nuevos</h1>
        <ProductForm></ProductForm>
    </Layout>
    )
}