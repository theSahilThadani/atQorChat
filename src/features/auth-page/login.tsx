"use client";
import { AI_NAME } from "@/features/theme/theme-config";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface LoginProps {
  isDevMode: boolean;
}

export const LogIn: FC<LoginProps> = (props) => {
  return (
    <Card className="flex gap-2 flex-col min-w-[500px] -m-6 p-12 dark:bg-zinc-950">
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl flex gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={"ai-icon.png"} />
          </Avatar>
          <span className="">{AI_NAME}</span>
        </CardTitle>
        <CardDescription>
          Login in with your Microsoft 365 & Google account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <Button onClick={() => signIn("github")}>GitHub</Button> */}
        <button onClick={() => signIn("google")} className="flex gap-8 text-gray-900 bg-white border border-sky-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  rounded-lg text-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        <img src="https://assets.website-files.com/6202a113c8523a5dad32ca06/6332f4e3bf337d7e30fc00ee_google.svg" loading="lazy" alt="" />
          Continue with Google</button>
          <button onClick={() => signIn("azure-ad")} className="flex items-center gap-10 text-gray-900 bg-white border border-sky-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path d="M11.5216 0.5H0V11.9067H11.5216V0.5Z" fill="#f25022"></path>
                  <path d="M24.2418 0.5H12.7202V11.9067H24.2418V0.5Z" fill="#7fba00"></path>
                  <path d="M11.5216 13.0933H0V24.5H11.5216V13.0933Z" fill="#00a4ef"></path>
                  <path d="M24.2418 13.0933H12.7202V24.5H24.2418V13.0933Z" fill="#ffb900"></path>
                </svg>
                Microsoft 365
            </button>
      
      </CardContent>
    </Card>
  );
};
