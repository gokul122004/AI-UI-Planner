-------------------------------------
AI Agent → Deterministic UI Generator
-------------------------------------

An AI-powered UI generation system that converts natural language intent into structured UI plans, deterministic React code, and live rendered previews.

This project is designed to demonstrate:

- AI agent orchestration

- Deterministic UI systems

- Incremental editing

- Version control for AI-generated UI

- Safe and reproducible UI generation

Problem Statement:

- Build an AI-powered agent that converts natural language UI descriptions into working UI

- Uses a fixed deterministic component library and supports incremental modifications

- Allows rollback to previous versions

Architecture Overview:

The system follows a strict multi-agent pipeline:

User Intent
     ↓
Planner (LLM)
     ↓
Structured UI Plan (JSON)
     ↓
Validation Layer
     ↓
Deterministic Generator
     ↓
React Renderer (Recursive)
     ↓
Live Preview

Agent Design:

The agent is composed of three explicit steps:

1️. Planner

- Interprets user intent

- Selects layout

- Chooses components

- Outputs structured JSON plan

- Supports modification of existing UI trees

Input:

- userInput

- existingPlan (for incremental edits)

Output:

{
  "layout": "vertical",
  "components": [...]
}


2️. Validator

- Enforces component whitelist

- Prevents unauthorized component creation

- Validates structure before rendering

Allowed components:

- Button

- Card

- Input

- Table

3️. Generator

- Converts structured plan into deterministic JSX string

- No AI-generated code

- No CSS generation

- No dynamic Tailwind

This guarantees reproducibility and safety.

4️. Explainer

- Converts plan into human-readable reasoning

- Explains layout and component choices

- Improves transparency

Incremental Editing:

- The system supports modification of existing UI

- Planner receives existingPlan

- Only modifies necessary nodes

- Preserves structure unless explicitly requested

- Prevents full rewrites

- Version history is stored in memory.

- Rollback restores prior UI versions instantly.

- Determinism Guarantees:
 
- Fixed component whitelist
 
- Validation before rendering
 
- No arbitrary styles
 
- No AI-generated CSS
 
- No new components allowed

- JSON-only planner output

- Temperature = 0

UI Structure:

The application consists of

Left Panel → Chat / Intent

Center Panel → Generated JSX Code

Right Panel → Live Rendered Preview

Version Controls → Rollback support

Tech Stack:

Frontend:

- Next.js (App Router)

- React

Backend:

- Next.js API Routes

AI:

- Google Gemini API

State:

- In-memory version history

How to Run:

1. Clone repository

2. Add .env.local:

GOOGLE_API_KEY=your_api_key_here


3. Install dependencies:

npm install


4. Run:

npm run dev

Known Limitations:

- No persistent storage

- No authentication

- Limited component library

- No advanced diff visualization

- No production deployment hardening

Improvements With More Time:

- Persistent version storage

- Visual diff between versions

- Component schema validation (Zod)

- Streaming planner responses

- More complex layout engine

- State and event generation

- Static analysis of AI output