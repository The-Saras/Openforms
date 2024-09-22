"use client";
import { signIn , signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export function Navbar(){
    const session = useSession();
    return <div>
        <div className="flex justify-between">
            <div>
                OpenForms
            </div>
            <div>
                {session.data?.user && <>
                    <button className="m-2 p-2 bg-blue-400" onClick={()=>signOut()}>Sign Out</button>
                    <p>{session.data.user.name}</p>

                </> 
            }

                {!session.data?.user &&<button className="m-2 p-2 bg-blue-400" onClick={()=>signIn()}>Sign In</button>}
            </div>

        </div>
    </div>
}