import React from "react";
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

interface Project {
  name: string;
  description: string;
  deadline: string;
  payment: number;
  paid: number;
  status: string;
  employer: string;
}

const UserDetailsTable = ({ projects }: { projects: Project[] }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Ongoing Projects</CardTitle>
        </CardHeader>
        <CardContent>
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
              {projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.deadline}</TableCell>
                  <TableCell>${project.payment.toFixed(2)}</TableCell>
                  <TableCell>${project.paid.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.status}</Badge>
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
                        <DropdownMenuItem>Pay</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsTable;
