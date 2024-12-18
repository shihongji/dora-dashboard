"use client";

import { Banner } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";

const BannerContainer = () => {
  const [bannerText, setBannerText] = useState("");
  useEffect(() => {
    const pinText = localStorage.getItem("bannerText") || "Welcome to the dashboard!";
    setBannerText(pinText);
  }, []);

  return (
    <Banner>
      <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
          <p className="mt-1 flex items-center text-base text-gray-800 dark:text-gray-400 leading-normal">
            {bannerText}
          </p>
        </div>
        <Banner.CollapseButton
          color="gray"
          className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
        >
          <HiX />
        </Banner.CollapseButton>
      </div>
    </Banner>
  );
};

export default BannerContainer;
