"use client";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // read token to identify user role
      const token = response.data.token;
      toast.success("Login Success");
      verifyUser(token);
    } catch (error: any) {
      console.log("error", error.response.data.message);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const verifyUser = async (token: any) => {
    try {
      const TokenData = await axios.post("/api/users/verifyuser", {token: token});
      const role = TokenData.data.data.role
      if (role === "admin") {
        router.push('/admin/home')        
      }
      else if(role === "user") {
        router.push('/user')
      }
      else {
        toast.error("Invalid user role")
      }
    } catch (error: any) {
      console.log("error", error.response.data.message);
    }
  };

  return (
    <div className="flex items-center h-screen">
      <div>
        <Toaster />
      </div>
      <Card className="max-w-sm m-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@gmail.com"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="tel:+94 76 880 3755"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-5" onClick={signUp}>
              {loading ? "Loading" : "Login"}
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
