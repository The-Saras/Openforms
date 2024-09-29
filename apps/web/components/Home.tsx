"use client";
import { signIn, signOut } from "next-auth/react";
import {ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import FormState from "./Formstate"
import { useSession } from "next-auth/react";
import FormCreator, { PopupForm } from "./FormCreator";

export function HomeComp() {
    const session = useSession();
    return <div>
        <div className="flex justify-between">

           
        </div>
        <div className="">
            
            {!session.data?.user &&
                
                <div className="w-full flex flex-col items-center space-y-4 p-6 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-lg shadow-lg">
                    <p className="text-4xl font-bold text-gray-800 max-w-2xl text-center leading-tight">
                        CREATE FORMS WITHIN SECONDS WITH
                        <span> OPENFORMS</span>
                        <span className="text-orange-500">.</span>IO
                    </p>
                    <p className="text-lg text-gray-600 text-center max-w-md">
                        Create and share forms effortlessly. Collect responses and manage your data seamlessly.
                    </p>
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
                        onClick={() => signIn()}
                    >
                        <span>Get Started</span>
                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </button>
                </div>

            }
            {session.data?.user &&
            <>
            <p className="text-lg font-bold text-gray-800 ">Create new form</p>
            <PopupForm />
            Check Your forms
            <FormState />
            </>}
        </div>

    </div>
}
