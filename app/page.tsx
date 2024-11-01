"use client";

import Pad from "@/components/core/Pad";
import VideoPlayer from "@/components/ui/VideoPlayer";
import Feed from "@/components/core/Feed";
import Header from "@/components/core/Header";
import BannerContainer from "@/components/core/Banner";
import '../i18n';
import { VideoTimeProvider } from "@/context/VideoTimeContext";
import { GameInfoProvider } from "@/context/GameInfoContext";

const Home = () => {
  return (
    <VideoTimeProvider>
      <GameInfoProvider>
    <div>
      <Header />
      <BannerContainer />
      <div className="p-4 h-screen">
        {/* Row 1: Pad and Player horizontally */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <Pad  />
          </div>
          <div className="flex-1">
            <VideoPlayer />
          </div>
        </div>

        {/* Row 2: Feed below */}
        <div className="">
          <Feed />
        </div>
      </div>
    </div>
    </GameInfoProvider>
    </VideoTimeProvider>
  );
};

// Wrap the Home component with appWithTranslation
export default Home;
