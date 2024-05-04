
import SideBar from "@/components/sidebar";
import React from "react";

const WalleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-screen w-screen flex ">
      <SideBar />
      <main className=" w-full">{children}</main>
    </div>
  );
};

export default WalleLayout;
