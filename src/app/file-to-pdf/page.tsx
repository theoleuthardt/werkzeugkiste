import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={true} />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-white mb-16">file-to-pdf</h2>
        <input type="file" className="bg-gray-800 text-white p-2 rounded-lg" />
        <Button content="convert" className="text-" />
      </div>
      <Footer />
    </div>
  );
}
