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
import moment from "moment";

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
  handleDelete: (id: any) => void;
  handleAssign: (id: any) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  titles,
  data,
  handleDelete,
  handleAssign,
}) => {
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
          {data.map((item, i) => {
            if (item == null) return null;
            return (
              <TableRow key={item._id}>
                <TableCell className="hidden sm:table-cell">
                  <NotebookText />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.writer}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className={`hidden md:table-cell ${
                    item.deadline < moment().format("MMMM Do YYYY, h:mm:ss a")
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                  {moment(item.deadline).fromNow()}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.payment}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.paid}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={"outline"}>{item.status}</Badge>
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
                      <DropdownMenuItem onClick={(e) => handleAssign(item._id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleDelete(item._id)}>
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
    </div>
  );
};

export default TableComponent;
