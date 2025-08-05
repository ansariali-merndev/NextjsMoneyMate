import Link from "next/link";
import { Button } from "../ui/button";

export const Submit = ({ isLogin, isPending }) => {
  return (
    <div>
      <Button
        disabled={isPending}
        className={`w-full ${
          isPending ? "cursor-not-allowed" : "cursor-pointer"
        } `}
        variant={"destructive"}
      >
        Submit
      </Button>
      <p className="text-center text-sm">
        {isLogin ? "Don't have an account " : "Already have an account "}
        <Link
          className="text-blue-600 font-bold"
          href={isLogin ? "/register" : "login"}
        >
          {!isLogin ? "Sign In" : "Create Account"}
        </Link>
      </p>
    </div>
  );
};
