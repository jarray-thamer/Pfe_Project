import { Button, buttonVariants } from "@/components/ui/button";

import {
  SignInButton,
  UserButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pb-5 flex flex-col items-center max-w-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <nav className="sticky top-0 bg-white/30 w-full text-black backdrop-blur-md p-2 flex justify-between items-center">
        <Image src={"/logo.png"} width={98} height={98} alt="wall-e logo" />
        <div className="flex mx-4">
          <SignedOut>
            <Button className="mr-2">
              <SignInButton>Login</SignInButton>
            </Button>
            <Button className="ml-2">
              <SignUpButton>Register</SignUpButton>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/">Log out</UserButton>
          </SignedIn>
        </div>
      </nav>
      <section className="p-2 flex flex-col items-center justify-center mt-24">
        <h2 className="text-center text-5xl font-bold">
          Try all
          <span className="text-blue-600"> Ai assistance </span>
          in one place!
        </h2>
        <p className="text-center mt-5 text-zinc-700">
          Wall-e allows you to use the power of Artificial Intelligence all in
          one convenient location.
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/wall-e"
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            {/* <Image
              src="/"
              alt="uploading preview"
              width={1419}
              height={732}
              quality={100}
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
            /> */}
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="p-2 mx-auto mb-24 mt-24">
        <div className="mb-12 px-6">
          <div className="mx-auto text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 ">
              Start using in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Using all ai in the same time has never been easier than with
              Wall-e.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">
                Enter your information
              </span>
              <span className="mt-2 text-zinc-700">
                Either starting account or create account.
                <Link
                  href="/sign-up"
                  className="text-blue-700 underline underline-offset-2"
                >
                  create account
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">
                Chose your ai assistant
              </span>
              <span className="mt-2 text-zinc-700">
                We have a lot of ai to chose from, pick one based on your need
                and get started.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">
                Start writing prompts
              </span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try out Wall-e today - it really takes
                less than a minute.
              </span>
            </div>
          </li>
        </ol>
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            {/* <Image
              src="/her1.jpg"
              alt="uploading preview"
              width={1419}
              height={732}
              quality={100}
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
