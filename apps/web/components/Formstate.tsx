"use client";
import axios from "axios"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Form from "./Form";

export default function FormState() {
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const [forms,setForms] = useState([]);

    const fetchData = async () => {
        if (status === 'loading') {
            return <div>Loading...</div>;
        }

        if (status === 'unauthenticated') {
            return <div>Please sign in to create a form.</div>;
        }
        try 
        {   
            
            const response = await axios.get('/api/form/fetch');
            if (response.status === 200) {
                console.log('Form fetched:', response.data);
                setForms(response.data.forms);
            } else {
                console.log('Error fetching form');
            }

        } 
        catch (error) {
            console.error('Error fetching form:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [session]);
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {forms.map((form:any)=>{
            console.log(form);
            return(
                <>
                <Form key={form.id} location={form.id} name={form.title} des={form.description} />
                </>
            )
        })}
        </div>
        </>
    )
}