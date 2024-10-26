import React from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="bg-slate-800 text-white py-4 px-8 flex justify-between">
      <h1 className="text-4xl font-bold">Dora Dashboard</h1>
      <button
        onClick={() => router.push("/settings")}
        className="bg-cp-light-blue text-cp-dark-blue py-2 px-4 rounded"
        >Settings</button>
    </header>
  );
};

export default Header;