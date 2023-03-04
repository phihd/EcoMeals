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
  // Define states
  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
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

  const handleDietaryRestrictionChange = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter(item => item !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
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
        <h1>EcoMeals</h1>
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
            ))}
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
          <label className="checkbox">
            <input type="checkbox" id="myCheckbox" value="vegan" checked={dietaryPrefs.includes('vegan')} onChange={() => handleDietaryPrefChange('vegan')} />
            <span className="checkmark"></span>
            Vegan
          </label>
          <label className="checkbox">
            <input type="checkbox" value="gluten-free" checked={dietaryPrefs.includes('gluten-free')} onChange={() => handleDietaryPrefChange('gluten-free')} />
            <span className="checkmark"></span>
            Gluten-free
          </label>
          <label className="checkbox">
            <input type="checkbox" value="organic" checked={dietaryPrefs.includes('organic')} onChange={() => handleDietaryPrefChange('organic')} />
            <span className="checkmark"></span>
            Organic
          </label>
          <label className="checkbox">
            <input type="checkbox" value="low-carb" checked={dietaryPrefs.includes('low-carb')} onChange={() => handleDietaryPrefChange('low-carb')} />
            <span className="checkmark"></span>
            Low-carb
          </label>
          <label className="checkbox">
            <input type="checkbox" value="paleo" checked={dietaryPrefs.includes('paleo')} onChange={() => handleDietaryPrefChange('paleo')} />
            <span className="checkmark"></span>
            Paleo
          </label>
          <label>
            <input type="checkbox" value="kosher" checked={dietaryPrefs.includes('kosher')} onChange={() => handleDietaryPrefChange('kosher')} />
            <span className="checkmark"></span>
            Kosher
          </label>
          <label className="checkbox">
            <input type="checkbox" value="halal" checked={dietaryPrefs.includes('halal')} onChange={() => handleDietaryPrefChange('halal')} />
            <span className="checkmark"></span>
            Halal
          </label>
          <label className="checkbox">
            <input type="checkbox" value="dairy-free" checked={dietaryRestrictions.includes('dairy-free')} onChange={() => handleDietaryRestrictionChange('dairy-free')} />
            <span className="checkmark"></span>
            Dairy-free
          </label>
          <label className="checkbox">
            <input type="checkbox" value="nut-free" checked={dietaryRestrictions.includes('nut-free')} onChange={() => handleDietaryRestrictionChange('nut-free')} />
            <span className="checkmark"></span>
            Nut-free
          </label>
          <label className="checkbox">
            <input type="checkbox" value="soy-free" checked={dietaryRestrictions.includes('soy-free')} onChange={() => handleDietaryRestrictionChange('soy-free')} />
            <span className="checkmark"></span>
            Soy-free
          </label>
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