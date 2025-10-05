/**
 * OpenAI API integration for cleaning and processing shopping lists
 * This is a mock implementation for development - replace with actual OpenAI API calls
 */

// Mock function to simulate OpenAI API call
export const cleanShoppingList = async (rawList) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Parse the raw list (split by commas, newlines, or semicolons)
  const items = rawList
    .split(/[,\n;]/)
    .map(item => item.trim())
    .filter(item => item.length > 0)
    .map(item => ({
      name: item,
      originalText: item,
      category: categorizeItem(item)
    }))
  
  // Remove duplicates and clean up
  const uniqueItems = items.filter((item, index, self) => 
    index === self.findIndex(t => t.name.toLowerCase() === item.name.toLowerCase())
  )
  
  return uniqueItems
}

// Helper function to categorize items (for future use)
const categorizeItem = (itemName) => {
  const name = itemName.toLowerCase()
  
  if (name.includes('apple') || name.includes('banana') || name.includes('orange') || 
      name.includes('fruit') || name.includes('vegetable') || name.includes('carrot') ||
      name.includes('tomato') || name.includes('lettuce') || name.includes('spinach')) {
    return 'produce'
  }
  
  if (name.includes('milk') || name.includes('cheese') || name.includes('yogurt') ||
      name.includes('butter') || name.includes('cream')) {
    return 'dairy'
  }
  
  if (name.includes('bread') || name.includes('pasta') || name.includes('rice') ||
      name.includes('cereal') || name.includes('flour')) {
    return 'grains'
  }
  
  if (name.includes('chicken') || name.includes('beef') || name.includes('pork') ||
      name.includes('fish') || name.includes('meat')) {
    return 'protein'
  }
  
  return 'other'
}

// TODO: Replace with actual OpenAI API call
export const callOpenAI = async (prompt) => {
  // This is where you would make the actual OpenAI API call
  // Example implementation:
  /*
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that cleans and organizes shopping lists. Return only the cleaned items as a JSON array.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    })
  })
  
  const data = await response.json()
  return JSON.parse(data.choices[0].message.content)
  */
  
  // For now, return the mock data
  throw new Error('OpenAI API not implemented yet - using mock data')
}
