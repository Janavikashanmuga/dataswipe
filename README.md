# DataSwipe

**DataSwipe** is an interactive, micro-learning web application engineered to accelerate conceptual intuition in Machine Learning, Data Science, and statistical modeling.

By abstracting complex analytical problem formulations into scenario-driven, binary-decision mechanics, DataSwipe bridges the gap between theoretical definitions and applied problem-solving.

---

## Architecture & Design Principles

Traditional data science curricula often introduce syntax and tooling before developing structural intuition. DataSwipe prioritizes rapid pattern recognition:

* **Scenario-Based Evaluation:** Learners analyze real-world engineering constraints to categorize problems (e.g., Supervised vs. Unsupervised, Classification vs. Continuous Regression).
* **Low-Latency Feedback Loop:** Immediate validation with domain-specific rationale reinforces retention without interrupting workflow momentum.
* **Client-First Persistence:** Session state, completion metrics, and mastery tracking persist locally with zero authentication friction.
* **Responsive, Touch-Optimized UI:** Designed mobile-first using gesture physics for seamless cross-platform utility.

---

## Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Runtime & Build** | Node.js, Vite |
| **UI Framework** | React 18 / 19 |
| **Styling & Design System** | Tailwind CSS |
| **Physics & Interactions** | Motion (`motion/react`) |
| **Icons** | Lucide React |
| **Feedback Effects** | Canvas Confetti |

---

## Project Structure

```text
dataswipe/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components (SwipeCard, Feedback, Controls)
│   ├── data/            # Structured JSON question decks
│   ├── App.jsx          # Core session state and orchestration
│   ├── index.css        # Global CSS & Tailwind configuration
│   └── main.jsx         # Application entry point
├── package.json         # Package manifests and build scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration