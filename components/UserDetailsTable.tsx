"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import PayForm from "./PayForm";
import axios from "axios";

const UserDetailsTable = ({ projects, userId }: { projects: any[]; userId: string; }) => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  console.log(projects)
  interface Project {
    name: string;
    description: string;
    deadline: string;
    payment: number;
    paid: number;
    status: string;
    employer: string;
  }
  
  const handlePay = (project: Project) => {
    setProjectName(project.name);
    setOpen(true);
  };

  const handleDelete = () => {
    try {
      axios.delete(`/api/tasks/${userId}`).then((res) => {
        console.log(res);
      });
    } catch (error: any) {
      console.log("error", error.response);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Ongoing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {open && <PayForm setOpen={setOpen} project={projectName} userId={userId}/>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => {
                console.log(project);
                return (
                  <TableRow key={index}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{project.deadline}</TableCell>
                    <TableCell>Rs.{project.payment.toFixed(2)}</TableCell>
                    <TableCell>Rs.{project.paid.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          project.status == "close"
                            ? "bg-green-200"
                            : "bg-red-200"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.employer}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={()=>handlePay(project)}>
                            Pay
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={handleDelete}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsTable;
