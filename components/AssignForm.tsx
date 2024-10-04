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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
interface AddFormProps {
  setOpenAssign: (open: boolean) => void;
  id: any;
}

const AssignForm = ({ setOpenAssign, id }: AddFormProps) => {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [task, setTask] = useState({
    writer: "",
    description: "",
    deadline: "",
    payment: "",
    status: "",
  });
  const handleCheck = async (value: string) => {
    try {
      if (task.writer.length > 3) {
        const response = await axios.get(`/api/users/user/${value}`);
        setChecking(false);
      }
    } catch (error: any) {
      console.log("error", error.response);
      toast.error(error.response.data.message);
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/job/${id}`, task);
      toast.success("Task assigned successfully");
      setLoading(false);
    } catch (error: any) {
      console.log("error", error.response);
      // toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleValueChange = (value: any) => {
    setTask({ ...task, status: value });
  };

  return (
    <div className="z-10 absolute top-[104px] right-6 flex items-center">
      <div>
        <Toaster />
      </div>
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-xl">Assign a new Task</CardTitle>
          <CardDescription>
            Assign new jobs and Tasks to writers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="last-name">
                  Writer
                  {task.writer.length > 3 ? (
                    checking == true ? (
                      <span className="pl-5 text-red-400 text-sm">
                        checking ...
                      </span>
                    ) : (
                      <span className="pl-5 text-green-400 text-sm">
                        wirter-found
                      </span>
                    )
                  ) : (
                    ""
                  )}
                </Label>
                <Input
                  id="writer"
                  placeholder="Demo1001"
                  onChange={(e) => {
                    setTask({ ...task, writer: e.target.value });
                    setChecking(true);
                    handleCheck(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="id">Description</Label>
                <Input
                  id="id"
                  placeholder="Nature of the Task"
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="phone-number">Deadline</Label>
                <Input
                  type="date"
                  id="phone-number"
                  onChange={(e) =>
                    setTask({ ...task, deadline: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="first-name">Payment</Label>
                <Input
                  id="first-name"
                  type="number"
                  placeholder="2000"
                  onChange={(e) =>
                    setTask({ ...task, payment: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Status</Label>
              <Select onValueChange={handleValueChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Amendment">Amendment</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="Attention">Attention</SelectItem>
                    <SelectItem value="Returned">Returned</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {loading ? "Processing" : "Assign an new Task"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignForm;
