"use client";
import Auth from "./Auth";
import Quote from "./Quote";

const Signin = () => {
  
  return (
    <div className="">
      <div className="pt-12 flex flex-col lg:grid lg:grid-cols-10">
        <Quote/>
        <Auth component={"signin"}/>
      </div>
    </div>
  );
};

export default Signin;