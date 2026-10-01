export const DECKS = [
  {
    id: "deck-1",
    title: "Classification vs Regression",
    category: "ML Foundations",
    description: "Identify whether a problem predicts categories or continuous numerical values.",
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
  },
  {
    id: "deck-2",
    title: "Supervised vs Unsupervised",
    category: "Learning Paradigms",
    description: "Determine whether the model learns from ground-truth labels or discovers hidden patterns.",
    cards: [
      {
        id: "s1",
        scenario: "Clustering online shoppers into behavioral segments without any predefined persona tags.",
        left: { label: "Supervised", isCorrect: false },
        right: { label: "Unsupervised", isCorrect: true },
        explanation: "There are no target labels or ground truth provided; the algorithm finds inherent groupings on its own."
      },
      {
        id: "s2",
        scenario: "Training an algorithm to detect credit card fraud using 50,000 past transactions verified by auditors.",
        left: { label: "Unsupervised", isCorrect: false },
        right: { label: "Supervised", isCorrect: true },
        explanation: "Because each training sample includes an explicit ground-truth label (fraud vs legitimate), it is Supervised learning."
      },
      {
        id: "s3",
        scenario: "Compressing a 100-feature dataset down to 5 principal components (PCA) for visualization.",
        left: { label: "Supervised", isCorrect: false },
        right: { label: "Unsupervised", isCorrect: true },
        explanation: "Dimensionality reduction techniques like PCA operate purely on feature variance without target labels."
      },
      {
        id: "s4",
        scenario: "Predicting a student's final exam grade from their homework completion rates and attendance logs.",
        left: { label: "Unsupervised", isCorrect: false },
        right: { label: "Supervised", isCorrect: true },
        explanation: "The model is trained against known historical outcome targets (final exam scores), making it Supervised."
      }
    ]
  },
  {
    id: "deck-3",
    title: "Continuous vs Categorical",
    category: "Data Types",
    description: "Classify whether a feature represents discrete categories or quantitative measurements.",
    cards: [
      {
        id: "d1",
        scenario: "A customer's preferred payment method: 'Credit Card', 'PayPal', or 'Bank Transfer'.",
        left: { label: "Continuous", isCorrect: false },
        right: { label: "Categorical", isCorrect: true },
        explanation: "Payment methods are qualitative categories without mathematical continuity or arithmetic meaning."
      },
      {
        id: "d2",
        scenario: "The duration of a user session on a mobile app measured in seconds (e.g., 14.82s).",
        left: { label: "Categorical", isCorrect: false },
        right: { label: "Continuous", isCorrect: true },
        explanation: "Session duration can take any fractional value within an interval, making it a continuous metric."
      },
      {
        id: "d3",
        scenario: "T-shirt sizes in an inventory catalog: 'Small', 'Medium', 'Large', 'XL'.",
        left: { label: "Continuous", isCorrect: false },
        right: { label: "Categorical", isCorrect: true },
        explanation: "These are discrete groups (specifically ordinal categorical data) rather than continuous measurements."
      },
      {
        id: "d4",
        scenario: "The latitude and longitude coordinates of an electric scooter parked on the street.",
        left: { label: "Categorical", isCorrect: false },
        right: { label: "Continuous", isCorrect: true },
        explanation: "GPS coordinates are real-valued numbers along a continuous spatial scale."
      }
    ]
  }
];