"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const EmptyPrompt = () => {
  const router = useRouter();
  return (
    <div className=" flex flex-col justify-center items-center p-4">
      <Image
        className=""
        src={"/Asset 9.png"}
        alt="ghost"
        width={124}
        height={124}
      />
      <div className="text-center font-semibold ">
        {/* <h1 className="text-4xl text-black/70 font-bold">OOPS!</h1> */}
        <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500  to-purple-600">
          Looks like you haven't created a companion yet
        </h1>
      </div>
      <Button
        className="mt-4"
        size={"lg"}
        onClick={() => router.replace("/wall-e/createprompt/prompt/new-prompt")}
      >
        Create companion <WandSparkles className="w-4 h-4 ml-4" />
      </Button>
    </div>
  );
};

export default EmptyPrompt;
