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

### Module 5: Demand Forecasting Lab (Quantitative Methods)
*   **User Story:** As a managerial economics student, I want to see how different forecasting methods (Moving Average vs. Regression) fit historical data.
*   **Requirements:**
    *   A dataset plotting area with "noisy" historical demand points.
    *   Toggles for "3-Month Moving Average", "Weighted Moving Average", and "Linear Trend".
    *   The ability to slide a "Future Work" handle to see the projected forecast line extend.

### Module 6: Consumer Equilibrium (Indifference Curve Analysis)
*   **User Story:** As a student, I want to find the utility-maximizing point where my budget line is tangent to an indifference curve.
*   **Requirements:**
    *   A graph showing multiple convex Indifference Curves (IC1, IC2, IC3).
    *   A draggable "Budget Line" where the user can change the Price of Good X and Price of Good Y.
    *   Visual feedback showing the "Tangency Point" and the resulting Consumer Surplus.

### Module 7: The Market Structure Matrix
*   **User Story:** As a student, I want to compare how price and quantity differ between Perfect Competition, Monopoly, and Oligopoly.
*   **Requirements:**
    *   A single graph area where a user can toggle between different "Market Modes."
    *   *Monopoly Mode:* Shows the MR curve below the Demand curve and highlights the Deadweight Loss area.
    *   *Oligopoly Mode:* Demonstrates the "Kinked Demand Curve" model.

### Module 8: The Policy Balancer (Fiscal vs. Monetary)
*   **User Story:** As a student, I want to see how changing the Repo Rate (Monetary) or GST/Spending (Fiscal) affects GDP and Inflation.
*   **Requirements:**
    *   Dual dashboard: "Central Bank" controls and "Government" controls.
    *   A "Macro-Dial" showing GDP status (Recession to Overheating).
    *   Interactive levers that illustrate time lags (Monetary policy effect takes longer than Fiscal changes).

## 4. Non-Functional Requirements
*   **Performance:** All chart re-renders and slider changes must happen at a minimum of 60 FPS to ensure the interaction feels "physical" and real-time.
*   **Responsiveness:** The layout must be fluid. Graphs must resize using responsive containers (e.g., CSS Grid/Flexbox) for both desktop monitors and tablets.
*   **Accessibility:** ARIA labels on all sliders. High-contrast colors for the different curves (e.g., avoiding red/green overlap for colorblind users).

## 5. Development Strategy for AI Coding Agents
*   *Agents should build modules independently.* Start with a foundational framework (Next.js/React layout).
*   Create a reusable generic Graph Component (using a library like Recharts or Chart.js) before hardcoding specific economic modules.
*   Focus heavily on React state management (`useState` / `useMemo`) as the mathematical relationship between the variables (Price, Quantity, Utility) is the core logic.
