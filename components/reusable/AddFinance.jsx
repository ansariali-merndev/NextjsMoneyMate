"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export const AddFinance = ({ income }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)} className={"cursor-pointer"}>
        Add {income ? "Income" : "Expense"}
      </Button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black z-30 transform transition-opacity duration-200 ${
          open ? "opacity-30" : "opacity-0 hidden"
        }`}
      ></div>
    </div>
  );
};
