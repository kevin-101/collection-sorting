import Header from "@/components/header";

export default function HomeLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
