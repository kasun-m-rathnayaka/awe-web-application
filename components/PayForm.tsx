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
}

const PayForm: React.FC<AddFormProps> = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({
    id: "",
    ammount: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/tasks", task);
      console.log("Task added successfully", response.data);
      toast.success("Task added successfully");
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
      <div className="z-10 absolute top-[299px] right-[53px] flex items-center">
        <div>
          <Toaster />
        </div>
        <Card className="mx-auto max-w-sm cursor-pointer" onClick={()=>setOpen(false)}>
        <CircleX className="mt-2 ml-2" />
          <CardHeader>
            <CardTitle className="text-xl">Confirm your payment</CardTitle>
            <CardDescription>Enter Payment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="id">Ammount</Label>
                  <Input
                    id="id"
                    placeholder="1000"
                    onChange={(e) =>
                      setTask({ ...task, ammount: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? "Processing ..." : "Complete Payment"}
            </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default PayForm;
