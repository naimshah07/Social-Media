import { Badge, BadgeCheck, X } from "lucide-react";
import React, { useState, useEffect } from "react";

const StoryViewer = ({ stories, currentIndex, setCurrentIndex }) => {

  if (currentIndex === null) return null;

  const viewStory = stories[currentIndex];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer, progressInterval;
    if (viewStory && viewStory.media_type !== 'video') {

      const duration = 10000;
      const setTime = 100;
      let elapsed = 0;
      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100);
      }, setTime);

      //Close story after duration(10sec)
      timer = setTimeout(() => {
        setCurrentIndex(null);
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };

  }, [currentIndex, setCurrentIndex]);

  const handleClose = () => {
    setCurrentIndex(null);
  }

  const renderContent = () => {
    switch(viewStory.media_type) {
      case 'image':
        return (
          <img src={viewStory.media_url} alt="story" className="w-full h-full object-contain"/>
        );
      case 'video':
        return (
          <video onEnded={() => setViewStory(null)} src={viewStory.media_url} controls autoPlay className="w-full h-full object-contain" />
        );
      case 'text':
        return (
          <div className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center" >
            {viewStory.content}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center" style={{backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : '#000000'}}>
        {/* Progress Bar */}
        {viewStory.media_type !== 'video' && (
          <div className="absolute top-0 w-full h-1 bg-gray-700">
              <div className="h-full bg-white transition-all duration-100 linear" style={{width: `${progress}%`}}>

              </div>
          </div>
        )}
        {/* User Info -Top Left */}
        <div className="absolute top-4 left-4 items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
            <img src={viewStory.user?.profile_picture} alt="" className="size-7 sm:size-8 rounded-full object-cover border border-white"/>
            <div className="flex items-center space-x-3">
                <span className="text-white">{viewStory.user?.full_name}</span>
                <BadgeCheck size={18}/>
            </div>
        </div>
        {/* Close Button */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none">
            <X className="w-8 h-8 hover:scale-110 transition cursor-pointer"/>
        </button>

        {/* Content Wrapper */}
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Navigation areas */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 z-10" onClick={() => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 z-10" onClick={() => { if (currentIndex < stories.length - 1) setCurrentIndex(currentIndex + 1); else setCurrentIndex(null); }}></div>
          {renderContent()}
        </div>
    </div>
  );
};

export default StoryViewer;
