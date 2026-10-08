import React from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{
        backgroundImage: `url(${assets.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left side : Branding */}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40">
        <img src={assets.logo} alt="" className="h-12 object-contain" />
        <div>
          <div className="flex items-center gap-3 mb-4 max-md:mt-10">
            <img src={assets.group_users} alt="" className="h-8 md:h-10" />
            <div className="flex gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 text-transparent fill-amber-500"
                  />
                ))}
            </div>
            <p>Used by 12k+ developers</p>
          </div>
        </div>
        <h1 className="text-3xl md:text-6xl md:pb-2 font-bold bg-linear-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent">
          More than just friends truly connect
        </h1>
        <p className="text-xl md:text-3xl text-indigo-900 max-w-72 md:max-w-md">connect with global community on pingup.</p>
        <span className="md:h-10"></span>
      </div>
      {/* Right side : Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
                <SignIn/>
      </div>
    </div>
  );
};

export default Login;
