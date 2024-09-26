"use client";
import axios from "axios"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';



export default function formprt() {
    
    const { id } = useParams();
    
    const [title, setTitle] = useState();
    interface Form {
        title: string;
        description: string;
    }
    const [form, setForm] = useState<Form | null>(null);
    
    const fetchForm = async () => {
        try
        {
            const response = await axios.get(`http://localhost:3000/api/form/fetchone/${id}`);
            if(response){
                setForm(response.data);
                setTitle(response.data.title);
                console.log("Response: ",response.data);
                
               
                
            }
            else{
                console.log("No data found");
            }
        }
        
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchForm();
    }, [id]);
    
    return (
        <div>
            <h1>Form</h1>
            {form ? (
                <div>

                <h2>{form.title}</h2> 
                <p>{form.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    )
}