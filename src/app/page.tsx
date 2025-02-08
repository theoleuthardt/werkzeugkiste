import Navbar from "../components/Navbar";
import { toolLinks } from "@/constants";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-black text-white font-noto flex flex-col items-center">
      <Navbar renderHomeLink={false} />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
          {toolLinks.map((tool) => (
            <div
              key={tool.title}
              className="border-2 border-white p-3 flex justify-center rounded-2xl"
            >
              <a href={tool.link}>{tool.title}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
