"use client";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const session = useSession();
    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            {!session.data?.user && <>
                <div className="text-2xl font-bold text-gray-800">
                    OpenForms
                    <span className="text-orange-500">.</span>io
                </div>
                <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
                    onClick={() => signIn()}
                >
                    <span>Get Started</span>
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </button>
            </>}

            {session.data?.user && <>

                <div className="text-2xl font-bold text-gray-800">
                    OpenForms
                    <span className="text-orange-500">.</span>io
                </div>
                <p>{session.data.user.name}</p>

            </>
            }
        </nav>
    );
}


