"use client";
import axios from "axios"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';



export default function formprt() {
    const router = useRouter();
    const { id } = useParams();
    console.log(id);
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const [forms, setForms] = useState({});


    //const id = query.id;
    const fetchData = async () => {
        if (status === 'loading') {
            return <div>Loading...</div>;
        }

        if (status === 'unauthenticated') {
            return <div>Please sign in to see this form.</div>;
        }
        try {

            const response = await axios.get(`/api/form/fetchone/${id}`);
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
        <div>
            <h1>Form</h1>
        </div>
    )
}