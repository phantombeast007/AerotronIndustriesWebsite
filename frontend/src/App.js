import React from "react";
import "@/App.css";
import { Toaster } from "sonner";
import Nav from "./components/site/Nav";
import Hero from "./components/site/Hero";
import Marquee from "./components/site/Marquee";
import Capabilities from "./components/site/Capabilities";
import Products from "./components/site/Products";
import Industries from "./components/site/Industries";
import About from "./components/site/About";
import Contact from "./components/site/Contact";
import Footer from "./components/site/Footer";

function App() {
  return (
    <div className="App min-h-screen bg-white text-slate-950">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Capabilities />
        <Products />
        <Industries />
        <About />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors theme="light" />
    </div>
  );
}

export default App;
