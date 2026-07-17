import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import StarsBackground from "./components/StarsBackground";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import About from "./components/About";
import Achievements from "./components/Achievements";
import Leadership from "./components/Leadership";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import ToolStack from "./components/ToolStack";
import Skills from "./components/Skills";
import PortfolioAccess from "./components/PortfolioAccess";
import DeveloperNote from "./components/DeveloperNote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <SmoothScroll />
      <LoadingScreen />
      <StarsBackground />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <Leadership />
      <Experience />
      <Projects />
      <TechStack />
      <ToolStack />
      <Skills />
      <PortfolioAccess />
      <DeveloperNote />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
