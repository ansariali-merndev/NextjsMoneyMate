import { Aside } from "@/components/block/Aside";

export default function BaseLayout({ children }) {
  return (
    <section className="md:flex md:gap-6">
      <aside className="hidden md:block">
        <Aside />
      </aside>
      <div className="w-full">{children}</div>
    </section>
  );
}
