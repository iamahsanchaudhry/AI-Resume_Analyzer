# AI Resume Analyzer

An intelligent resume analyzer that compares your resume against any job description using AI-powered skill extraction and matching. Get instant feedback on your fit for a role with per-skill reasoning and actionable insights.

🔗 **Live Demo:** [ai-resume-analyzer-pi-beryl.vercel.app](https://ai-resume-analyzer-pi-beryl.vercel.app/)

---

## Features

- 📄 **PDF Resume Upload** — Drag and drop or click to upload your resume
- 🤖 **AI-Powered Skill Extraction** — Automatically extracts skills, categories, and capabilities from both resume and job description
- 🎯 **Intelligent Matching** — Classifies skills as matched, weak, or missing using semantic understanding
- 💡 **Per-Skill Reasoning** — AI explains why each skill matched or didn't
- 📊 **Match Score** — Get a clear percentage score showing your fit
- 🔐 **Auth System** — Sign up to save analysis history and reuse uploaded resumes
- 👤 **Guest Mode** — Try one free analysis without creating an account
- 🌓 **Dark Mode** — Full light/dark theme support
- ⚡ **Fast & Responsive** — Optimized for mobile and desktop

---

## Tech Stack

### Frontend

- **React 18** with **TypeScript**
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations and transitions
- **shadcn/ui** — Accessible component primitives
- **Radix UI** — Unstyled, accessible UI components
- **Axios** — HTTP client
- **Lucide React** — Icon library

### Backend

- **Node.js** with **Express**
- **MongoDB** with **Mongoose** — Database
- **JWT** — Authentication
- **Multer** — File uploads
- **pdf-parse** — PDF text extraction

### AI Integration

- **Groq API** — Ultra-fast LLM inference
- **Llama 3.1 8B Instant** — Model for extraction and matching

### Deployment

- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** MongoDB Atlas

---

## How It Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Upload PDF  │ ──► │ Extract Text │ ──► │ AI Extracts  │
│              │     │              │     │    Skills    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  See Results │ ◄── │ AI Matches   │ ◄── │ Extract Job  │
│   + Score    │     │  vs JD       │     │    Skills    │
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **Resume Processing** — PDF is parsed and skills are extracted via AI with ladder-based inference (React → Frontend Frameworks → Frontend Development)
2. **Job Description Analysis** — JD skills are extracted following the same pattern with domain discipline
3. **Semantic Matching** — AI compares both skill sets, handling naming variations (C# ↔ C Sharp), framework implications (Angular → TypeScript), and soft skill demonstrations
4. **Graceful Fallback** — If AI matching fails, a deterministic matcher with an alias map ensures reliable results

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Groq API key — [Get one free](https://console.groq.com/)

### Clone the Repository

```bash
git clone https://github.com/iamahsanchaudhry/AI-Resume_Analyzer.git
cd AI-Resume_Analyzer
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
PORT=5000
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
AI-Resume_Analyzer/
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (shared, page-specific)
│   │   ├── pages/           # Route pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── context/         # React contexts (Auth, Theme)
│   │   └── lib/             # Utility functions
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── ai/              # Groq client, prompts, skill extraction
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   ├── middleware/      # Auth, error handlers
│   │   ├── utils/           # Skill matcher, helpers
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint              | Description               | Auth |
| ------ | --------------------- | ------------------------- | ---- |
| POST   | `/api/auth/signup`    | Create a new account      | No   |
| POST   | `/api/auth/login`     | Log in                    | No   |
| GET    | `/api/auth/profile`   | Get current user          | Yes  |
| POST   | `/api/resumes/upload` | Upload and parse a resume | Opt. |
| POST   | `/api/match-resume`   | Analyze resume vs job     | Opt. |
| GET    | `/api/analyses`       | Get analysis history      | Yes  |

---

## Environment Variables

### Backend (`.env`)

| Variable       | Description                   |
| -------------- | ----------------------------- |
| `MONGODB_URI`  | MongoDB connection string     |
| `JWT_SECRET`   | Secret key for JWT signing    |
| `GROQ_API_KEY` | Groq API key for AI inference |
| `PORT`         | Server port (default: 5000)   |

### Frontend (`.env`)

| Variable       | Description                         |
| -------------- | ----------------------------------- |
| `VITE_API_URL` | Backend API URL (no trailing slash) |

---

## Key Design Decisions

- **Caching resume extraction** — Resume skills are extracted once and cached in MongoDB, avoiding redundant AI calls on subsequent analyses against different JDs
- **AI-first, deterministic fallback** — AI matching is the primary path for semantic understanding; a rule-based matcher with alias maps serves as a reliable backup
- **Ladder extraction pattern** — For every specific skill, the AI also emits its category and capability, enabling matches across different abstraction levels
- **Guest-to-user migration** — Analyses performed as a guest are migrated to the user account upon signup, preserving the first analysis seamlessly

---

## Roadmap

- [ ] Resume improvement suggestions
- [ ] Multi-resume comparison
- [ ] Export analysis as PDF
- [ ] ATS compatibility checker
- [ ] LinkedIn profile analysis
- [ ] Cover letter generation

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Ahsan Chaudhry**

- GitHub: [@iamahsanchaudhry](https://github.com/iamahsanchaudhry)

---

## Acknowledgments

- [Groq](https://groq.com/) for ultra-fast LLM inference
- [Meta](https://ai.meta.com/) for the Llama model
- [shadcn/ui](https://ui.shadcn.com/) for component primitives
- [Radix UI](https://www.radix-ui.com/) for accessible components

---

<p align="center">Built with ☕ and a lot of prompt iterations</p>
