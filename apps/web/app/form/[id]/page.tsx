"use client";
import axios from "axios"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';
import CreateQue from "../../../components/CreateQue";



export default function formprt() {
    
    const { id } = useParams();
    
    const [title, setTitle] = useState();
    interface Form {
        title: string;
        description: string;
    }
    interface Question{
        text:string
    }
    const [form, setForm] = useState<Form | null>(null);
    const [questions, setQuestions] = useState([]); 
    
    const fetchForm = async () => {
        try
        {
            const response = await axios.get(`http://localhost:3000/api/form/fetchone/${id}`);
            if(response){
                setForm(response.data);
                setTitle(response.data.title);
                setQuestions(response.data.questions);
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
            
            {form ? (
                <div>

                


                <CreateQue />
                <h2>Title:{form.title}</h2> 
                <p>Description:{form.description}</p>
                {questions.map((questions:Question)=>{
                    return <p>{questions.text}</p>
                })}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    )
}