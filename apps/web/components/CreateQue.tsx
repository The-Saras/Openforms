"use client";
import React, { useState } from "react";
import axios from "axios";
import {  useParams } from "next/navigation";

export default function CreateQue() {
  const [text, setText] = useState("");
  const { id } = useParams();

  const handleSubmit = async () => {
    const data = {
      text: text,
    };
    try {
      const response = await axios.post(
        `/api/form/createque/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        //console.log("Question created:", response.data);
        alert("Question created successfully");
      } else {
        alert("Error creating question");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Create Question</h1>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Enter Question
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your question..."
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
