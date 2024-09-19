import React from "react";
import { MoreHorizontal, NotebookText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  data: {
    _id: string;
    name: string;
    writer: string;
    description: string;
    deadline: string;
    payment: string;
    paid: string;
    status: string;
    employer: string;
  }[];
}

const TableComponent: React.FC<TableComponentProps> = ({ titles, data }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            {titles.map((title, i) => (
              <TableHead key={i}>{title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={item._id}>
              <TableCell className="hidden sm:table-cell">
                <NotebookText />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.writer}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(item.deadline).toDateString()}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.payment}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.paid}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant={"outline"}>{item.payment}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.employer}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
