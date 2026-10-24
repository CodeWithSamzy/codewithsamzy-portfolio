import { useEffect, useRef, useState } from 'react'
import { experience, featuredProjects, profile, projects } from './data'
import type { Project } from './data'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  GlobeIcon,
  MenuIcon,
} from './icons'
import CaseStudy from './components/CaseStudy'
import ProjectVisual from './components/ProjectVisual'
import StackStudy from './components/StackStudy'

function projectFromLocation() {
  const hash = window.location.hash
  return hash.startsWith('#project/')
    ? (projects.find((project) => project.id === hash.slice(9)) ?? null)
    : null
}

function LagosClock() {
  const formatTime = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).format(new Date())
  const [time, setTime] = useState(formatTime)
  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 30_000)
    return () => clearInterval(interval)
  }, [])
  return (
    <span className="lagos-clock">
      <GlobeIcon />
      <span>
        LAGOS, NG <time>{time}</time> WAT
      </span>
    </span>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(projectFromLocation)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const projectTrigger = useRef<HTMLButtonElement | null>(null)
  const menuTrigger = useRef<HTMLButtonElement | null>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const onLocation = () => setSelectedProject(projectFromLocation())
    window.addEventListener('hashchange', onLocation)
    window.addEventListener('popstate', onLocation)
    return () => {
      window.removeEventListener('hashchange', onLocation)
      window.removeEventListener('popstate', onLocation)
      clearTimeout(copyTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const mobileNavigation = window.matchMedia('(max-width: 48rem)')
    const onBreakpoint = () => setMenuOpen(false)
    const onOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuTrigger.current?.closest('header')?.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuTrigger.current?.focus()
      }
    }
    mobileNavigation.addEventListener('change', onBreakpoint)
    document.addEventListener('pointerdown', onOutsidePress)
    document.addEventListener('keydown', onKey)
    return () => {
      mobileNavigation.removeEventListener('change', onBreakpoint)
      document.removeEventListener('pointerdown', onOutsidePress)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  function openProject(project: Project, trigger: HTMLButtonElement) {
    projectTrigger.current = trigger
    history.pushState(null, '', `#project/${project.id}`)
    setSelectedProject(project)
  }

  function closeProject() {
    history.replaceState(null, '', `${location.pathname}${location.search}#work`)
    setSelectedProject(null)
    requestAnimationFrame(() => {
      if (projectTrigger.current) {
        projectTrigger.current.focus({ preventScroll: true })
      } else {
        const heading = document.getElementById('work-title')
        heading?.scrollIntoView({ behavior: 'instant', block: 'start' })
        heading?.focus({ preventScroll: true })
      }
    })
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyState('idle'), 2500)
  }

  const archive = projects.slice(4)
  const visibleArchive = showAllProjects ? archive : archive.slice(0, 3)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <header
        className="site-header"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
        }}
      >
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Kazeem Samod, back to top">
            <span className="wordmark-symbol" aria-hidden="true">
              c<span>.</span>
            </span>
            <span>
              Kazeem Samod<small>FULL-STACK ENGINEER</small>
            </span>
          </a>
          <nav id="site-nav" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <a href="#work" onClick={() => setMenuOpen(false)}>
              Work<span>01</span>
            </a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>
              Approach<span>02</span>
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About<span>03</span>
            </a>
            <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
              Let’s talk <ArrowUpRight />
            </a>
          </nav>
          <button
            ref={menuTrigger}
            className="menu-toggle icon-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="availability-dot" />
              <span>FULL-STACK ENGINEER</span>
            </div>
            <h1 id="hero-title">
              Good software.
              <br />
              <span>Every layer.</span>
            </h1>
            <p className="hero-description">
              I’m <strong>{profile.alias}</strong>, a software engineer in Lagos.
              <br className="desktop-break" /> I build web products from the interface to the database, with
              care for everything in between.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Explore my work <ArrowDown />
              </a>
              <a
                className="text-link resume-link"
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                View résumé <ArrowUpRight />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="hand-drawn-arrow" aria-hidden="true">
                ↳
              </span>
              <span>
                5+ years building for the web.
                <br />
                Still curious. Still shipping.
              </span>
            </div>
          </div>
          <StackStudy />
        </section>

        <div className="status-strip container">
          <span>
            <i className="availability-dot" /> OPEN TO FULL-STACK & SOFTWARE ENGINEERING ROLES
          </span>
          <LagosClock />
        </div>

        <section id="work" className="work-section container section" aria-labelledby="work-title">
          <div className="section-kicker">
            <span>01 / SELECTED WORK</span>
            <span>IDEA → INTERFACE → PRODUCTION</span>
          </div>
          <div className="section-heading">
            <h2 id="work-title" tabIndex={-1}>
              Less talk.
              <br className="mobile-break" /> More shipped.
            </h2>
            <p>
              A selection of products I’ve built. <br />
              The interface, and what’s behind it.
            </p>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <article className={`project-card project-${project.id}`} key={project.id}>
                <button
                  type="button"
                  className="project-art-button"
                  onClick={(event) => openProject(project, event.currentTarget)}
                  aria-label={`Read ${project.name} case study`}
                >
                  <div className="project-visual">
                    <ProjectVisual id={project.id} />
                  </div>
                  <span className="project-open-label">
                    Inside the build <ArrowUpRight />
                  </span>
                </button>
                <div className="project-card-meta">
                  <span className="small-label">{project.category}</span>
                  <span className="project-number">0{index + 1}</span>
                </div>
                <div className="project-title-row">
                  <h3>
                    <button type="button" onClick={(event) => openProject(project, event.currentTarget)}>
                      {project.name}
                    </button>
                  </h3>
                  <ArrowUpRight />
                </div>
                <p>{project.description}</p>
                <ul className="project-technologies">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="archive-heading">
            <h3>A few more builds.</h3>
            <span className="small-label">TOOLS, EXPERIMENTS & EVERYTHING BETWEEN</span>
          </div>
          <div className="project-archive" id="project-archive">
            {visibleArchive.map((project) => (
              <button
                className="archive-row"
                type="button"
                key={project.id}
                onClick={(event) => openProject(project, event.currentTarget)}
              >
                <span className="archive-name">{project.name}</span>
                <span className="archive-category">{project.category.toLowerCase()}</span>
                <span className="archive-stack">{project.stack.slice(0, 3).join(' / ')}</span>
                <ArrowUpRight />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="archive-toggle text-link"
            aria-expanded={showAllProjects}
            aria-controls="project-archive"
            onClick={() => setShowAllProjects((all) => !all)}
          >
            {showAllProjects ? 'Show fewer projects' : `See all ${projects.length} projects`}
            <span aria-hidden="true">{showAllProjects ? '−' : '+'}</span>
          </button>
        </section>

        <section id="approach" className="approach-section section" aria-labelledby="approach-title">
          <div className="container">
            <div className="section-kicker">
              <span>02 / HOW I WORK</span>
              <span>THE DETAILS ADD UP.</span>
            </div>
            <div className="section-heading">
              <h2 id="approach-title">
                From the first click
                <br />
                <span className="serif-text">to the edge cases.</span>
              </h2>
              <p>
                Writing code is part of it. <br />
                Making the pieces work together is the work.
              </p>
            </div>
            <div className="principles-grid">
              <article>
                <span className="principle-number">
                  01<span>/</span>
                </span>
                <h3>Start with the person.</h3>
                <p>
                  A clear flow. A useful empty state. An error that helps. I care about how the interface
                  behaves when someone actually uses it.
                </p>
                <span className="principle-tools">REACT · NEXT.JS · TYPESCRIPT</span>
              </article>
              <article>
                <span className="principle-number">
                  02<span>/</span>
                </span>
                <h3>Think past the screen.</h3>
                <p>
                  Who can access this record? What happens if this request fails? I work through the data and
                  the boundaries behind the interface.
                </p>
                <span className="principle-tools">NODE.JS · PYTHON · POSTGRESQL</span>
              </article>
              <article>
                <span className="principle-number">
                  03<span>/</span>
                </span>
                <h3>See it through.</h3>
                <p>
                  Integrations, tests, deployment, and the bugs that only appear when it all connects. Getting
                  it into use is part of the build.
                </p>
                <span className="principle-tools">GIT · DOCKER · AUTOMATED TESTS</span>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="about-section container section" aria-labelledby="about-title">
          <div className="section-kicker">
            <span>03 / THE PERSON BEHIND THE CODE</span>
            <span>LAGOS, NIGERIA</span>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <h2 id="about-title">
                Engineer.
                <br />
                Builder.
                <br />
                <span className="serif-text">Always a student.</span>
              </h2>
              <p>
                I’m Kazeem Samod, the engineer behind {profile.alias}. I’ve been building for the web since
                2020, from responsive frontends to products with their own APIs, databases, and payment flows.
              </p>
              <p>
                I work independently and with teams, taking projects from a rough problem to something people
                can use. Alongside that work, I’m studying Physics at Lagos State University.
              </p>
              <div className="security-note">
                <span className="note-marker" aria-hidden="true">
                  ↳
                </span>
                <div>
                  <h3>Security is part of how I build.</h3>
                  <p>
                    My background in application security informs how I handle authentication, access, and
                    data. I’m also an ISO/IEC 27001:2022 Lead Auditor.
                  </p>
                  <a
                    className="text-link"
                    href={profile.credentials}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View credentials <ArrowUpRight />
                  </a>
                </div>
              </div>
              <a className="text-link about-cv" href={profile.resume} download>
                Download my résumé <ArrowDown />
              </a>
            </div>
            <div className="experience">
              <span className="small-label">THE PATH SO FAR</span>
              {experience.map((item) => (
                <article className="experience-item" key={item.company}>
                  <span className="experience-period">{item.period}</span>
                  <h3>{item.role}</h3>
                  <span className="experience-company">{item.company}</span>
                  <p>{item.description}</p>
                </article>
              ))}
              <div className="education-note">
                <span className="small-label">ALSO ON THE GO</span>
                <p>
                  B.Sc. Physics <span>↗</span>
                </p>
                <span>Lagos State University · 2023 — present</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section" aria-labelledby="contact-title">
          <div className="container">
            <div className="section-kicker">
              <span>04 / START A CONVERSATION</span>
              <span>
                <i className="availability-dot" /> OPEN TO OPPORTUNITIES
              </span>
            </div>
            <div className="contact-top">
              <h2 id="contact-title">
                Good things start
                <br />
                <span className="serif-text">with a conversation.</span>
              </h2>
              <a className="contact-arrow" href={`mailto:${profile.email}`} aria-label="Email Kazeem Samod">
                <ArrowUpRight />
              </a>
            </div>
            <p className="contact-description">
              A role, a project, or something interesting you’re building.
              <br />
              I’d like to hear about it.
            </p>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                type="button"
                className="copy-email"
                onClick={copyEmail}
                aria-label={copyState === 'copied' ? 'Email address copied' : 'Copy email address'}
              >
                {copyState === 'copied' ? <CheckIcon /> : <CopyIcon />}
                <span>{copyState === 'copied' ? 'Copied' : 'Copy email'}</span>
              </button>
            </div>
            <span className="copy-status" role="status">
              {copyState === 'failed'
                ? 'Copy unavailable. You can select the email address above.'
                : copyState === 'copied'
                  ? 'Email copied to clipboard.'
                  : ''}
            </span>
            <div className="contact-links">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight />
              </a>
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                X / Twitter <ArrowUpRight />
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                Résumé <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <span>© 2026 Kazeem Samod</span>
        <span className="footer-signature">Thanks for stopping by.</span>
        <a href="#top">
          Back to top <ArrowRight />
        </a>
      </footer>
      <CaseStudy key={selectedProject?.id ?? 'closed'} project={selectedProject} onClose={closeProject} />
    </>
  )
}
