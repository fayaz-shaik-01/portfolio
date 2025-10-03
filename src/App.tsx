import Header from './components/Header';
import Learn from './components/Learn';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <Hero />
                <Projects />
                <Experience />
                <Skills />
                <Contact />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/portfolio/"
          element={
            <>
              <main>
                <Hero />
                <Projects />
                <Experience />
                <Skills />
                <Contact />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/portfolio/learn" element={<Learn />} />
      </Routes>
    </div>
  );
}

export default App;
