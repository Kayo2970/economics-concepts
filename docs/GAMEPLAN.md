# Project Game Plan: Interactive Economics Explorer

## 🎯 Objective
Create a modern, interactive web application that helps students visualize and experiment with fundamental economic principles. Instead of static text, students will "see" economics in action through dynamic simulations.

---

## 🧠 Core Economic Concepts to Feature

### 1. The Law of Diminishing Marginal Utility
*   **The Concept:** The more of a good someone consumes, the less *extra* satisfaction they get from each additional unit.
*   **Interactive Idea:** **"The Pizza Party Simulation."**
    *   A slider allows students to "eat" slices of pizza.
    *   A real-time bar chart shows "Total Utility" (rising) vs. "Marginal Utility" (falling).
    *   *Educational Trigger:* When Marginal Utility hits zero or becomes negative, the onscreen character's expression changes from happy to "too full."

### 2. Supply and Demand (Market Equilibrium)
*   **The Concept:** The interaction between the quantity of a product available and the desire for that product, determining the price.
*   **Interactive Idea:** **"Live Market Sandbox."**
    *   Students can drag the **Demand Curve** (simulating a celebrity endorsement) or the **Supply Curve** (simulating a factory strike).
    *   The "Equilibrium Point" (where they cross) moves dynamically, showing the resulting Price and Quantity.

### 3. Price Elasticity of Demand
*   **The Concept:** How sensitive the quantity demanded is to a change in price.
*   **Interactive Idea:** **"The Price Tag Challenge."**
    *   A toggle between "Necessities" (e.g., Insulin) and "Luxuries" (e.g., Diamond Watches).
    *   A slider to change the price.
    *   Visualizing how total revenue changes differently for elastic vs. inelastic goods.

### 4. Opportunity Cost
*   **The Concept:** The loss of potential gain from other alternatives when one alternative is chosen.
*   **Interactive Idea:** **"The Student's 24-Hour Clock."**
    *   A drag-and-drop scheduler. If a student chooses to "Study for 4 hours," they see what they "lost" (e.g., "Sleep" or "Socializing").

---

## 🔗 How Concepts Affect Each Other (The "Web of Economics")

*   **Marginal Utility → Demand:** We will show that the Demand Curve is actually derived from Marginal Utility. As satisfaction drops, consumers are only willing to buy more if the price is lower.
*   **Elasticity → Equilibrium:** We will demonstrate that if a product is highly *inelastic*, a small shift in supply (like a crop failure) causes a massive spike in price compared to an elastic good.

---

## 🛠️ Technical Implementation Strategy

### Phase 1: Foundation (Current)
*   Initialize repository and project structure.
*   Setup a basic Next.js or Vite environment with a premium design system.

### Phase 2: The Graphics Engine
*   Implement `Chart.js` or `D3.js` for the interactive graphs.
*   Create a "Glassmorphism" UI for a sleek, modern look.

### Phase 3: Interactive Modules
*   **Module A:** The Marginal Utility Slider.
*   **Module B:** The Supply/Demand Drag-and-Drop Graph.
*   **Module C:** The Elasticity Revenue Calculator.

### Phase 4: Gamification
*   Add a "Market Master" quiz where students must predict price movements based on news headlines (e.g., "New iPhone Released" -> Shift Demand Right).

---

## 🚀 Growth & Roadmap
*   **Level 2:** Macro-economics (Inflation, GDP, Fiscal Policy).
*   **Level 3:** Game Theory simulations (The Prisoner's Dilemma).
*   **Export Feature:** Allow students to export their graph "experiments" as PDFs for school assignments.
