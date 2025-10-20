import Header from './components/Header';
import Learn from './components/Learn';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-[#0f172a]' : 'bg-white'}`}>
      {/* 🔝 Global Header + Theme Toggle */}
      <Header />
      

      {/* 🔀 App Routes */}
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
        <Route path="/portfolio/learn" element={<Learn isDark={isDark} />} />
      </Routes>
    </div>
  );
}

export default App;
