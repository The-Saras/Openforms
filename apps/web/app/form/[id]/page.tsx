"use client";
import axios from "axios"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CreateQue from "../../../components/CreateQue";



export default function formprt() {

    const { id } = useParams();
    const [answers, setAnswers] = useState({});
    const handleInputChange = (questionId: any, answer: any) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const [title, setTitle] = useState();
    interface Form {
        title: string;
        description: string;
    }
    interface Question {
        id: string
        text: string
    }
    const [form, setForm] = useState<Form | null>(null);
    const [questions, setQuestions] = useState([]);


    const handleSubmit = async () => {
        const data = {
            answers, // Contains all the answers for all questions

        };

        try {
            const response = await axios.post(`/api/form/resp/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("Form submitted successfully!");
            } else {
                alert("Error submitting the form");
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting the form");
        }
    };



    const fetchForm = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/form/fetchone/${id}`);
            if (response) {
                setForm(response.data);
                setTitle(response.data.title);
                setQuestions(response.data.questions);
                console.log("Response: ", response.data);



            }
            else {
                console.log("No data found");
            }
        }

        catch (err) {
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



                    { }
                    <CreateQue />
                    <h2>Title:{form.title}</h2>
                    <p>Description:{form.description}</p>

                    <div className="form-container">
                        <h1 className="text-xl font-semibold mb-4">Submit Form</h1>
                        {questions.map((questions: Question) => {
                            return <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    {questions.text}
                                </label>
                                <input
                                    type="text"
                                    className="border px-4 py-2 rounded-md w-full"
                                    onChange={(e) => handleInputChange(questions.id, e.target.value)}
                                    placeholder="Your answer..."
                                />
                            </div>

                        })}
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md mt-4"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}