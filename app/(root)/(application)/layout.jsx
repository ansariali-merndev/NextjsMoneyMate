import { Aside } from "@/components/block/Aside";

export default function BaseLayout({ children }) {
  return (
    <section className="md:flex md:gap-6">
      <aside className="hidden md:block">
        <Aside />
      </aside>
      {children}
    </section>
  );
}
