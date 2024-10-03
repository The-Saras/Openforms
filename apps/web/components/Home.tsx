"use client";
import { signIn, signOut } from "next-auth/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import FormState from "./Formstate";
import { useSession } from "next-auth/react";
import FormCreator, { PopupForm } from "./FormCreator";
import { SiNextdotjs, SiPostgresql, SiTailwindcss } from "react-icons/si";

export function HomeComp() {
    const session = useSession();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 py-10">
            <div className="max-w-5xl mx-auto space-y-12 px-4">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-6xl font-extrabold text-gray-900">
                        OpenForms<span className="text-orange-500">.io</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Build and share forms effortlessly. Collect responses with ease using our powerful form creator.
                    </p>
                </header>

                {/* Auth Section */}
                <div className="flex justify-center">
                    {!session.data?.user ? (
                        <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-lg shadow-xl max-w-lg">
                            <h2 className="text-3xl font-bold text-gray-800">Get Started</h2>
                            <p className="text-gray-600 text-center">
                                Sign in to create and manage forms with ease.
                            </p>
                            <button
                                onClick={() => signIn()}
                                className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg text-lg font-semibold flex items-center space-x-2"
                            >
                                <span>Sign In</span>
                                <ArrowTopRightOnSquareIcon className="h-6 w-6" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-800">Create a New Form</h2>
                                <PopupForm />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700">Manage Your Forms</h3>
                                <FormState />
                            </div>
                        </div>
                    )}
                </div>

                {/* Tech Stack Section */}
                <section className="text-center py-10 bg-white rounded-lg shadow-lg">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Powered By</h2>
                    <p className="text-lg text-gray-600 mb-6">We leverage modern technologies to deliver a seamless experience.</p>
                    <div className="flex justify-center space-x-8">
                        <div className="flex flex-col items-center">
                            <SiNextdotjs className="text-6xl text-gray-800" />
                            <span className="mt-2 text-gray-700">Next.js</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <SiPostgresql className="text-6xl text-gray-800" />
                            <span className="mt-2 text-gray-700">PostgreSQL</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <SiTailwindcss className="text-6xl text-gray-800" />
                            <span className="mt-2 text-gray-700">Tailwind CSS</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
