import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toolLinks } from "@/constants";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={false} />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-6">
          {toolLinks.map((tool) => (
            <div
              key={tool.title}
              className="text-2xl border-2 border-white p-5 flex justify-center rounded-2xl shadow-md
              shadow-white hover:scale-110 hover:transition-scale hover:duration-200
              hover:text-blue-400 hover:border-blue-400 hover:shadow-blue-400"
            >
              <a href={tool.link}>{tool.title}</a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
