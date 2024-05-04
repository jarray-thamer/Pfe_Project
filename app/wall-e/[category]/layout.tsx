import React from "react";

const CodeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" mx-auto max-h-screen h-screen  w-full ">
      <main className="">{children}</main>
    </div>
  );
};

export default CodeLayout;
