export type ProjectId =
  | 'vantra'
  | 'wrapped'
  | 'rental'
  | 'pulsemap'
  | 'cache-sentry'
  | 'securevault'
  | 'morphly'
  | 'finedge'
  | 'threatmap'
  | 'penkit'
  | 'phishguard'

export interface Project {
  id: ProjectId
  name: string
  category: string
  headline: string
  description: string
  stack: string[]
  role: string
  status: string
  live?: string
  source?: string
  problem: string
  decisions: { title: string; detail: string }[]
  flow: [string, string, string]
  note?: string
  visualCaption?: string
}

export const profile = {
  name: 'Kazeem Samod',
  alias: 'CodeWithSamzy',
  email: 'ayokazeem60@gmail.com',
  github: 'https://github.com/CodeWithSamzy',
  twitter: 'https://x.com/codewithsamzy',
  credentials: 'https://www.credly.com/users/kazeem-samod',
  resume: '/Kazeem-Samod-Full-Stack-CV.pdf',
}

export const projects: Project[] = [
  {
    id: 'vantra',
    name: 'Vantra',
    category: 'PRODUCT ENGINEERING',
    headline: 'A little less managing.\nA lot more making.',
    description:
      'A workspace for small teams to manage projects, move tasks forward, and see what needs their attention.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    role: 'Full-stack development',
    status: 'Live project',
    live: 'https://vantra-pi.vercel.app',
    source: 'https://github.com/CodeWithSamzy/vantra',
    problem:
      'A task board is only useful when the less visible parts work too: the right people see the right projects, invitations arrive, and a failed update does not leave the interface lying to you. I built Vantra around that whole workflow.',
    decisions: [
      {
        title: 'The workspace is the boundary.',
        detail:
          'Projects and tasks are scoped to the authenticated workspace in PostgreSQL. Auth.js handles sign-in, while Prisma models the relationships between users, memberships, projects, and tasks.',
      },
      {
        title: 'Fast feedback, with a way back.',
        detail:
          'Task moves update the interface optimistically. If the request fails, the board rolls back and explains what happened. Loading, empty, and error states are part of the workflow.',
      },
      {
        title: 'Account recovery is product work.',
        detail:
          'Verification, password resets, and team invitations use transactional email. Verification and reset tokens are hashed before storage, and authentication endpoints have rate limits.',
      },
    ],
    flow: ['React workspace', 'Next.js + Auth.js', 'Prisma + PostgreSQL'],
    note: 'The current product includes projects, tasks, team invitations, and analytics. Subscription billing is a future feature.',
  },
  {
    id: 'wrapped',
    name: 'GitHub Wrapped',
    category: 'DATA & INTERACTION',
    headline: 'A year of commits.\nA story worth sharing.',
    description:
      'GitHub activity turned into a personal year in code, with interactive stories, contribution patterns, and shareable cards.',
    stack: ['Next.js', 'GitHub GraphQL', 'OAuth', 'Satori'],
    role: 'Full-stack development & interaction design',
    status: 'Live project',
    live: 'https://githubwrapped-app.vercel.app',
    source: 'https://github.com/CodeWithSamzy/github-wrapped',
    problem:
      'GitHub provides a lot of activity data, but the interesting story is spread across repositories, contributions, and dates. I built a small product that brings it together without asking for access it does not need.',
    decisions: [
      {
        title: 'Give the numbers a clear meaning.',
        detail:
          'A stats module computes streaks, monthly activity, and language breakdowns from GitHub’s GraphQL response. Dates use UTC consistently, and language percentages describe code bytes rather than time spent.',
      },
      {
        title: 'Make a year an actual year.',
        detail:
          'Visitors can switch between a rolling 12-month window and individual calendar years. Each result has its own public URL and cache window, with the current year refreshed more often.',
      },
      {
        title: 'Build sharing into the product.',
        detail:
          'The same data powers the animated story and a server-rendered PNG using Satori. OAuth access is read-only, and access tokens are not stored beyond the session.',
      },
    ],
    flow: ['GitHub OAuth + GraphQL', 'Typed stats pipeline', 'Story deck + PNG card'],
  },
  {
    id: 'rental',
    name: 'Rental platform',
    category: 'PRIVATE CLIENT PROJECT',
    headline: 'From an address\nto an application.',
    description:
      'A private client build connecting rental applications, address lookup, payments, and transactional email.',
    stack: ['React', 'Express', 'Stripe', 'PostgreSQL'],
    role: 'Full-stack development & service integrations',
    status: 'Private client project',
    visualCaption:
      'Illustrative interface with placeholder content. Client details and production access are private.',
    problem:
      'A rental application crosses several services before it is complete. I connected those pieces into one application flow, with persistent records, address autocomplete, and payment verification on the server.',
    decisions: [
      {
        title: 'Connect the workflow end to end.',
        detail:
          'The React application collects applicant and co-applicant information. An Express API persists the application through Drizzle into Neon PostgreSQL, so later steps can refer to the same record.',
      },
      {
        title: 'Let the payment provider confirm payment.',
        detail:
          'Stripe Checkout sessions are associated with an application. The server retrieves the session and checks its relationship to that application before updating the payment state.',
      },
      {
        title: 'Treat integrations as part of the experience.',
        detail:
          'Mapbox handles address autocomplete. Resend sends applicant confirmations, co-applicant invitations, and decision emails through a custom domain. The application is deployed on Railway.',
      },
    ],
    flow: ['React application', 'Express + Stripe + Resend', 'Neon + Drizzle'],
  },
  {
    id: 'pulsemap',
    name: 'PulseMap',
    category: 'REALTIME & GEOSPATIAL',
    headline: 'What’s happening,\nright around you.',
    description:
      'A live neighbourhood map for temporary local reports: flooding, power cuts, blocked roads, and community confirmations.',
    stack: ['Next.js', 'Socket.io', 'PostGIS', 'Redis'],
    role: 'Full-stack development & system design',
    status: 'Working MVP',
    problem:
      'Local information gets stale quickly. A useful neighbourhood map needs to deliver nearby updates, retire old reports, and handle concurrent confirmations without broadcasting everyone’s precise location.',
    decisions: [
      {
        title: 'Send the neighbourhood, not the whole map.',
        detail:
          'Clients subscribe to geographic cells in their viewport. A Socket.io gateway and Redis adapter deliver relevant events, while PostGIS handles bounding-box queries and nearby duplicate detection.',
      },
      {
        title: 'Make temporary information expire.',
        detail:
          'Reports have category-specific lifetimes. Community confirmations use row-locked transactions, and a leader-locked sweeper expires old reports without competing workers doing the same work.',
      },
      {
        title: 'Test what happens between browsers.',
        detail:
          'The project includes unit tests and Playwright coverage for live updates, report confirmations, moderation, uploads, and deletion. Anonymous sessions, location fuzzing, and EXIF stripping are built into the data flow.',
      },
    ],
    flow: ['MapLibre viewport', 'Socket.io + Redis', 'PostgreSQL + PostGIS'],
    note: 'A working MVP with automated coverage. The production deployment is still being completed.',
  },
  {
    id: 'cache-sentry',
    name: 'Cache Sentry',
    category: 'BROWSER EXTENSION',
    headline: 'Small extension.\nCareful detection.',
    description:
      'A Chrome extension that spots potential cache deception signals, with false-positive filtering and automated browser tests.',
    stack: ['JavaScript', 'Manifest V3', 'Node.js', 'Chrome CDP'],
    role: 'Extension development & automated testing',
    status: 'Open source',
    source: 'https://github.com/CodeWithSamzy/Cache-sentry',
    problem:
      'A detector that flags every cached asset is not useful. Cache Sentry observes requests and responses, then checks whether the authentication, URL, content type, and caching behaviour actually disagree.',
    decisions: [
      {
        title: 'Keep the signal specific.',
        detail:
          'Detection checks real session cookies, path structure, response content types, and cache headers. Responses varying on Cookie or Authorization are filtered out.',
      },
      {
        title: 'Keep observations local.',
        detail:
          'A Manifest V3 service worker tracks findings per tab. The popup explains each signal, groups repeated observations, and supports JSON export.',
      },
      {
        title: 'Test inside the browser.',
        detail:
          'Unit tests cover detection cases. A headless-Chrome suite uses fixture servers and the Chrome DevTools Protocol to exercise the loaded extension end to end.',
      },
    ],
    flow: ['Browser response headers', 'Service-worker detector', 'Per-tab findings + export'],
  },
  {
    id: 'securevault',
    name: 'SecureVault',
    category: 'FULL-STACK APPLICATION',
    headline: 'A vault with\nthe whole stack behind it.',
    description:
      'A password manager with encrypted storage, JWT authentication, and breach checks through HaveIBeenPwned.',
    stack: ['React', 'Express', 'TypeScript', 'Neon'],
    role: 'Full-stack development',
    status: 'Open source',
    source: 'https://github.com/CodeWithSamzy/securevault',
    problem:
      'A password manager brings together account access, persistent data, and an external breach service. I built both the client and API, including the decisions about how stored passwords and breach queries are handled.',
    decisions: [
      {
        title: 'Separate account access from vault data.',
        detail:
          'JWT authentication protects the API. Account passwords are hashed with bcrypt, while vault entries use AES-256 encryption before storage in Neon PostgreSQL.',
      },
      {
        title: 'Send less to the breach service.',
        detail:
          'HaveIBeenPwned checks use a hash-prefix lookup. The returned suffixes are compared locally, so the plaintext password is not sent to the breach API.',
      },
      {
        title: 'Own both sides of delivery.',
        detail:
          'The React and TypeScript frontend includes categories, password generation, and strength feedback. The Express API uses Drizzle, with the client and service deployed separately.',
      },
    ],
    flow: ['React vault', 'Express API + encryption', 'Drizzle + Neon'],
  },
  {
    id: 'morphly',
    name: 'Morphly',
    category: 'IMAGE WORKFLOW',
    headline: 'An image, a prompt,\na useful edit.',
    description:
      'A prompt-driven photo editor with browser-side image preparation and a server-side inference integration.',
    stack: ['JavaScript', 'Node.js', 'Workers AI', 'Vercel'],
    role: 'Full-stack development & API integration',
    status: 'Open source',
    source: 'https://github.com/CodeWithSamzy/morphly',
    problem:
      'Image editing APIs have payload limits, model constraints, and usage costs. I built the upload-to-result workflow around those constraints instead of treating the model request as the whole application.',
    decisions: [
      {
        title: 'Prepare images before the request.',
        detail:
          'The browser resizes and recompresses uploads to fit serverless payload limits. The server applies the model’s output-size limits before calling Cloudflare Workers AI.',
      },
      {
        title: 'Validate the result, too.',
        detail:
          'The backend sends the reference image and prompt as multipart data, validates the returned image, and returns it to the browser without storing the upload.',
      },
      {
        title: 'Control access and usage.',
        detail:
          'A password gate and usage limits protect the inference endpoint. The rate-limiting implementation supports Redis for persistence across serverless instances.',
      },
    ],
    flow: ['Browser image preparation', 'Node.js endpoint', 'Workers AI image result'],
  },
  {
    id: 'finedge',
    name: 'FinEdge',
    category: 'BACKEND & AUTOMATION',
    headline: 'An API, a dashboard,\nand a bot that agree.',
    description:
      'A multi-user trading application with a FastAPI backend, web dashboard, and Telegram controls.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Telegram'],
    role: 'Backend development & integration work',
    status: 'Backend project',
    problem:
      'The same account can be used from a dashboard and a Telegram bot. I worked on keeping authentication, encrypted exchange credentials, and execution controls consistent across those entry points.',
    decisions: [
      {
        title: 'Keep account state on the server.',
        detail:
          'The FastAPI service coordinates account configuration, bot workers, and PostgreSQL persistence. Dashboard and Telegram controls use the same account state.',
      },
      {
        title: 'Make expired sessions predictable.',
        detail:
          'A shared dashboard request wrapper handles expired authentication centrally, clears local session state, and returns the user to sign-in.',
      },
      {
        title: 'Keep operational controls explicit.',
        detail:
          'The platform has separate paper and live modes. Live execution uses an explicit Telegram confirmation, and exchange credentials are encrypted at rest.',
      },
    ],
    flow: ['Dashboard + Telegram', 'FastAPI workers', 'PostgreSQL + exchange API'],
  },
  {
    id: 'threatmap',
    name: 'ThreatMap',
    category: 'DATA VISUALISATION',
    headline: 'A moving dataset,\nmade readable.',
    description:
      'An interactive map and event feed for exploring simulated threat data by type, location, and severity.',
    stack: ['React', 'TypeScript', 'Leaflet'],
    role: 'Frontend development',
    status: 'Demo project',
    source: 'https://github.com/CodeWithSamzy/threatmap',
    problem:
      'A constantly changing dataset needs an interface that stays readable. This frontend experiment combines a map, severity filters, a live event feed, and inspectable records.',
    decisions: [
      {
        title: 'Keep the data honest.',
        detail:
          'A custom simulation engine supplies demonstration events. The project does not claim to show actual attacks.',
      },
      {
        title: 'Connect the views.',
        detail:
          'Filters, the map, and the event feed offer different ways to explore the same threat records.',
      },
      {
        title: 'Make density manageable.',
        detail:
          'Severity colours, map markers, and detail views help visitors move from a broad overview to an individual event.',
      },
    ],
    flow: ['Simulation engine', 'React state + filters', 'Leaflet map + event feed'],
  },
  {
    id: 'penkit',
    name: 'PenKit',
    category: 'DEVELOPER TOOLING',
    headline: 'Network utilities,\none interface.',
    description:
      'A web toolkit bringing header inspection, DNS lookups, certificate checks, and network utilities into one UI.',
    stack: ['React', 'TypeScript', 'Express', 'Node.js'],
    role: 'Full-stack development',
    status: 'Open source',
    source: 'https://github.com/CodeWithSamzy/penkit',
    problem:
      'Common network checks normally happen in separate command-line tools. PenKit puts several of them behind a consistent web interface backed by Node’s networking APIs.',
    decisions: [
      {
        title: 'Use the platform’s primitives.',
        detail: 'The Express backend uses Node’s DNS, TLS, and networking modules to run the checks.',
      },
      {
        title: 'Give each tool a readable result.',
        detail:
          'A React and TypeScript client presents headers, records, certificates, and service results in a shared interface.',
      },
      {
        title: 'Separate client and service.',
        detail: 'The frontend and API are deployed independently on Netlify and Railway.',
      },
    ],
    flow: ['React tool interface', 'Express API', 'Node DNS + TLS + Net'],
  },
  {
    id: 'phishguard',
    name: 'PhishGuard',
    category: 'EARLIER WORK',
    headline: 'A closer look\nat suspicious links.',
    description:
      'A web application for inspecting suspicious URLs and email headers, with risk summaries and recent scan history.',
    stack: ['React', 'TypeScript', 'Express'],
    role: 'Full-stack development',
    status: 'Earlier project',
    source: 'https://github.com/CodeWithSamzy/phishguard',
    problem:
      'Analysis results need to explain what they found. PhishGuard brings static URL checks, email-header inspection, and readable risk summaries into one application.',
    decisions: [
      {
        title: 'Keep the core useful on its own.',
        detail:
          'Static URL analysis runs before an optional VirusTotal lookup. If that external service is unavailable, the API still returns the local analysis.',
      },
      {
        title: 'Handle different inputs clearly.',
        detail:
          'The React client separates URL and email-header analysis into their own views, with shared risk summaries and validation in the Express routes.',
      },
      {
        title: 'Make recent work easy to revisit.',
        detail:
          'The interface keeps the latest 20 scans in session state, so a visitor can revisit recent results without starting another request.',
      },
    ],
    flow: ['URL input', 'Analysis service', 'Result interface'],
  },
]

export const featuredProjects = projects.slice(0, 4)

export const experience = [
  {
    period: '2023 — NOW',
    role: 'Full-stack developer',
    company: 'CodeWithSamzy · Freelance',
    description:
      'Building web products for clients and independently. Frontend, APIs, authentication, payments, databases, and deployment.',
  },
  {
    period: '2023 — 2024',
    role: 'Frontend developer',
    company: 'Shankstix Media & Software',
    description:
      'Built the React frontend, authentication flows, JWT handling, API integrations, and event creation workflows.',
  },
  {
    period: '2020 — 2023',
    role: 'Frontend developer',
    company: 'New Horizons Institute',
    description:
      'Turned designs into responsive interfaces and built reusable frontend components across client projects.',
  },
]
