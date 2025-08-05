import Image from "next/image";
import auth from "../../assets/auth.png";

export const metadata = {
  title: "Authentication",
};

export default function AuthLayout({ children }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-12">
      <div className="flex justify-center items-center">{children}</div>
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-center w-[500px] py-8 px-4">
          <Image
            src={auth}
            alt="Auth Images"
            style={{ height: "auto", width: "auto" }}
            priority={true}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
