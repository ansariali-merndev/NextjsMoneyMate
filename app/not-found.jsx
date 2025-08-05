"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleCTA = () => {
    router.back();
  };
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-purple-600">404</h1>
      <h2 className="text-2xl mt-2 font-semibold">Page Not Found</h2>
      <p className="text-gray-600">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 space-x-4">
        <Link className="" href={"/"}>
          <button className="btn">Go Home </button>
        </Link>

        <button onClick={handleCTA} className="btn">
          Go Back
        </button>
      </div>
    </section>
  );
}
