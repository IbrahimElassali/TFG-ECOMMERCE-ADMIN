import Layout from "@/components/layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function DeleteProductPage(){ 
    const router = useRouter();
    const {id} = router.query;
    useEffect(()=>{
        if(!id){
            
        }
    })
    function goBack(){
        router.push('/products')

    }
    return (
        <Layout>
            <h1>DO YOU WANT TO DELETE THIS PRODUCT ?</h1>
            <button>YES</button>
            <button onClick={goBack}>NO</button>

        </Layout>
    )
}