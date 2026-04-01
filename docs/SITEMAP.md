# Site Map: Interactive Economics Explorer

## 🗺️ Information Architecture

The application is structured to guide the user from a high-level overview down into specific, interactive modules.

```mermaid
graph TD
    Home[🏠 Home / Landing Page]
    
    Home --> Modules[📚 Core Modules Menu]
    Home --> About[ℹ️ About the Project]
    Home --> Assess[✅ Market Master Quiz]
    
    %% Modules Breakdown
    Modules --> SupDem[📈 Supply & Demand Sandbox]
    Modules --> Utility[🍕 The Pizza Party (Marginal Utility)]
    Modules --> Elasticity[📏 The Rubber Band (Price Elasticity)]
    Modules --> OppCost[⏳ The 24-Hour Pie (Opportunity Cost)]
    
    %% Sub-views inside Modules
    SupDem --> SupDemInfo[Theory Breakdown]
    SupDem --> SupDemPlay[Interactive Simulation]
    
    Utility --> UtilInfo[Theory Breakdown]
    Utility --> UtilPlay[Interactive Simulation]
    
    Elasticity --> ElastInfo[Theory Breakdown]
    Elasticity --> ElastPlay[Interactive Simulation]
    
    OppCost --> OppInfo[Theory Breakdown]
    OppCost --> OppPlay[Interactive Simulation]
    
    %% Post Quiz
    Assess --> QuizResults[🏆 Results & Review]
```

---

## 📄 Page Breakdown & URL Structure

### 1. `/` (Home)
*   **Hero Section:** High-quality, engaging headline ("Stop Memorizing Economics. Start Playing It.") with an interactive floating graph animation.
*   **Feature Grid:** Quick links to the four primary modules with a 1-sentence teaser.
*   **Call to Action:** "Jump right into the Market Sandbox."

### 2. `/modules` (Module Directory)
*   A visual grid or carousel of all available economic simulations.

### 3. `/modules/supply-and-demand`
*   **Top Theory Section (Hidden/Collapsible):** A quick 2-minute read on what shifts the curves.
*   **Main Stage (The Sandbox):** The expansive HTML Canvas / SVG chart where users grab scenarios to shift the equilibrium.

### 4. `/modules/marginal-utility`
*   **Top Theory Section:** Explaining the difference between total satisfaction and diminishing returns.
*   **Main Stage (The Pizza Party):** The dual-axis chart mapping utility per slice eaten.

### 5. `/modules/price-elasticity`
*   **Top Theory Section:** Explaining how people react differently to price changes depending on the item.
*   **Main Stage (The Rubber Band):** The elasticity toggles acting simultaneously with a price slider.

### 6. `/modules/opportunity-cost`
*   **Top Theory Section:** Explaining the concept that "there's no such thing as a free lunch" and finite resources.
*   **Main Stage (The Pie Chart/PPF):** The draggable pie chart demonstrating trade-offs.

### 7. `/assessment` (Market Master Quiz)
*   A 10-question multiple-choice quiz where the *answers* are interactive sliders.
*   For example: *"A celebrity endorses this shoe. Show me what happens to the demand curve."*

### 8. `/about`
*   Project goals, acknowledgments, and technical information detailing the mathematical backend (React state + equation modeling) that drives the simulations.
