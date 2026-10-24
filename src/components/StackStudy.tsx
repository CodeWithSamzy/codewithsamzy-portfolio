import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

const layers = [
  {
    name: 'Interface',
    title: 'The part people feel.',
    detail: 'Responsive interfaces, clear states, and interactions that get out of the way.',
    tools: 'React / Next.js / TypeScript',
  },
  {
    name: 'Application',
    title: 'The work behind the screen.',
    detail: 'Authentication, business logic, payments, and APIs that fit the product.',
    tools: 'Node.js / Python / REST APIs',
  },
  {
    name: 'Data',
    title: 'A solid place to build on.',
    detail: 'Relational models, scoped access, and the right query for the job.',
    tools: 'PostgreSQL / Prisma / Redis',
  },
]

export default function StackStudy() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % layers.length
    else if (event.key === 'ArrowLeft') next = (index + layers.length - 1) % layers.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = layers.length - 1
    else return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="stack-study">
      <div className="study-heading">
        <span className="small-label">ONE PRODUCT. EVERY LAYER.</span>
        <span className="study-cross" aria-hidden="true">
          +
        </span>
      </div>
      <div className="stack-drawing" data-layer={active}>
        <svg viewBox="0 0 360 270" fill="none" aria-hidden="true">
          <path className="drawing-axis" d="M180 18v230M44 100l273 153M316 100 43 253" />
          <g className={`drawing-plane plane-data ${active === 2 ? 'plane-active' : ''}`}>
            <path className="plane-side" d="m47 187 133 67 133-67v-13L180 107 47 174Z" />
            <path className="plane-face" d="m47 174 133-67 133 67-133 67Z" />
            <path className="plane-grid" d="m91 152 133 67m-88-90 133 67m0-45-133 67m88-89L91 196" />
          </g>
          <g className={`drawing-plane plane-application ${active === 1 ? 'plane-active' : ''}`}>
            <path className="plane-side" d="m47 136 133 67 133-67v-13L180 56 47 123Z" />
            <path className="plane-face" d="m47 123 133-67 133 67-133 67Z" />
            <path className="plane-grid" d="m91 101 133 67m-88-90 133 67m0-45-133 67m88-89L91 145" />
            <path className="plane-symbol" d="m155 115-18 9 18 9m50-18 18 9-18 9m-14-17-22 35" />
          </g>
          <g className={`drawing-plane plane-interface ${active === 0 ? 'plane-active' : ''}`}>
            <path className="plane-side" d="m47 85 133 67 133-67V72L180 5 47 72Z" />
            <path className="plane-face" d="M47 72 180 5l133 67-133 67Z" />
            <path className="plane-grid" d="m91 50 133 67m-88-90 133 67m0-45-133 67m88-89L91 94" />
            <path className="plane-symbol" d="m121 73 59-30 60 30-60 30Zm14-7 59 30m-59-14 35-18" />
          </g>
          <path className="drawing-tick" d="M27 173h12m-6-6v12m288-56h12m-6-6v12" />
        </svg>
        <span className="drawing-coordinate">FIG. 01 — FULL STACK</span>
      </div>
      <div className="layer-tabs" role="tablist" aria-label="Explore my engineering stack">
        {layers.map((layer, index) => (
          <button
            key={layer.name}
            type="button"
            role="tab"
            id={`layer-tab-${index}`}
            aria-controls={`layer-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element
            }}
            onKeyDown={(event) => onKeyDown(event, index)}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {layer.name}
          </button>
        ))}
      </div>
      {layers.map((layer, index) => (
        <div
          className="layer-panel"
          key={layer.name}
          role="tabpanel"
          id={`layer-panel-${index}`}
          aria-labelledby={`layer-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
        >
          <h3>{layer.title}</h3>
          <p>{layer.detail}</p>
          <span className="layer-tools">{layer.tools}</span>
        </div>
      ))}
    </div>
  )
}
