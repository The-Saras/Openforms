'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const FormCreator = ({ onClose }: { onClose: () => void }) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    const data = {
      title: title,
      des: description,
    };

    try {
      const response = await axios.post('/api/form/create', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        //console.log('Form created:', response.data);
        alert('Form created successfully');
        onClose();  // Close the popup after form submission
      } else {
        setError('Error creating form');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to create a form.</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Create a New Form</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Form Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-400 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Creating...' : 'Create Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={openForm}
        className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
      >
        <span className="text-2xl">+</span>
      </button>


      {isOpen && <FormCreator onClose={closeForm} />}
    </div>
  );
};

export default PopupForm;
