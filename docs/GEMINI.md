# GEMINI.md - Interactive Economics Explorer (Documentation Context)

## Project Overview
The **Interactive Economics Explorer** is a modern, visually engaging web application designed for high school and college students. Its primary goal is to transform abstract economic theories (like Supply and Demand, Diminishing Marginal Utility, and Price Elasticity) into tactile, interactive modules where students can "play" with variables and observe real-time cause-and-effect.

### Core Objectives:
*   **Gamified Learning:** Use interactive simulations instead of static textbook graphs.
*   **Dynamic Visualization:** Real-time chart rendering (60 FPS) using mathematical equations rather than hardcoded points.
*   **Intuitive UX:** A "Modern Academia" aesthetic with clear, responsive UI and smooth animations (Framer Motion).

## Directory Overview (Docs)
This directory (`/docs`) contains the foundational planning, design, and conceptual documents for the project.

### Key Files:
*   **PRD.md (Product Requirements Document):** Outlines the project's goals, target audience, and must-have MVP modules (Supply/Demand Sandbox, Pizza Utility Simulation, Revenue/Elasticity Calculator, and Opportunity Cost/PPF).
*   **DESIGN_DOC.md (System Design):** Defines the technical architecture, directory structure, and the mathematical engine. It specifies the tech stack (Next.js, TailwindCSS, Recharts/D3, Zustand) and UI/UX guidelines.
*   **GAMEPLAN.md (Project Roadmap):** Breaks down the core economic concepts and provides a 4-phase implementation strategy from foundation to gamification.
*   **SITEMAP.md (Information Architecture):** Visualizes the application's structure, page breakdown, and URL routing (Home, Modules, Assessment/Quiz, About).
*   **CONCEPTS_DEEP_DIVE.md:** (Implicitly contains detailed economic theory and formulas to be implemented in the simulations).
*   **PROJECT_OUTCOMES.md:** Defines success metrics and long-term goals for the platform.

## Technical Context
*   **Framework:** React (Next.js or Vite)
*   **Styling:** TailwindCSS + Framer Motion for animations.
*   **Charts:** Recharts (preferred), Chart.js, or D3.js.
*   **State Management:** Zustand or React Context API for managing simulation variables (Price, Quantity, Utility).
*   **Logic:** Centralized mathematical utilities (`/utils/economicsMath.ts`) to handle curve intersections and marginal calculations.

## Usage for AI Agents
When working on this project:
1.  **Reference the PRD** for specific user stories and module requirements.
2.  **Follow the DESIGN_DOC** for architectural patterns, component hierarchy, and the mathematical modeling of curves (using linear equations instead of static points).
3.  **Consult the SITEMAP** when building new pages or navigation logic to ensure consistent routing.
4.  **Prioritize Performance:** Ensure all interactive elements feel "physical" and responsive (aiming for 60 FPS re-renders).
