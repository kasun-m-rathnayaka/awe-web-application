"use client";
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
import VerifyForm from "./VerifyForm";

interface TableComponentProps {
  titles: string[];
  data: {
    _id: string;
    firstname: string;
    lastname: string;
    nationalid: string;
    whatsappnumber: string;
    address: string;
    email: string;
    verifyed: boolean;
    role: string;
  }[];
  handleDelete: (id: any) => void;
  handleClick: (id: any) => void;
}

const UserTable: React.FC<TableComponentProps> = ({
  titles,
  data,
  handleDelete,
  handleClick,
}) => {
  const [open, setOpen] = React.useState(false);
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
          {data.map((item) => (
            <TableRow
              key={item._id}
              onClick={() => handleClick(item._id)}
              className=" cursor-pointer"
            >
              {open && <VerifyForm setOpen={setOpen} userId={item._id} />}
              <TableCell className="hidden sm:table-cell">
                <NotebookText />
              </TableCell>
              <TableCell className="font-medium">{item.firstname}</TableCell>
              <TableCell>{item.lastname}</TableCell>
              <TableCell>{item.nationalid}</TableCell>
              <TableCell className="hidden md:table-cell">
                {item.whatsappnumber}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.email}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant={"outline"}>
                  {item.verifyed ? "Verified" : "Not Verified"}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant={"outline"}>{item.role}</Badge>
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
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                      Verify
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleDelete(item._id)}>
                      Delete
                    </DropdownMenuItem>
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

export default UserTable;
