import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center my-20">
      <h2 className="text-2xl md:text-4xl lg:text-6xl font-extrabold capitalize bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Take control of your finances
      </h2>
      <p className="text-gray-600 text-center text-xs md:text-sm lg:text-xl max-w-2xl mt-2">
        Your foundation for secure, intelligent financial management.
        Effortlessly track your income and expenses to achieve your financial
        goals.
      </p>
      <Link href={"/dashboard"}>
        <Button
          variant={"destructive"}
          className={"cursor-pointer flex justify-center items-center mt-12"}
        >
          Start Tracking Now <HiArrowNarrowRight />
        </Button>
      </Link>
    </main>
  );
}
