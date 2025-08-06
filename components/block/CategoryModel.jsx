"use client";

import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import { useUserContext } from "@/context/UserContext";
import { AddCategories } from "@/app/action/AddUserCategories";

export const CategoryModel = () => {
  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const { setCategories, user } = useUserContext();
  const [formdata, setFormdata] = useState({
    name: "",
    type: "",
    emoji: "💸",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmoji = (emoji) => {
    setFormdata((prev) => ({ ...prev, emoji }));
    setShowPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((formdata.emoji === "" || formdata.name === "", formdata.type === "")) {
      return Swal.fire({
        icon: "warning",
        title: "Something went wrong",
        text: "Please Select Emoji, Category Name or Category Type",
      });
    }

    await AddCategories(formdata, user?.email);
    setCategories((prev) => [...prev, formdata]);
    setFormdata({ name: "", type: "", emoji: "💸" });
    setOpen(false);
  };

  return (
    <div>
      {/* Handle Event Model */}
      <Button
        onClick={() => setOpen(true)}
        variant={"destructive"}
        className={"cursor-pointer"}
      >
        Add Category
      </Button>

      {/* Handle Model Opacity*/}
      <div
        onClick={() => setOpen(false)}
        className={`fixed bg-black inset-0 transform transition-opacity z-20 duration-200 ${
          open ? "opacity-30" : "opacity-0 hidden"
        }`}
      ></div>

      {/* Toggle Model */}

      {open && (
        <form
          onSubmit={handleSubmit}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-[90%] max-w-md bg-white p-6 rounded-md border border-rose-300 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Add Category
          </h2>

          {/* Emoji */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Category Emoji
            </label>

            <input
              onClick={() => setShowPicker(true)}
              type="text"
              name="emoji"
              value={formdata.emoji}
              readOnly
              placeholder="Pick an emoji"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer"
            />
            {showPicker && (
              <div className="absolute">
                <EmojiPicker onEmojiClick={(data) => handleEmoji(data.emoji)} />
              </div>
            )}
          </div>

          {/* Category Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleOnchange}
              placeholder="Enter category name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-200"
            />
          </div>

          {/* Category Type */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Category Type
            </label>
            <select
              name="type"
              value={formdata.type}
              onChange={handleOnchange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-200"
            >
              <option value="">Select Category Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
