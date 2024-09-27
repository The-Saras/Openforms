'use client';
import { useRouter } from 'next/navigation'

export default function Form(props: any) {
  const router = useRouter();
    return (
      <>

        <div className="border-2 border-stone-400 rounded-md p-4 max-w-xs w-full hover:border-blue-500 transition-all duration-300" onClick={()=>{
          router.push(`/form/${props.location}`);
        }}>
          <p className="text-lg font-semibold">Name: {props.name}</p>
          <p className="text-sm text-gray-600">Des: {props.des}</p>
          
        </div>
      </>
    );
  }
  