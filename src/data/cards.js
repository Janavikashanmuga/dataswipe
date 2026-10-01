export const DECKS = [
  {
    id: "deck-1",
    title: "Classification vs Regression",
    description: "Identify whether the problem predicts categories or continuous numbers.",
    cards: [
      {
        id: "c1",
        scenario: "Predicting whether an incoming email is 'Spam' or 'Not Spam'.",
        left: { label: "Regression", isCorrect: false },
        right: { label: "Classification", isCorrect: true },
        explanation: "Because 'Spam' and 'Not Spam' are distinct categories (discrete labels), this is a Classification problem."
      },
      {
        id: "c2",
        scenario: "Estimating the sale price of a house based on square meters and location.",
        left: { label: "Classification", isCorrect: false },
        right: { label: "Regression", isCorrect: true },
        explanation: "House price is a continuous numerical value (e.g., €340,000), making it a Regression task."
      },
      {
        id: "c3",
        scenario: "Diagnosing whether a patient has Diabetes (Positive or Negative).",
        left: { label: "Regression", isCorrect: false },
        right: { label: "Classification", isCorrect: true },
        explanation: "Predicting discrete categories or binary health outcomes is a classic Classification task."
      },
      {
        id: "c4",
        scenario: "Forecasting tomorrow's exact temperature in degrees Celsius.",
        left: { label: "Classification", isCorrect: false },
        right: { label: "Regression", isCorrect: true },
        explanation: "Temperature is a continuous numerical measurement, so predicting it requires a Regression model."
      },
      {
        id: "c5",
        scenario: "Predicting customer churn: will a subscriber cancel their subscription this month? (Yes / No)",
        left: { label: "Regression", isCorrect: false },
        right: { label: "Classification", isCorrect: true },
        explanation: "Yes/No decisions are binary outcomes, which fall strictly under Classification."
      },
      {
        id: "c6",
        scenario: "Predicting the total number of ride-share bookings in Berlin next Friday night.",
        left: { label: "Classification", isCorrect: false },
        right: { label: "Regression", isCorrect: true },
        explanation: "Counting an aggregate continuous quantity (number of rides) is a Regression/forecasting task."
      }
    ]
  }
];