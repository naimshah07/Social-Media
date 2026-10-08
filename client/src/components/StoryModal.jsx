import { ArrowLeft, Sparkle, Upload, TextIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const StoryModal = ({setShowModal}) => {
  const bgColors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9448",
  ];

  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateStory = async () => {};
  return (
    <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 flex items-center justify-between">
          <button onClick={() => setShowModal(false)} className="text-white p-2 cursor-pointer">
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <span className="w-10"></span>
        </div>

        <div className="rounded-lg h-96 flex items-center justify-center relative" style={{backgroundColor: background}}>
          {mode === "text" && (
            <textarea className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none" placeholder="What's on your mind?" onChange={(e) => setText(e.target.value)} value={text} />
          )}
          {mode === "media" && previewUrl && (
            media?.type.startsWith('image') ? (
              <img src={previewUrl} alt="" className="object-contain max-h-full" />
            ) : (
              <video src={previewUrl} className="object-contain max-h-full" />
            )
          )}
        </div>
        <div className="flex mt-4 gap-2">
          {bgColors.map((color)=> (
            <button key={color} className="w-6 h-6 rounded-full ring cursor-pointer" style={{backgroundColor: color}} onClick={()=> setBackground(color)}/>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={()=> {setMode('text'); setMedia(null); setPreviewUrl(null)}} className={`flex-1 flex items-center justify-center gap-2 p-2 cursor-pointer rounded ${mode === 'text' ? 'bg-white text-black' : 'bg-zinc-800'}`}>
            <TextIcon size={18}/> Text
          </button>
          <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? 'bg-white text-black' : 'bg-zinc-800'}`}>
            <input onChange={(e)=>{handleMediaUpload(e); setMode('media')}} type="file" accept="image/*, video/*" className="hidden"/>
            <Upload size={18}/> Photo/Video
          </label>
        </div>
        <button onClick={()=> toast.promise(handleCreateStory(), {
          loading: 'Saving...',
          success: <p>Story Added</p>,
          error: e => <p>{e.message}</p>,
        })} className="flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer">
          <Sparkle size={18}/>Create Story
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
