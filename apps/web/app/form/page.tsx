'use client';
import FormCreator from "../../components/FormCreator";

import FormState from "../../components/Formstate";
export default function Home() {
    return (
        <>
        <FormCreator />
        <div className="flex flex-wrap gap-6">

        <FormState />
        </div>
        </>
    );
}