import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { Project } from '../data'
import { ArrowRight, ArrowUpRight, CheckIcon, CloseIcon, CopyIcon } from '../icons'
import ProjectVisual from './ProjectVisual'

export default function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (!project) return
    const element = dialog.current
    if (!element) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const previousTitle = document.title
    document.title = `${project.name} — Kazeem Samod`
    element.showModal()
    element.scrollTop = 0
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
      document.title = previousTitle
      clearTimeout(timer.current)
    }
  }, [project])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState('idle'), 2500)
  }

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onClose()
  }

  if (!project) return null

  return (
    <dialog
      ref={dialog}
      className="case-dialog"
      aria-labelledby="case-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={onBackdropClick}
    >
      <header className="case-topbar">
        <span className="small-label">A CLOSER LOOK / {project.name.toUpperCase()}</span>
        <button
          type="button"
          className="icon-button"
          aria-label="Close case study"
          onClick={onClose}
          autoFocus
        >
          <CloseIcon />
        </button>
      </header>
      <article className="case-content">
        <div className="case-intro">
          <span className="eyebrow">{project.category}</span>
          <h2 id="case-title">{project.name}</h2>
          <p>{project.description}</p>
        </div>
        <dl className="case-meta">
          <div>
            <dt>MY ROLE</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>PROJECT STATUS</dt>
            <dd>{project.status}</dd>
          </div>
        </dl>
        <figure className="case-figure">
          <div className="project-visual case-visual">
            <ProjectVisual id={project.id} />
          </div>
          {project.visualCaption && <figcaption>{project.visualCaption}</figcaption>}
        </figure>
        <section className="case-section">
          <span className="small-label">01 / THE PROBLEM</span>
          <h3>{project.headline}</h3>
          <p>{project.problem}</p>
        </section>
        <section className="case-section">
          <span className="small-label">02 / UNDER THE SURFACE</span>
          <h3>The decisions behind it.</h3>
          <div className="case-decisions">
            {project.decisions.map((decision, index) => (
              <div key={decision.title}>
                <span className="decision-number">0{index + 1}</span>
                <div>
                  <h4>{decision.title}</h4>
                  <p>{decision.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="case-section case-stack">
          <span className="small-label">03 / HOW IT CONNECTS</span>
          <div className="system-flow">
            {project.flow.map((item, index) => (
              <div className="flow-step" key={item}>
                <span>{item}</span>
                {index < 2 && <ArrowRight />}
              </div>
            ))}
          </div>
          <ul className="tech-list">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.note && <p className="project-note">{project.note}</p>}
        </section>
        <footer className="case-footer">
          {(project.live || project.source) && (
            <div>
              {project.live && (
                <a
                  className="button button-dark"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit project <ArrowUpRight />
                </a>
              )}
              {project.source && (
                <a className="text-link" href={project.source} target="_blank" rel="noopener noreferrer">
                  View source <ArrowUpRight />
                </a>
              )}
            </div>
          )}
          <button className="text-link copy-case" type="button" onClick={copyLink}>
            {copyState === 'copied' ? <CheckIcon /> : <CopyIcon />}
            {copyState === 'copied' ? 'Link copied' : 'Copy case study link'}
          </button>
          <span className={copyState === 'failed' ? 'copy-status' : 'sr-only'} role="status">
            {copyState === 'copied'
              ? 'Case study link copied to clipboard.'
              : copyState === 'failed'
                ? 'Copy unavailable. You can copy the link from your address bar.'
                : ''}
          </span>
        </footer>
      </article>
    </dialog>
  )
}
