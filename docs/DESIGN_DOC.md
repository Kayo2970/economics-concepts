# System Design Document: Interactive Economics Explorer

## 1. Architecture Overview
**Frontend Framework:** React (via Next.js or Vite). Next.js is preferred for its static generation, SEO optimizations, and built-in routing.
**Styling Library:** TailwindCSS for rapid, responsive UI creation, complemented by Framer Motion for complex animations (e.g., bouncing the equilibrium point).
**Charting Engine:** Recharts, Chart.js, or D3.js. Recharts is highly recommended due to its seamless React integration and out-of-the-box responsiveness.
**State Management:** React Context API or Zustand. Redux is over-engineered for this use case; Zustand provides a lightweight global store perfect for tracking variables like global Price and Quantity.

## 2. Directory Structure & Component Hierarchy

```
/src
  /components
    /charts
      LineChart.tsx (Generic line chart wrapper)
      MarginalUtilityChart.tsx (Dual-axis chart)
      SupplyDemandChart.tsx (Intersection-finding chart)
    /controls
      SliderControl.tsx (Reusable styled input type="range")
      ToggleSwitch.tsx
      ScenarioCard.tsx (Draggable options)
    /layout
      Navbar.tsx
      Sidebar.tsx
      PageWrapper.tsx
  /modules
    SupplyDemandSandbox.tsx
    UtilityPizzaParty.tsx
    ElasticityRevenue.tsx
    OpportunityCostPie.tsx
  /utils
    economicsMath.ts (Helper functions: calculate intersection, derive marginal from total)
  /store
    useSimulationStore.ts (Zustand state)
```

## 3. Core Engine: The Mathematics of the Web App
*   *Crucial for the AI Agent:* The frontend must not hardcode static points on the graphs. The lines must be generated from equations.
*   **Supply Equation:** \( Q_s = c + dP \) (Upward sloping: Quantity Supplied = intercept + slope × Price)
*   **Demand Equation:** \( Q_d = a - bP \) (Downward sloping: Quantity Demanded = intercept - slope × Price)
*   Equilibrium Point `(P*, Q*)` is found where \( Q_s = Q_d \).
*   **The Shift Mechanism:** When a user pulls a "Consumer Income" slider, the app modifies the intercept variable (\(a\)) of the demand equation and recalculates the equilibrium point.

### New Module Math Specs:

#### 1. Demand Forecasting (Linear Trend)
*   **Slope (b):** \([n(\Sigma ty) - (\Sigma t)(\Sigma y)] / [n(\Sigma t^2) - (\Sigma t)^2]\)
*   **Intercept (a):** \([\Sigma y - b(\Sigma t)] / n\)
*   *Application:* The app will take user-moved "history points" (t, y) and dynamically solve for `a` and `b` to render the predictive line.

#### 2. Consumer Equilibrium (Ordinal IC Approach)
*   **Marginal Rate of Substitution (MRS):** \( \Delta Y / \Delta X \)
*   **Condition:** Equilibrium exists where \( MRS_{xy} = P_x / P_y \).
*   *Visual:* The app will render \( Y = k / X \) for Indifference Curves (Convex) and \( Y = (Income/P_y) - (P_x/P_y)X \) for the Budget Line. Solving for the tangency point.

#### 3. Macroeconomic Policy Simulation
*   **Repo Rate Impact:** Inverse relationship with Investment (I).
*   **Fiscal Impact:** Multiplier effect \( 1 / (1 - MPC) \).
*   The system uses a simple model to show how increasing interest rates (Repo) dampens GDP output while increasing Government Spending (G) expands it.

## 4. Design Guidelines (UI/UX)
**Theme:** "Modern Academia." Clean, polished, and vibrant.
**Color Palette:**
*   Primary Brand: Slate Blue (`bg-slate-800` for dark themes).
*   Demand Curves: Emerald Green (Psychological tie to "Money/Desire").
*   Supply Curves: Amethyst Purple or Azure Blue.
*   Warning/Negative Utilities: Crimson Red.
**Typography:** *Inter* or *Roboto* for clear, legible UI text; *Merriweather* for explanatory academic paragraphs.
**Animations:**
*   *Smooth Transitions:* When a curve shifts, it must animate to the new state (e.g., easing function), rather than instantly popping, so the student can trace the movement.
*   *Pulse Effects:* The Equilibrium dot should have a subtle drop-shadow radar ping effect to draw the user's eye.

## 5. Security & Deployment Strategy
*   Since this is a client-side heavy application with no user authentication or database required for the MVP, the app will be statically built.
*   **Deployment Target:** Vercel or GitHub Pages. Both support pure frontend React apps efficiently.
*   **Testing:** Jest for unit testing the math utility functions inside `/utils/economicsMath.ts` ensuring equations always return the correct intersection coordinates before the UI attempts to render them.
