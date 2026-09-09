import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Splash from "./components/Splash";
import Header, { type Tab } from "./components/Header";
import Home from "./components/Home";
import Practice from "./components/Practice";
import Cbt from "./components/Cbt";
import Resources from "./components/Resources";
import Discussions from "./components/Discussions";
import Footer from "./components/Footer";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [tab, setTab] = useState<Tab>("home");

  return (
    <ThemeProvider>
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      <div
        className={`min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100 ${
          showSplash ? "opacity-0" : "animate-fade-in opacity-100"
        }`}
      >
        <Header active={tab} onNavigate={setTab} />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {tab === "home" && <Home onNavigate={setTab} />}
          {tab === "practice" && <Practice />}
          {tab === "cbt" && <Cbt />}
          {tab === "resources" && <Resources />}
          {tab === "discussions" && <Discussions />}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
