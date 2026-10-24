import type { ProjectId } from '../data'

function VantraVisual() {
  return (
    <div className="vantra-art" aria-label="Illustration of Vantra’s project workspace" role="img">
      <div className="art-margin-label">A SPACE TO MAKE PROGRESS.</div>
      <div className="mini-workspace">
        <div className="mini-sidebar">
          <strong>
            <span className="vantra-mark">v</span> vantra
          </strong>
          <span className="mini-sidebar-label">WORKSPACE</span>
          <span>Overview</span>
          <span className="mini-nav-active">
            Projects <i>↗</i>
          </span>
          <span>Activity</span>
          <span>Team</span>
          <div className="mini-sidebar-bottom">
            <b>S</b> Your workspace
          </div>
        </div>
        <div className="mini-content">
          <div className="mini-topline">
            <span>Workspace / Projects</span>
            <span>⌕</span>
          </div>
          <div className="mini-title">
            <h4>Make room for the work.</h4>
            <span>+ New project</span>
          </div>
          <p>Your ideas, a little more organised.</p>
          <div className="mini-board">
            <div>
              <span className="board-label">
                <i /> TO DO
              </span>
              <div className="task-ticket">
                <small>PRODUCT</small>
                <strong>Map the onboarding flow</strong>
                <div>
                  <span>Interface</span>
                  <b>S</b>
                </div>
              </div>
              <div className="task-ticket task-short">
                <strong>Write the API contract</strong>
                <div>
                  <span>Backend</span>
                </div>
              </div>
            </div>
            <div>
              <span className="board-label">
                <i className="blue-dot" /> IN PROGRESS
              </span>
              <div className="task-ticket">
                <small>ENGINEERING</small>
                <strong>Build workspace permissions</strong>
                <div>
                  <span>In progress</span>
                  <b>S</b>
                </div>
              </div>
            </div>
            <div>
              <span className="board-label">
                <i className="green-dot" /> DONE
              </span>
              <div className="task-ticket">
                <small>FOUNDATION</small>
                <strong>Set up the database</strong>
                <div>
                  <span className="done-pill">Complete</span>
                  <b>S</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="art-bottom-label">NEXT.JS × POSTGRESQL</span>
    </div>
  )
}

function WrappedVisual() {
  return (
    <div className="wrapped-art" role="img" aria-label="Illustration of GitHub Wrapped’s contribution story">
      <div className="wrapped-art-top">
        <span className="wrapped-mark">↗</span>
        <span>
          github
          <br />
          <b>wrapped.</b>
        </span>
        <span className="wrapped-art-meta">
          YOUR YEAR.
          <br />
          YOUR WORK.
        </span>
      </div>
      <div className="wrapped-art-title">
        Every commit
        <br />
        has a <em>story.</em>
      </div>
      <div className="contribution-art" aria-hidden="true">
        {Array.from({ length: 364 }, (_, i) => (
          <span key={i} className={`contribution-cell level-${(i * 17 + Math.floor(i / 7) * 3) % 5}`} />
        ))}
      </div>
      <div className="wrapped-art-bottom">
        <span>A YEAR IN CODE</span>
        <span>MAKE IT A WRAP ↗</span>
      </div>
    </div>
  )
}

function RentalVisual() {
  return (
    <div
      className="rental-art"
      role="img"
      aria-label="Illustration of the rental application and payment workflow"
    >
      <div className="rental-outline" aria-hidden="true">
        <svg viewBox="0 0 200 210" fill="none">
          <path d="M15 100 100 25l85 75v105H15Z" />
          <path d="M70 205v-72h60v72M42 104h26v28H42Zm88 0h26v28h-26Z" />
        </svg>
      </div>
      <div className="rental-form">
        <div className="rental-form-top">
          <span className="rental-house">⌂</span>
          <span>THE NEXT CHAPTER</span>
          <i>01 / 04</i>
        </div>
        <h4>
          Somewhere
          <br />
          to call home.
        </h4>
        <p>Let’s start with the address.</p>
        <div className="rental-input">
          <span>PROPERTY ADDRESS</span>
          <strong>Find your next place</strong>
          <i>⌕</i>
        </div>
        <div className="rental-continue">
          Continue application <span>↗</span>
        </div>
        <div className="rental-form-footer">
          <i /> YOUR PROGRESS, SAVED.
        </div>
      </div>
      <div className="rental-flow">
        <span>ADDRESS</span>
        <i />
        <span>APPLICATION</span>
        <i />
        <span>PAYMENT</span>
      </div>
    </div>
  )
}

function PulsemapVisual() {
  return (
    <div
      className="pulsemap-art"
      role="img"
      aria-label="Illustration of nearby reports on the PulseMap neighbourhood map"
    >
      <svg
        className="map-art"
        viewBox="0 0 620 420"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="620" height="420" fill="#e9eee3" />
        <path d="M350-30c-80 100 70 154 26 214s-81 37-67 117 159 111 236 153h109V-30Z" fill="#ccdce0" />
        <g stroke="#fcfdf7" strokeWidth="15">
          <path d="m-10 72 398 155M36-30l208 454M170-30l-31 196L-6 299M302-5 216 97l65 126M-20 361l345-126M-10 201l319 166" />
          <path d="m545-10-82 270 184 106M330 416l117-174 179-88" />
        </g>
        <g stroke="#c9d4bf" strokeWidth="1.2">
          <path d="m-10 72 398 155M36-30l208 454M170-30l-31 196L-6 299M302-5 216 97l65 126M-20 361l345-126M-10 201l319 166" />
          <path d="m545-10-82 270 184 106M330 416l117-174 179-88" />
        </g>
        <g fill="#bfcdb1">
          <path d="m192 153 52 21-28 36-40-18Z" />
          <path d="m65 252 37-31 31 18-22 35Z" />
          <path d="m482 128 40 12-14 38-40-20Z" />
        </g>
      </svg>
      <div className="map-wordmark">
        <i /> pulsemap<span>NEARBY, RIGHT NOW.</span>
      </div>
      <div className="map-location-label">LAGOS</div>
      <div className="map-report report-one">
        <span className="map-pin">
          <i />
        </span>
        <div>
          <b>Road blocked</b>
          <span>Community report</span>
        </div>
      </div>
      <div className="map-report report-two">
        <span className="map-pin pin-green">
          <i />
        </span>
        <div>
          <b>Power restored</b>
          <span>Confirmed by neighbours</span>
        </div>
      </div>
      <div className="map-status">
        <i /> A neighbourhood, connected.<span>↗</span>
      </div>
    </div>
  )
}

export default function ProjectVisual({ id }: { id: ProjectId }) {
  if (id === 'vantra') return <VantraVisual />
  if (id === 'wrapped') return <WrappedVisual />
  if (id === 'rental') return <RentalVisual />
  if (id === 'pulsemap') return <PulsemapVisual />
  return (
    <div
      className={`type-art type-art-${id}`}
      role="img"
      aria-label={`${id.replaceAll('-', ' ')} project illustration`}
    >
      <span className="type-art-index">A PROJECT BY CODEWITHSAMZY</span>
      <span className="type-art-symbol" aria-hidden="true">
        {id === 'cache-sentry'
          ? '[↗]'
          : id === 'securevault'
            ? '{ · }'
            : id === 'morphly'
              ? '↗↗'
              : id === 'finedge'
                ? 'ƒ(x)'
                : '⌘'}
      </span>
      <span className="type-art-bottom">FRONTEND / BACKEND / ALL THE DETAILS</span>
    </div>
  )
}
