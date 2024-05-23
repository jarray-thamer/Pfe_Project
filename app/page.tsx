import Image from "next/image";
import React from "react";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Carousel from "@/components/carousel";

const features = [
  {
    name: "Customization",
    description:
      "Allow users to specify the personality, skills, reaction, and domain of their AI ChatBots. ",
    image: "/f1.png",
    alt: "Secure",
    color: "blue",
  },
  {
    name: "Secure ",
    description:
      "secure user authentication and management for Authentication and Authorization.",
    image: "/f2.png",
    alt: "Customizable",
  },
  {
    name: "User-Interface",
    description:
      "user interface is designed for simplicity and efficiency, and featuring a clean. Enjoy an intuitive experience with clear navigation, and customizable elements, enhancing your productivity and satisfaction.",
    image: "/f3.png",
    alt: "Customizable",
  },
  {
    name: "PDF Generation",
    description:
      "The ability to capture and save your AI companion’s responses in PDF format.",
    image: "/pdf.png",
    alt: "Customizable",
  },
  {
    name: "Share",
    description:
      "Allow users to select either private (individual use) or public (shared) access for the AI ChatBots they have generated.",
    image: "/share.png",
    alt: "Customizable",
  },
  {
    name: "Memorization",
    image: "/chat.png",
    description:
      "Create AI Chatbot that memorize entire chat history and last messages.",
    alt: "Customizable",
  },
];

const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-10 border-b-2 ">
        <div className="flex justify-center items-center">
          <Image src={"/Wall-E (3).svg"} width={100} height={100} alt="logo" />
          <h2 className="text-2xl font-semibold">Wall-E</h2>
        </div>
        <div>
          <SignedOut>
            <Button variant={"link"} size={"lg"} className="text-base mr-2">
              <SignInButton>Login</SignInButton>
            </Button>
            <Button className="ml-2 text-base" size={"lg"}>
              <SignUpButton>Get Started</SignUpButton>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/">Log out</UserButton>
          </SignedIn>
        </div>
      </div>
      {/* Section 1 */}
      <section className="md:py-20 py-10 bg-gradient-to-r from gray-00 to-gray-200 spacey-10">
        <div className="container mx-auto text-center">
          <div
            className="text-6xl flex justify-center font-bold md:px-20 pb-10
            text-gradient
            bg-gradient-to-r
            from-blue-500
            to-green-300
            bg-clip-text
            text-transparent
            "
          >
            Create and Interact with Your AI Companion in seconds
          </div>
          <p
            className="text-lg md:text-xl md-10
            bg-gradient-to-r
            from-black
            to-gray-400
            bg-clip-text
            text-transparent
            font-bold
            "
          >
            We have a lot of ai assistant to choose from, pick or create one
            based on your need and get started.
          </p>
          <div className="flex gap-4 justify-center pt-10">
            <button className="bg-blue-500 text-white px-10 py-4 rounded-md text-lg font-bold">
              <Link href="/wall-e">Get started</Link>
            </button>
            <button className="bg-gray-600 text-white px-10 py-4 rounded-md text-lg font-bold">
              <a href="#learn-more">Learn More</a>
            </button>
          </div>

          <div className="pt-10 flex justify-center">
            <Image
              id="learn-more"
              className="rounded-xl  md:w-1/2 p-4 md:p-0"
              src={"/section-one.jpg"}
              width={4200}
              height={4200}
              alt="section One"
            />
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <div>
        <div className="flex-col items-center justify-center">
          <Carousel />
        </div>
      </div>
      <div className="md:flex-row flex-col items-center flex justify-center pb-10">
        <div className="p-5 justify-center md:w-1/3">
          <div
            className="
                bg-gradient-to-r
                from-blue-800
                to-green-300
                bg-clip-text
                text-transparent
                text-4xl
                md:text-6xl
                font-bold
                pb-10S
                "
          >
            From idea to real platform
          </div>
          <div className="text-2xl mb-4 mt-4">
            Wall-E allows you to use the power of create a custom Ai Companion.
          </div>
          <Link
            className={buttonVariants({
              size: "lg",
              className:
                "mt-5 bg-blue-500 text-white p-4 justify-center flex md:w-1/3 rounded-lg hover:bg-blue-600",
            })}
            href="/wall-e"
          >
            Get started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <Image
          className="rounded-xl  md:w-2/5 p-4 md:p-0 "
          src={"/section-two.jpg"}
          width={4200}
          height={4200}
          alt="section two"
        />
      </div>
      <div
        className="text-3xl flex justify-center md:text-5xl font-bold pt-5 pb-10
                bg-gradient-to-r from-purple-400 to-blue-800 bg-clip-text text-transparent"
      >
        Product Features
      </div>
      <div className="grid grid-cols-1 p-4 md:grid md:grid-cols-3 gap-4 md:px-40">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex-col space-y-6 pb-10 border p-8 rounded-xl 
            items-center justify-center w-full hover:scale-105 transform transition-all duration-500 ease-in-out"
          >
            <div className="text-gray-600 text-3xl font-bold">
              <Image
                src={feature.image}
                alt={feature.alt}
                width={120}
                height={120}
                className="object-contain flex mb-10"
              />
              <div>
                <div className="text-2xl pb-4 bg-gradient-to-t from-black to-gray-400 bg-clip-text text-transparent">
                  {feature.name}
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent text-lg">
                  {feature.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section */}
      <div className="items-center flex justify-center md:py-4">
        <div
          className="text-center md:text-6xl text-4xl 
        bg-gradient-to-r
        from-blue-800
        to-purple-300
        bg-clip-text
        text-transparent
        pb-10
        font-bold
        
        "
        >
          Create and use AI Companion.Made Simple.
          <div className="justify-center items-center flex md:pt-10 p-4">
            <Image
              className="rounded-xl w-2/3"
              src={"/section-three.jpg"}
              width={1024}
              height={1024}
              alt="section three"
            />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="md:py-20 p-10">
        <div className="border-[1px] md:w-2/3 mx-auto p-10 rounded-xl">
          <div className="text-4xl font-bold mb-5">
            Start Creating your AI Companion today.
          </div>
          <div>
            Curious about how Wall-E work? Get start now to learn more about our
            platform.
          </div>

          <button className="bg-blue-500 text-white px-6 py-3 md:w-1/4 mt-5 rounded-lg hover:bg-blue-600">
            <Link href="/wall-e">Get started</Link>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
    border-t-[1px]
    hidden
    md:block
    bg-indigo-400
    "
      >
        <div className="flex justify-evenly gap-4 p-4">
          <div>
            <div className="flex text-white flex-col p-4 cursor-pointer text-xl">
              All rights reserved. @2023 by Bird Inc.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
