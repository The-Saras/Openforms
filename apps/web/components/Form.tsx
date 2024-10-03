'use client';
import { useRouter } from 'next/navigation';

export default function Form(props: any) {
  const router = useRouter();

  return (
    <div
      className="border border-stone-300 rounded-lg p-5 max-w-xs w-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white cursor-pointer group"
      onClick={() => {
        router.push(`/form/${props.location}`);
      }}
    >
      <div className="flex flex-col space-y-2">
        <p className="text-xl font-bold text-gray-900 group-hover:text-blue-500 transition duration-300">
          {props.name}
        </p>
        <p className="text-sm text-gray-600 truncate">
          {props.des}
        </p>
        <div className="mt-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-md transition-colors duration-300">
            Open Form
          </button>
        </div>
      </div>
    </div>
  );
}
