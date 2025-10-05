/**
 * Mock data for supermarket prices and climate impact
 * This simulates data that would come from a real supermarket API
 */

// Mock supermarket data with prices and climate impact
const MOCK_SUPERMARKET_DATA = {
  // Produce
  'apple': [
    { name: 'Local Organic Apples', price: 2.50, milesTraveled: 15, co2Impact: 0.3, emoji: '🍎', unit: 'kg', description: 'Local organic, minimal packaging' },
    { name: 'Conventional Apples', price: 1.80, milesTraveled: 45, co2Impact: 0.8, emoji: '🍎', unit: 'kg', description: 'Standard supermarket variety' },
    { name: 'Imported Apples', price: 2.20, milesTraveled: 120, co2Impact: 1.2, emoji: '🍎', unit: 'kg', description: 'Imported from Spain' }
  ],
  'banana': [
    { name: 'Fair Trade Bananas', price: 1.20, milesTraveled: 200, co2Impact: 0.9, emoji: '🍌', unit: 'bunch', description: 'Fair trade, sustainable farming' },
    { name: 'Conventional Bananas', price: 0.90, milesTraveled: 250, co2Impact: 1.1, emoji: '🍌', unit: 'bunch', description: 'Standard supermarket variety' },
    { name: 'Organic Bananas', price: 1.50, milesTraveled: 180, co2Impact: 0.7, emoji: '🍌', unit: 'bunch', description: 'Organic, slightly higher price' }
  ],
  'milk': [
    { name: 'Local Dairy Milk', price: 1.10, milesTraveled: 25, co2Impact: 0.4, emoji: '🥛', unit: '1L', description: 'Local dairy, glass bottle' },
    { name: 'Oat Milk', price: 1.80, milesTraveled: 30, co2Impact: 0.2, emoji: '🌾', unit: '1L', description: 'Plant-based, lower impact' },
    { name: 'Conventional Milk', price: 0.95, milesTraveled: 60, co2Impact: 0.6, emoji: '🥛', unit: '1L', description: 'Standard supermarket milk' }
  ],
  'bread': [
    { name: 'Local Bakery Bread', price: 2.20, milesTraveled: 5, co2Impact: 0.2, emoji: '🍞', unit: 'loaf', description: 'Fresh from local bakery' },
    { name: 'Whole Grain Bread', price: 1.50, milesTraveled: 40, co2Impact: 0.5, emoji: '🍞', unit: 'loaf', description: 'Supermarket whole grain' },
    { name: 'White Bread', price: 1.20, milesTraveled: 50, co2Impact: 0.6, emoji: '🍞', unit: 'loaf', description: 'Standard white bread' }
  ],
  'chicken': [
    { name: 'Free Range Chicken', price: 8.50, milesTraveled: 20, co2Impact: 1.8, emoji: '🐔', unit: 'kg', description: 'Free range, local farm' },
    { name: 'Organic Chicken', price: 12.00, milesTraveled: 15, co2Impact: 1.2, emoji: '🐔', unit: 'kg', description: 'Organic, higher welfare' },
    { name: 'Conventional Chicken', price: 6.50, milesTraveled: 80, co2Impact: 2.5, emoji: '🐔', unit: 'kg', description: 'Standard supermarket chicken' }
  ],
  'cheese': [
    { name: 'Local Artisan Cheese', price: 4.50, milesTraveled: 10, co2Impact: 0.8, emoji: '🧀', unit: '200g', description: 'Local artisan, minimal packaging' },
    { name: 'Organic Cheddar', price: 3.80, milesTraveled: 35, co2Impact: 1.1, emoji: '🧀', unit: '200g', description: 'Organic supermarket cheese' },
    { name: 'Processed Cheese', price: 2.20, milesTraveled: 60, co2Impact: 1.4, emoji: '🧀', unit: '200g', description: 'Processed, longer shelf life' }
  ],
  'rice': [
    { name: 'Local Brown Rice', price: 2.80, milesTraveled: 20, co2Impact: 0.3, emoji: '🍚', unit: 'kg', description: 'Local brown rice, minimal packaging' },
    { name: 'Basmati Rice', price: 3.20, milesTraveled: 150, co2Impact: 0.9, emoji: '🍚', unit: 'kg', description: 'Imported basmati rice' },
    { name: 'White Rice', price: 1.50, milesTraveled: 100, co2Impact: 0.7, emoji: '🍚', unit: 'kg', description: 'Standard white rice' }
  ],
  'tomato': [
    { name: 'Local Tomatoes', price: 3.50, milesTraveled: 8, co2Impact: 0.2, emoji: '🍅', unit: 'kg', description: 'Local greenhouse tomatoes' },
    { name: 'Organic Tomatoes', price: 4.20, milesTraveled: 25, co2Impact: 0.4, emoji: '🍅', unit: 'kg', description: 'Organic, slightly higher price' },
    { name: 'Conventional Tomatoes', price: 2.80, milesTraveled: 80, co2Impact: 0.8, emoji: '🍅', unit: 'kg', description: 'Standard supermarket tomatoes' }
  ]
}

// Function to find alternatives for an item
export const getMockAlternatives = async (item) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const itemName = item.name.toLowerCase()
  
  // Try to find exact match first
  for (const [key, alternatives] of Object.entries(MOCK_SUPERMARKET_DATA)) {
    if (itemName.includes(key)) {
      return alternatives
    }
  }
  
  // If no exact match, try to find by category
  const category = item.category || 'other'
  let alternatives = []
  
  switch (category) {
    case 'produce':
      alternatives = MOCK_SUPERMARKET_DATA.apple
      break
    case 'dairy':
      alternatives = MOCK_SUPERMARKET_DATA.milk
      break
    case 'grains':
      alternatives = MOCK_SUPERMARKET_DATA.bread
      break
    case 'protein':
      alternatives = MOCK_SUPERMARKET_DATA.chicken
      break
    default:
      // Generate generic alternatives
      alternatives = [
        { 
          name: `Local ${item.name}`, 
          price: 2.50, 
          milesTraveled: 15, 
          co2Impact: 0.3, 
          emoji: '🛍️', 
          unit: 'item',
          description: 'Local option, minimal impact'
        },
        { 
          name: `Standard ${item.name}`, 
          price: 1.80, 
          milesTraveled: 45, 
          co2Impact: 0.8, 
          emoji: '🛍️', 
          unit: 'item',
          description: 'Conventional supermarket option'
        },
        { 
          name: `Premium ${item.name}`, 
          price: 3.20, 
          milesTraveled: 30, 
          co2Impact: 0.5, 
          emoji: '🛍️', 
          unit: 'item',
          description: 'Premium quality option'
        }
      ]
  }
  
  return alternatives
}

// Function to get all available categories
export const getCategories = () => {
  return Object.keys(MOCK_SUPERMARKET_DATA)
}

// Function to get items by category
export const getItemsByCategory = (category) => {
  return MOCK_SUPERMARKET_DATA[category] || []
}

export default MOCK_SUPERMARKET_DATA
