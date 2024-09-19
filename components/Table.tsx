import React from "react";
import {
  MoreHorizontal,
  NotebookText,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

interface TableComponentProps {
  titles: string[];
}

const TableComponent: React.FC<TableComponentProps> = ({ titles }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            {titles.map((title,i) => (
              <TableHead key={i}>{title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="hidden sm:table-cell">
            <NotebookText />
            </TableCell>
            <TableCell className="font-medium">
              Laser Lemonade Machine
            </TableCell>
            <TableCell>
              <Badge variant="outline">Draft</Badge>
            </TableCell>
            <TableCell>$499.99</TableCell>
            <TableCell className="hidden md:table-cell">25</TableCell>
            <TableCell className="hidden md:table-cell">
              2023-07-12 10:42 AM
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
