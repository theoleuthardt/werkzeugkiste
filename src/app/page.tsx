import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-black text-white font-noto">
      <Navbar renderHomeLink={false} />
    </div>
  );
}
