import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { Navbar } from "../components/Navbar";
import {FormCreator } from "../components/FormCreator";


export default function Home() {
  return (
    <>
    <p>Hello</p>
    <Navbar />
    <FormCreator />
    </>
  );
}
