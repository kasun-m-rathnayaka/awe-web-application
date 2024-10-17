"use client";
import Link from "next/link";
import { motion } from "framer-motion";
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
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { CircleX } from "lucide-react";

interface AddFormProps {
  setOpen: (open: boolean) => void;
  userId: string;
}

const VerifyForm: React.FC<AddFormProps> = ({ setOpen,userId }) => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({
    userId: userId,
    ammount: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/users/verifyuser/`, task);
      toast.success("Verify Successful");
      setLoading(false)
    } catch (error:any) {
      console.log("error", error.response);
      toast.error(error.response.data.message)
      setLoading(false)
    }
  };

  return (
    <motion.div
      className="static"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="z-10 fixed top-[105px] right-[24px] flex items-center">
        <div>
          <Toaster />
        </div>
        <Card className="mx-auto max-w-sm cursor-pointer">
        <CircleX className="mt-2 ml-2" onClick={()=>setOpen(false)} />
          <CardHeader>
            <CardTitle className="text-xl">Set a DEMO Number</CardTitle>
            <CardDescription>Enter a unique number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="id">DEMO number</Label>
                  <Input
                    id="id"
                    placeholder="DEMO101"
                    onChange={(e) =>
                      setTask({ ...task, ammount: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? "Processing ..." : "Verify User"}
            </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default VerifyForm;
