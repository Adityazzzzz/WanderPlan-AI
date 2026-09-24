# WanderPlan AI — Trip Planner

**Author:** ADITYA SING (23U03031)

WanderPlan is an AI-powered travel planner that takes free-form natural language input and generates a structured, interactive day-by-day itinerary. It heavily focuses on reliable UI rendering, robust error handling, and a polished, "Luma-inspired" glassmorphism aesthetic.

## 🚀 Setup & Execution

**Prerequisites:** Node.js

### 1. Install Dependencies

Run the following in the root directory:

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory and add your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### 3. Run the Application

This project uses a separated frontend (Vite/React) and backend (Express). You need to run both concurrently.

**Terminal 1 (Backend):**

```bash
node server/index.js
```

**Terminal 2 (Frontend):**

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## ⏱️ Time Spent

**Total Time:** ~[Insert Hours] hours

### Breakdown

- Core frontend architecture & state management: [X] hours
- API integration & backend proxy: [X] hours
- UI styling and Luma-inspired design implementation: [X] hours
- Edge case handling (validation, abort controllers, error states): [X] hours

## 🤖 AI Usage Note

In the spirit of transparency, here is how I utilized AI tools during this assignment:

- **Code Generation & Boilerplate:** Used AI to scaffold the initial Vite/Tailwind setup and generate the dummy data for skeleton loaders.

- **UI/UX Styling:** Utilized AI as a pair-programmer to iterate on complex Tailwind CSS classes, specifically for achieving the glassmorphism effects, background image overlays, and matching the specific Luma reference design.

- **Debugging:** Used AI to troubleshoot a 502 Server Gateway error caused by the Gemini SDK's systemInstruction initialization order.

- **Prompt Engineering:** Leveraged AI to refine the system instructions passed to the Gemini model to ensure strictly formatted JSON outputs.

## 🏗️ Architecture & Data Handling

A major focus of this project was turning unpredictable AI output into a reliable, stateful UI without crashing.

### Race Conditions & Stale Data

The `useTripPlanner` hook utilizes `AbortController` and a `requestIdRef`. If a user submits a new prompt while an older one is still generating, the older network request is aborted, and its response is ignored to prevent stale data overwrites.

### Validation Layer

The `validateItinerary.js` utility strictly checks the AI's JSON output. If the AI returns malformed JSON, hallucinates the schema, or includes markdown code fences, the app catches the error gracefully and displays a user-friendly retry state rather than crashing the React tree.

### State Machine

The app avoids complex boolean flags (`isLoading`, `hasError`) by using a strict state machine (`IDLE`, `LOADING`, `SUCCESS`, `ERROR`) to determine which UI component to render.

### Security

The Gemini API key is completely hidden from the browser. All AI requests are routed through a lightweight Node.js/Express backend.

## 🚧 Known Limitations & Next Steps

### Streaming Responses

Currently, the user waits for the entire JSON payload to generate before the UI updates. Implementing a streaming JSON parser (like ai SDK's `experimental_streamObject`) would allow day cards to render progressively.

### Drag-and-Drop Reordering

While users can reorder stops using the up/down buttons, adding full drag-and-drop support (via `@hello-pangea/dnd`) would improve the UX.

### Persisted Backend Storage

Sessions are currently saved to the browser's localStorage. Moving this to a proper database (like PostgreSQL with Prisma) would allow cross-device session reloading.
