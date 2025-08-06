"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import EmojiPicker from "emoji-picker-react";
import { useUserContext } from "@/context/UserContext";
import Swal from "sweetalert2";
import { addFinanceData, getUserFinance } from "@/app/action/FinanceAction";

export const AddFinance = ({ income }) => {
  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [filter, setFilter] = useState([]);
  const { categories, setExpenseData, setIncomeData, user } = useUserContext();
  const [formdata, setFormdata] = useState({
    emoji: "💸",
    amount: "",
    type: "",
  });

  useEffect(() => {
    const func = async () => {
      const res = await getUserFinance(user.email);
      console.log(res);
    };
    func();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formdata.amount === "" ||
      formdata.emoji === "" ||
      formdata.type === ""
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Oops! Something went wrong",
        text: "Amount or Category Type cannot be empty",
      });
    }

    if (income) {
      setIncomeData((prev) => [...prev, formdata]);
    } else {
      setExpenseData((prev) => [...prev, formdata]);
    }
    setOpen(false);

    const res = await addFinanceData(user.email, income, formdata);
    console.log(res);
    setFormdata((prev) => ({ ...prev, amount: "", type: "" }));
  };

  useEffect(() => {
    const updatedcategory = categories.filter((item) =>
      income ? item.type === "income" : item.type === "expense"
    );
    setFilter(updatedcategory);
  }, [categories]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmoji = (emoji) => {
    setFormdata((prev) => ({ ...prev, emoji: emoji }));
    setShowPicker(false);
  };

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
      {open && (
        <form
          onSubmit={handleSubmit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-gray-100 px-16 py-8 space-y-4 rounded-md "
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <h2 className="text-2xl text-gray-500 font-semibold">
            Add {income ? "Income" : "Expense"} Tracker
          </h2>

          {/* Emoji Picker */}
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

          {/* Amount */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={formdata.amount}
              onChange={handleOnchange}
              placeholder="Enter category name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-200"
            />
          </div>

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
              <option value="">Add {income ? "Income" : "Expense"}</option>
              {filter.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full cursor-pointer">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
