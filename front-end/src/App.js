import React, { useState } from 'react';
import './App.css';

// Import pictures from local files
import matchaCake from './images/matcha_cake.png';
import mochi from './images/mochi.webp';
import pho from './images/pho.jpeg';
import pokeBowl from './images/poke_bowl.webp';


function App() {
  const meals = [
    {
      'id': '0001',
      'name': 'Matcha cake',
      'img': matchaCake,
      'description': 'A light and fluffy sponge cake flavored with matcha power, aka green tea powder.'
    },
    {
      'id': '0002',
      'name': 'Mochi',
      'img': mochi,
      'description': 'Japanese dessert made from a sweet pounded rice dough wrapped around ice cream.'
    },
    {
      'id': '0003',
      'name': 'Pho',
      'img': pho,
      'description': `Vietnamese soup consisting of bone broth, rice noodles, and thinly sliced meat (usually beef).
      It may also be served with bean sprouts, fresh herbs, limes, chiles, and other garnishes.`
    },
    {
      'id': '0004',
      'name': 'Poke bowl',
      'img': pokeBowl,
      'description': `Hawaiian combine diced salmon, soy sauce, vinegar, sriracha, and sesame oil.`
    }
  ]

  const dietaryPrefsCheckBoxes = ['Vegan', 'Gluten-free', 'Organic', 'Low-carb', 'Paleo', 'Kosher', 'Halal', 'Dairy-free', 'Nut-free', 'Soy-free'];

  // Define states
  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState(['']);
  const [subscription, setSubscription] = useState({
    plan: '',
    deliveryFrequency: '',
    deliveryAddress: '',
    paymentMethod: ''
  });

  // Define handler functions
  const handleDietaryPrefChange = (pref: string) => {
    if (dietaryPrefs.includes(pref)) {
      setDietaryPrefs(dietaryPrefs.filter(item => item !== pref));
    } else {
      setDietaryPrefs([...dietaryPrefs, pref]);
    }
  }

  function handleSelectMeal(meal) {
    if (selectedMeals.includes(meal))
      return
    setSelectedMeals([...selectedMeals, meal]);
  }

  const handleSubscriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubscription({
      ...subscription,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ECOMEALS</h1>
        <p>Browse our selection of sustainable, plant-based meals and customize your subscription!</p>
      </header>
      <main>
        <ul>
          <li className="meal-grid">
            {meals.map((meal) => (
              <div key={meal.id} className="meal-option">
                <h3>{meal.name}</h3>
                <img src={meal.img} height="500" width="750" alt={meal.name} />
                <p>{meal.description}</p>
                <button onClick={() => handleSelectMeal(meal.id)}>
                  Add to Cart
                </button>
              </div>
            )
            )}
          </li>
        </ul>
        <h3>Selected meals:</h3>
          <ul>
            {selectedMeals.map((id) => {
              const meal = meals.find((meal) => meal.id === id);
              return meal && <li key={id}>{meal.name}</li>;
            })}
          </ul>
        <h2>Select Dietary Preferences and Restrictions</h2>
        <p>Click on each option to select or deselect</p>
        <div className="checkbox-row">
          {dietaryPrefsCheckBoxes.map((dietaryPref) => (
              <label className="checkbox" key={dietaryPref}>
                <input
                  value={dietaryPref}
                  checked={dietaryPrefs.includes(dietaryPref)}
                  onChange={() => handleDietaryPrefChange(dietaryPref)}
                  type="checkbox"
                />
                <span className="checkmark"></span>
                {dietaryPref}
              </label>
            )
          )}
        </div>
        <h2>Manage Subscription Details</h2>
        <form>
          <label>
            Plan:
            <select name="plan" value={subscription.plan} onChange={handleSubscriptionChange}>
              <option value="">Select a plan</option>
              <option value="basic">Basic (3 meals/week)</option>
              <option value="standard">Standard (5 meals/week)</option>
              <option value="premium">Premium (7 meals/week)</option>
            </select>
          </label>
          <label>
            Delivery Frequency:
            <select name="deliveryFrequency" value={subscription.deliveryFrequency} onChange={handleSubscriptionChange}>
              <option value="">Select a frequency</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          <label>
            Delivery Address:
            <input type="text" name="deliveryAddress" value={subscription.deliveryAddress} onChange={handleSubscriptionChange} />
          </label>
          <label>
            Payment Method:
            <select name="paymentMethod" value={subscription.paymentMethod} onChange={handleSubscriptionChange}>
              <option value="">Select a payment method</option>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="venmo">Venmo</option>
            </select>
          </label>
        </form>
      </main>
    </div>
  );
}

export default App;