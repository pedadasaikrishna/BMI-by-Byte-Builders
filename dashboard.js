// dashboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOYMVxySSSoSD0XqmadzzFedU1jjkJV6E",
  authDomain: "saikrishna-e2c71.firebaseapp.com",
  databaseURL: "https://saikrishna-e2c71-default-rtdb.firebaseio.com",
  projectId: "saikrishna-e2c71",
  storageBucket: "saikrishna-e2c71.appspot.com", // Corrected this line
  messagingSenderId: "136963885829",
  appId: "1:136963885829:web:ea4476388c19a37795c56c",
  measurementId: "G-52WNM7FWZW"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Elements
const heightIn = document.getElementById('height');
const weightIn = document.getElementById('weight');
const calcBtn = document.getElementById('calc-btn');
const bmiResult = document.getElementById('bmi-result');
const dietPlanEl = document.getElementById('diet-plan');


const welcomeEl = document.getElementById('welcome'); 

onAuthStateChanged(auth, user => {
  if (user) {
    const name = user.displayName|| localStorage.getItem('userName') || user.email.split('@')[0];

    

    welcomeEl.textContent = `👋 Welcome, ${name}!`;
  } else {
    window.location.href = "login.html";
  }
});
// Logout function
window.logout = () => {
  signOut(auth).then(() => window.location.href = "login.html");
};

const dietPlans = {
  Underweight: {
    meals: {
      Breakfast: "🥣 Oatmeal with whole milk, chopped nuts, honey, and banana slices.",
      Snack: "🥜 Peanut butter on whole-grain toast + a glass of mango smoothie.",
      Lunch: "🍗 Grilled chicken sandwich with cheese, avocado, and a fruit smoothie.",
      Snack2: "🧀 Cheese cubes with grapes or a protein bar.",
      Dinner: "🐟 Baked salmon with quinoa and steamed veggies (broccoli, carrots)."
    },
    tip: "🧠 Tip: Include calorie-dense snacks between meals and stay hydrated with healthy smoothies."
  },
  Normal: {
    meals: {
      Breakfast: "🍓 Greek yogurt with mixed berries and a spoon of chia seeds.",
      Snack: "🍎 Apple slices with almond butter.",
      Lunch: "🥪 Whole-grain wrap with lean turkey, lettuce, tomato, and hummus.",
      Snack2: "🥛 A glass of buttermilk or low-fat smoothie.",
      Dinner: "🥗 Brown rice bowl with grilled vegetables and tofu or paneer."
    },
    tip: "💡 Tip: Maintain a balanced routine of whole foods, hydration, and 30 mins of daily activity."
  },
  Overweight: {
    meals: {
      Breakfast: "🍳 Egg-white omelet with spinach and tomatoes + 1 slice of whole-grain toast.",
      Snack: "🍌 A banana or handful of almonds.",
      Lunch: "🥗 Grilled fish salad with olive oil dressing and quinoa on the side.",
      Snack2: "🥤 Green tea and carrot sticks.",
      Dinner: "🍲 Stir-fried tofu with broccoli, bell peppers, and brown rice."
    },
    tip: "🔥 Tip: Focus on portion control, light meals at night, and reduce sugar intake."
  },
  Obese: {
    meals: {
      Breakfast: "🥬 Spinach, cucumber & apple smoothie with protein powder.",
      Snack: "🥒 Sliced cucumbers with hummus.",
      Lunch: "🥦 Mixed greens salad with grilled chicken breast and lemon vinaigrette.",
      Snack2: "🍵 Herbal tea + roasted chickpeas.",
      Dinner: "🍛 Steamed vegetables with grilled tofu and a side of dal or lentil soup."
    },
    tip: "⚠️ Tip: Aim for low-carb, high-fiber meals. Walk after meals and limit processed foods."
  }
};


let currentCategory = '';

// BMI Calculation
calcBtn.addEventListener('click', () => {
  const h = parseFloat(heightIn.value);
  const w = parseFloat(weightIn.value);

  if (!h || !w) {
    bmiResult.textContent = "⚠️ Please enter valid height and weight.";
    dietPlanEl.innerHTML = '';
    return;
  }

  const bmi = (w / ((h / 100) ** 2)).toFixed(1);

  if (bmi < 18.5) currentCategory = 'Underweight';
  else if (bmi < 25) currentCategory = 'Normal';
  else if (bmi < 30) currentCategory = 'Overweight';
  else currentCategory = 'Obese';

  bmiResult.innerHTML = `Your BMI: <strong>${bmi}</strong> — <strong>${currentCategory}</strong>`;

  dietPlanEl.innerHTML = `
    <button class="generate-btn" id="gen-diet-btn">🍽️ Generate a Diet Plan for You</button>
  `;

  document.getElementById('gen-diet-btn').addEventListener('click', () => {
    renderDietPlan(currentCategory);
  });
});

// Diet Plan Renderer
function renderDietPlan(category) {
  const { meals, tip } = dietPlans[category];

  dietPlanEl.innerHTML = `
    <h3>🥗 Personalized Diet Plan for <span>${category}</span></h3>
    <div class="diet-cards">
      ${Object.entries(meals).map(
        ([mealTime, content]) => `
        <div class="meal-card">
          <h4>${mealTime}</h4>
          <p>${content}</p>
        </div>`
      ).join("")}
    </div>
    <div class="diet-tip">
      <strong>${tip}</strong>
    </div>
  `;
}
