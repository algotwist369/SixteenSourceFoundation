import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import GetInvolved from "./pages/GetInvolved";
import Volunteer from "./pages/Volunteer";
import Impact from "./pages/Impact";
// import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-16">
        {/* pt-16 = space for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetails />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/impact" element={<Impact />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
