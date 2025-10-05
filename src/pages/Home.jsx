import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cleanShoppingList } from '../api/openai'

const Home = () => {
  const [budget, setBudget] = useState('')
  const [shoppingList, setShoppingList] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!budget || !shoppingList.trim()) {
      alert('Please fill in both budget and shopping list')
      return
    }

    setIsLoading(true)
    
    try {
      // Clean the shopping list using OpenAI (mocked for now)
      const cleanedList = await cleanShoppingList(shoppingList)
      
      // Store data in localStorage for the next pages
      localStorage.setItem('budget', budget)
      localStorage.setItem('originalList', shoppingList)
      localStorage.setItem('cleanedList', JSON.stringify(cleanedList))
      localStorage.setItem('currentItemIndex', '0')
      localStorage.setItem('selectedItems', JSON.stringify([]))
      
      // Navigate to results page
      navigate('/results')
    } catch (error) {
      console.error('Error cleaning shopping list:', error)
      alert('Error processing your shopping list. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Start Your Climate-Conscious Shopping Journey
        </h2>
        <p className="text-lg text-gray-600">
          Enter your budget and shopping list to discover eco-friendly alternatives that save money and reduce your carbon footprint.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Budget Input */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Your Budget (£)
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input-field"
              placeholder="e.g., 50"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Shopping List Input */}
          <div>
            <label htmlFor="shoppingList" className="block text-sm font-medium text-gray-700 mb-2">
              Your Shopping List
            </label>
            <textarea
              id="shoppingList"
              value={shoppingList}
              onChange={(e) => setShoppingList(e.target.value)}
              className="input-field min-h-[120px] resize-none"
              placeholder="Enter your shopping items, one per line or separated by commas:&#10;e.g.,&#10;Apples&#10;Milk&#10;Bread&#10;Chicken breast"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate items with commas or new lines. Our AI will clean and organize your list.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing your list...
              </span>
            ) : (
              'Discover Eco-Friendly Alternatives'
            )}
          </button>
        </form>
      </div>

      {/* Features Preview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-eco-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🧠</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
          <p className="text-sm text-gray-600">Smart list cleaning and organization</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-eco-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💰</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Save Money</h3>
          <p className="text-sm text-gray-600">Find budget-friendly alternatives</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-eco-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🌍</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Reduce Impact</h3>
          <p className="text-sm text-gray-600">Lower your carbon footprint</p>
        </div>
      </div>
    </div>
  )
}

export default Home
