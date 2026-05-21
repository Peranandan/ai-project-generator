import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";

import "./App.css";
import "./markdown.css";

export default function App() {

  return (

    <div className="app-layout">

      {/* BACKGROUND EFFECTS */}

      <div className="bg-blur blur-one"></div>

      <div className="bg-blur blur-two"></div>

      {/* NAVBAR */}

      <Navbar />

      {/* MAIN CONTENT */}

      <main className="main-content">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/blogs"
            element={<Blogs />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/privacy"
            element={<Privacy />}
          />

          <Route
            path="/terms"
            element={<Terms />}
          />

          <Route
            path="/disclaimer"
            element={<Disclaimer />}
          />

        </Routes>

      </main>

      {/* FOOTER */}

      <Footer />

    </div>
  );
}