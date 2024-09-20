"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Home,
  PencilRuler,
  Power,
} from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
  const handleLogout = async() => {
    try {
        await axios.get('/api/users/logout')
        toast.success('Logout Success')
        router.push('/login')
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  return (
    <div>
      <Toaster />
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/admin/home"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
                  <Home className="h-5 w-5" />
            <span className="sr-only">AWE</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/writer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <PencilRuler />
                  <span className="sr-only">Writer</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Writers</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={handleLogout}
                  className=" cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Power className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      {children}
    </div>
  );
};

export default Layout;
