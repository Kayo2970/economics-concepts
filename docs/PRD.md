# Product Requirements Document (PRD): Interactive Economics Explorer

## 1. Project Overview
**Name:** Interactive Economics Explorer
**Target Audience:** High school and college-level economics students.
**Primary Objective:** To build an interactive, visually engaging web application that translates abstract economic theories into tactile, easy-to-understand interactive modules.

## 2. Core Problem & Solution
*   **The Problem:** Traditional economics education relies heavily on static textbooks, 2D graphs, and rote memorization of concepts like "shifting left or right," leading to low retention and a lack of intuitive understanding.
*   **The Solution:** A platform that uses gamification, dynamic chart rendering, and manipulable variables to let students "play" with economic forces in real-time, instantly observing cause and effect (e.g., pulling a supply slider and watching the equilibrium price react instantly).

## 3. Scope & Must-Have Modules (MVP)

### Module 1: Supply, Demand, & Market Equilibrium Sandbox
*   **User Story:** As a student, I want to drag elements on a graph to see how external shocks (like a tax or a trend) affect the market equilibrium price and quantity.
*   **Requirements:**
    *   An interactive graphing plane with adjustable X (Quantity) and Y (Price) axes.
    *   A downward-sloping Demand curve and upward-sloping Supply curve.
    *   Input controls (sliders or drag-and-drop scenarios) that map to the "Shifters" of Supply and Demand (e.g., "Change in Consumer Income", "Increase in Raw Material Cost").
    *   The intersection point (Equilibrium P* and Q*) must recalculate and snap to the new intersection dynamically when curves move.

### Module 2: The Law of Diminishing Marginal Utility (The Pizza Simulation)
*   **User Story:** As a student, I want to see the difference between Total Utility and Marginal Utility explicitly visualized as I consume more of a good.
*   **Requirements:**
    *   A continuous "Consume" button acting as the trigger for the simulation.
    *   A dual-axis chart comparing two datasets: Total Utility (a bar or area chart that rises then plateaus) and Marginal Utility (a line graph that steadily slopes down into the negative).
    *   A visual indicator tied to the data (e.g., an emoji that changes from 😍 to 🤢 when Marginal Utility drops below 0).

### Module 3: Price Elasticity of Demand (The Revenue Calculator)
*   **User Story:** As a student, I want to understand how the steepness of the demand curve affects a company's total revenue when they change their prices.
*   **Requirements:**
    *   A toggle between two pre-set curve shapes: Inelastic (steep) and Elastic (flat).
    *   A "Price Y-Axis Slider" allowing the user to increase or decrease the price manually.
    *   A dynamic calculation box labeled "Total Revenue" (Price × Quantity) that updates in real-time, turning green for an increase and red for a decrease, based on the elasticity curve chosen.

### Module 4: Opportunity Cost & The Production Possibilities Frontier (PPF)
*   **User Story:** As a student, I need to visualize the direct trade-off between two choices due to finite resources.
*   **Requirements:**
    *   An interactive pie chart or a 2D PPF curve (Goods X vs Goods Y).
    *   When the user attempts to increase the output of Good X, the system *must mathematically force* a decrease in Good Y to maintain the constraint.

## 4. Non-Functional Requirements
*   **Performance:** All chart re-renders and slider changes must happen at a minimum of 60 FPS to ensure the interaction feels "physical" and real-time.
*   **Responsiveness:** The layout must be fluid. Graphs must resize using responsive containers (e.g., CSS Grid/Flexbox) for both desktop monitors and tablets.
*   **Accessibility:** ARIA labels on all sliders. High-contrast colors for the different curves (e.g., avoiding red/green overlap for colorblind users).

## 5. Development Strategy for AI Coding Agents
*   *Agents should build modules independently.* Start with a foundational framework (Next.js/React layout).
*   Create a reusable generic Graph Component (using a library like Recharts or Chart.js) before hardcoding specific economic modules.
*   Focus heavily on React state management (`useState` / `useMemo`) as the mathematical relationship between the variables (Price, Quantity, Utility) is the core logic.
