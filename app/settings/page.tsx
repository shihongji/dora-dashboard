// app/settings/page.tsx
'use client'; // Add this to ensure it's treated as a client component
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Settings: React.FC = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState('');
  const [jsonUrl, setJsonUrl] = useState('');

  const handleSubmit = () => {
    // Store values in localStorage (or sessionStorage if preferred)
    localStorage.setItem('videoUrl', videoUrl);
    localStorage.setItem('jsonUrl', jsonUrl);

    // Navigate back to the main page
    router.push('/');
  };

  return (
    <div className="p-4 h-2/6 w-2/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div>
        <label>Video URL:</label>
        <input 
          type="text" 
          value={videoUrl} 
          onChange={(e) => setVideoUrl(e.target.value)} 
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4 hidden">
        <label>JSON URL:</label>
        <input 
          type="text" 
          value={jsonUrl} 
          onChange={(e) => setJsonUrl(e.target.value)} 
          className="border p-2 w-full"
        />
      </div>
      <button 
        onClick={handleSubmit} 
        className="mt-4 bg-blue-500 text-white py-2 px-4"
      >
        Save and Return
      </button>
    </div>
  );
};

export default Settings;