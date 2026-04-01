# 🎮 Interactive Sessions: Building the Web Experience

This document outlines the specific UI/UX designs and interactive components we will build for each economic concept. The goal is to make learning experiential, allowing students to "feel" the economics by manipulating variables and immediately seeing the results.

---

## 1. Supply and Demand: The Live Market Sandbox

**Goal:** Understand how external shocks create a new equilibrium price and quantity.

### The UI Layout:
*   **Center:** A large, interactive coordinate plane showing the Supply Curve (blue) and Demand Curve (green). The intersection point (Equilibrium) is highlighted with a pulse animation.
*   **Side Panel (The "Shocks"):** A series of scenario cards or sliders.

### The Interactive Mechanics:
1.  **"Scenario Drag & Drop":** Students drag a news headline (e.g., "New Technology Triples Wheat Production!") onto the graph. The app analyzes if it's a Supply or Demand shock and shifts the appropriate curve.
2.  **Manual Sliders:**
    *   `Consumer Income (Normal Good)` slider. Moving it right shifts the Demand curve right.
    *   `Raw Material Cost` slider. Moving it right shifts the Supply curve left.
3.  **Real-Time Feedback:** As the curves shift, a dashed line traces the new Equilibrium Price (P*) on the Y-axis and Equilibrium Quantity (Q*) on the X-axis, showing the exact percentage change.

---

## 2. The Law of Diminishing Marginal Utility: The Pizza Party

**Goal:** Visualize the difference between Total Utility and Marginal Utility.

### The UI Layout:
*   **Top Split:** An animated character sitting at a table with plates of pizza.
*   **Bottom Split:** A dual-axis chart. Bar chart for Total Utility (TU) and a line graph for Marginal Utility (MU).

### The Interactive Mechanics:
1.  **"Eat a Slice" Button:** Each click feeds the character one slice of pizza.
2.  **Visual Storytelling:**
    *   *Slice 1-3:* Character looks ecstatic. The MU line starts high but begins to slope down. The TU bars grow rapidly.
    *   *Slice 4-6:* Character looks satisfied but slowing down. MU line approaches zero. TU bars grow but very slowly.
    *   *Slice 7-8:* Character looks sick. MU line dips *below* zero (negative utility). TU bars actually start shrinking.
3.  **The "Ah-Ha" Moment:** A horizontal slider allows students to scrub back and forth through time to see the exact moment utility turns negative.

---

## 3. Price Elasticity of Demand: The Rubber Band Effect

**Goal:** Grasp how steepness relates to consumer sensitivity.

### The UI Layout:
*   **Main Graph:** A simple Demand curve.
*   **Product Selector:** A toggle switch between "Life-Saving Medicine" (Inelastic) and "Movie Tickets" (Elastic).

### The Interactive Mechanics:
1.  **The "Price Gun":** A vertical slider on the Y-axis controls the price. As the student drags the price up by 50%:
    *   *If Medicine is selected:* The Demand curve is nearly vertical. The quantity barely drops. A "Revenue" box flashes green, showing total revenue increased.
    *   *If Movie Tickets are selected:* The Demand curve is flat. A 50% price increase causes the quantity demanded to plummet by 80%. The "Revenue" box flashes red, showing massive losses.
2.  **Elasticity Tweaker:** A knob that lets students manually adjust the slope of the curve from steep to flat and watch how a fixed price change yields wildly different revenue outcomes.

---

## 4. Opportunity Cost: The 24-Hour pie chart

**Goal:** Internalize the concept that time/resources are finite.

### The UI Layout:
*   **Center:** A circular, interactive pie chart representing 24 hours in a day.
*   **Categories:** "Study for Exams," "Work Part-Time Job," "Sleep," "Leisure/Scrolling."

### The Interactive Mechanics:
1.  **Draggable Wedges:** Students grab the edge of the "Study" wedge and expand it from 2 hours to 6 hours.
2.  **The Trade-Off:** Because the pie *cannot* exceed 24 hours, expanding one wedge automatically forces another wedge to shrink. The interface literally forces them to choose what to give up.
3.  **The Scoreboard:**
    *   *Study hours up =* "Future Earnings Potential" score increases.
    *   *Sleep hours down =* "Next-Day Productivity" score plummets.
    *   This demonstrates that every choice has an *implicit* cost.

---

## 5. Demand Forecasting: The Predictive Playground
**Goal:** Visualize how historical trends inform future business decisions.

### The UI Layout:
*   A scatter plot showing historical data points (e.g., umbrella sales by month).
*   Toggle buttons labeled "Linear Trend" and "Moving Average."

### The Interactive Mechanics:
1.  **"Trend Drag":** As a student moves a singular historical data point up or down, the calculated regression line *lives-tilts* and recalculates its intercept.
2.  **"Scenario Forecast":** A slider that extends the line into the next 12 months, highlighting the confidence interval.

---

## 6. Consumer Equilibrium: The IC & Budget Balancer
**Goal:** Find the perfect consumption bundle given a limited budget.

### The UI Layout:
*   Left: A graph with Income (Y) and Quantity (X).
*   Right: Sliders for "Good X Price", "Good Y Price", and "Income."

### The Interactive Mechanics:
1.  **Budget Line Manipulation:** As prices change, the Budget Line pivots on the X or Y axis.
2.  **The Sweet Spot:** The Indifference Curve (IC) remains fixed. The student must manipulate the budget to reach the highest IC possible.
3.  **Optimal Bundle Pop-up:** When the Budget Line is perfectly tangent to the IC, a glowing dot appears at the equilibrium with the label "Utility Maximized!"
