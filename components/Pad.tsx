'use client'; // Add this to ensure it's treated as a client component
import AlertText from "@/components/AlertText";
const Pad = () => {
    return (
      <div className="flex-1 bg-gray-200 p-4 flex items-center justify-center">
        <div className="flex items-center justify-center h-full">
        <AlertText />
        </div>
      </div>
    );
  };
  
  export default Pad;