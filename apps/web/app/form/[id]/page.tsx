"use client";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CreateQue from "../../../components/CreateQue";
import Link from "next/link";

export default function formprt() {
    const session = useSession();
    const { id } = useParams();
    const [answers, setAnswers] = useState({});
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

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
        ownerId: string;
    }
    interface Question {
        id: string;
        text: string;
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
            const response = await axios.get(`/api/form/fetchone/${id}`);
            if (response) {
                setForm(response.data);
                setTitle(response.data.title);
                setQuestions(response.data.questions);
                console.log("Response: ", response.data);
            } else {
                console.log("No data found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchForm();
    }, [id]);

    return (
        <div className="p-4">
            {form ? (
                <div className="max-w-2xl mx-auto">
                    {/* Form title and description */}
                    <div className="bg-gray-100 p-4 rounded-md mb-4 shadow">
                        <h2 className="text-2xl font-bold mb-2">{form.title}</h2>
                        <p className="text-gray-700">{form.description}</p>
                    </div>

                    {/* Display all questions */}
                    <div>
                        {questions.map((question: Question) => (
                            <div key={question.id} className="bg-white border border-gray-300 p-4 rounded-md mb-4 shadow">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    {question.text}
                                </label>
                                <input
                                    type="text"
                                    className="border px-4 py-2 rounded-md w-full"
                                    onChange={(e) => handleInputChange(question.text, e.target.value)}
                                    placeholder="Your answer..."
                                />
                            </div>
                        ))}

                        {/* Button to trigger the popup (below questions) */}
                        {session.data?.user && session.data.user.id === form.ownerId && (

                            <>
                            <Link className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md mt-4" href={`/api/form/xlgen/${id}`} >Download  </Link>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md mt-4 flex items-center"
                                >
                                <span className="mr-2">+</span> Add Question
                            </button>
                            </>
                        )}

                        {/* Submit button */}
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

            {/* Modal for CreateQue component */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <CreateQue />
                    </div>
                </div>
            )}
        </div>
    );
}
