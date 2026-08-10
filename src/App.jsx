import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { useAuth } from './lib/auth'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemePicker from './components/ThemePicker'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import Landing from './pages/Landing'
import Build from './pages/Build'
import Editor from './pages/Editor'
import Dashboard from './pages/Dashboard'
import GeneratedPortfolio from './pages/GeneratedPortfolio'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Services />
      <Faq />
      <Contact />
      <Footer />
    </>
  )
}

// Builder pages require a signed-in user — otherwise bounce to the landing page.
function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loading">Loading…</div>
  if (!user) return <Navigate to="/" replace />
  return children
}

// Scroll to top on route change (but leave in-page hash scrolling alone).
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <ThemePicker />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sadiq" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/build" element={<RequireAuth><Build /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/editor" element={<RequireAuth><Editor /></RequireAuth>} />
        <Route path="/me" element={<RequireAuth><GeneratedPortfolio /></RequireAuth>} />
        <Route path="/p/:id" element={<GeneratedPortfolio />} />
      </Routes>
      <Analytics />
    </>
  )
}
