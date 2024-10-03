'use client';
import FormCreator from "../../components/FormCreator";
import FormState from "../../components/Formstate";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Create & Manage Your Forms</h1>
                    <p className="mt-4 text-gray-600">
                        Build custom forms effortlessly and track submissions in real-time.
                    </p>
                </header>

                
                <section className="bg-white p-8 rounded-lg shadow-md mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Start Creating a New Form
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Use the form builder below to create your custom forms. Add fields, manage questions, and preview your form instantly.
                    </p>
                    <FormCreator />
                </section>

               
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Your Forms
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Below are all the forms you've created. Click on any form to view, edit, or manage the responses.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <FormState />
                    </div>
                </section>
            </div>
        </div>
    );
}
