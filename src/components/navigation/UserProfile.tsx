// components/UserProfile.tsx
import { CircleUserRound } from "lucide-react";

type UserProfileProps = {
  name: string;
};

export default function UserProfile({ name }: UserProfileProps) {
  return (
    <div
      className="flex pr-10  h-10 transition-all space-y-2 duration-200 font-cairo rounded-full bg-gradient-to-l from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-600 hover:from-green-400 hover:to-greeen-400 backdrop-blur-sm 
                border-gray-950/10 dark:border-gray-950/100 focus:border-green-400 dark:focus:border-green-500 
                 focus:ring-2 focus:ring-blue-200/50 dark:focus:ring-green-800/50  dark:hover:from-gray-100 
                 placeholder:text-slate-500 dark:placeholder:text-slate-500"


    >
      <CircleUserRound className="h-6 w-6 mt-2 absolute inset-y-0 right-2   text-gray-900  dark:text-green-400" />
      
      <span className="font-cairo    text-green- mt-2   dark:text-green-400  ">{name}</span>
    </div>
  );
}