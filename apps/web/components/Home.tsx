"use client";
import { signIn, useSession } from "next-auth/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { SiNextdotjs, SiPostgresql, SiTailwindcss, SiGithub } from "react-icons/si";
import { useRouter } from "next/navigation";

export function HomeComp() {
    const session = useSession();
    const router = useRouter(); // Using router to navigate

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 py-10">
            <div className="max-w-5xl mx-auto space-y-12 px-4">
                {/* New Heading */}
                <header className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold text-gray-900">
                        Simplify Form Creation and Data Collection
                    </h1>
                    <p className="text-xl text-gray-600">
                        Streamline your workflow by building customizable forms in just a few clicks.
                    </p>
                </header>

                {/* Auth Section */}
                <div className="flex justify-center">
                    {!session.data?.user ? (
                        <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-lg shadow-xl max-w-lg">
                            <h2 className="text-3xl font-bold text-gray-800">Get Started</h2>
                            <p className="text-gray-600 text-center">
                                Sign in to create and manage forms effortlessly.
                            </p>
                            <button
                                onClick={() => signIn()}
                                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-8 rounded-full text-lg font-semibold flex items-center space-x-3 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 border-2 border-transparent hover:border-orange-600"
                            >
                                <span>Sign In</span>
                                <ArrowTopRightOnSquareIcon className="h-6 w-6" />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Create a New Form</h2>
                            <button
                                onClick={() => router.push("/form")} // Redirect to the /form page
                                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-8 rounded-full text-lg font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 border-2 border-transparent hover:border-orange-600"
                            >
                                <span>Create Form</span>
                                <ArrowTopRightOnSquareIcon className="h-6 w-6" />
                            </button>
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

                {/* GitHub Link Section */}
                <footer className="text-center py-6">
                    <p className="text-lg text-gray-700 mb-4">Check out the project on GitHub:</p>
                    <a
                        href="https://github.com/The-Saras/Openforms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-800 hover:text-black transition"
                    >
                        <SiGithub className="text-4xl" />
                        <span className="ml-2 text-xl font-semibold">OpenForms GitHub</span>
                    </a>
                </footer>
            </div>
        </div>
    );
}
