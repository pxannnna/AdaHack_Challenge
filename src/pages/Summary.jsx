import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Load data from localStorage
    const budget = localStorage.getItem('budget')
    const originalList = localStorage.getItem('originalList')
    const selectedItems = localStorage.getItem('selectedItems')

    if (!budget || !selectedItems) {
      navigate('/')
      return
    }

    // Calculate summary data
    const items = JSON.parse(selectedItems)
    const originalBudget = parseFloat(budget)
    
    // Calculate totals
    const totalCost = items.reduce((sum, item) => sum + (item?.price || 0), 0)
    const totalMiles = items.reduce((sum, item) => sum + (item?.milesTraveled || 0), 0)
    const totalCO2 = items.reduce((sum, item) => sum + (item?.co2Impact || 0), 0)
    
    // Calculate savings (assuming original items would cost 20% more on average)
    const estimatedOriginalCost = totalCost * 1.2
    const moneySaved = estimatedOriginalCost - totalCost
    const budgetRemaining = originalBudget - totalCost

    // Calculate CO2 reduction (assuming original items would have 30% more impact)
    const estimatedOriginalCO2 = totalCO2 * 1.3
    const co2Reduced = estimatedOriginalCO2 - totalCO2

    setSummaryData({
      budget: originalBudget,
      totalCost,
      moneySaved,
      budgetRemaining,
      totalMiles,
      totalCO2,
      co2Reduced,
      itemCount: items.length,
      items
    })
  }, [navigate])

  const handleStartOver = () => {
    // Clear localStorage
    localStorage.removeItem('budget')
    localStorage.removeItem('originalList')
    localStorage.removeItem('cleanedList')
    localStorage.removeItem('currentItemIndex')
    localStorage.removeItem('selectedItems')
    
    // Navigate to home
    navigate('/')
  }

  if (!summaryData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-eco-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Your Climate-Conscious Shopping Summary
        </h2>
        <p className="text-lg text-gray-600">
          Great job! Here's how your choices impacted your wallet and the planet.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Cost */}
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💰</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Total Cost</h3>
          <p className="text-2xl font-bold text-blue-600">£{summaryData.totalCost.toFixed(2)}</p>
          <p className="text-sm text-gray-500">of £{summaryData.budget} budget</p>
        </div>

        {/* Money Saved */}
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💚</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Money Saved</h3>
          <p className="text-2xl font-bold text-green-600">£{summaryData.moneySaved.toFixed(2)}</p>
          <p className="text-sm text-gray-500">vs. conventional choices</p>
        </div>

        {/* CO2 Impact */}
        <div className="card text-center">
          <div className="w-12 h-12 bg-eco-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🌱</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">CO₂ Reduced</h3>
          <p className="text-2xl font-bold text-eco-green-600">{summaryData.co2Reduced.toFixed(1)}kg</p>
          <p className="text-sm text-gray-500">carbon footprint</p>
        </div>

        {/* Miles Traveled */}
        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🚛</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Miles Traveled</h3>
          <p className="text-2xl font-bold text-orange-600">{summaryData.totalMiles.toFixed(0)}</p>
          <p className="text-sm text-gray-500">total distance</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Financial Impact */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">💳</span>
            Financial Impact
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Original Budget:</span>
              <span className="font-medium">£{summaryData.budget.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Spent:</span>
              <span className="font-medium">£{summaryData.totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Budget Remaining:</span>
              <span className="font-medium text-green-600">£{summaryData.budgetRemaining.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Money Saved:</span>
                <span className="font-bold text-green-600">£{summaryData.moneySaved.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">🌍</span>
            Environmental Impact
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total CO₂ Impact:</span>
              <span className="font-medium">{summaryData.totalCO2.toFixed(1)}kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CO₂ Reduced:</span>
              <span className="font-medium text-eco-green-600">{summaryData.co2Reduced.toFixed(1)}kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Miles Traveled:</span>
              <span className="font-medium">{summaryData.totalMiles.toFixed(0)} miles</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Items Selected:</span>
                <span className="font-bold text-eco-green-600">{summaryData.itemCount} items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Items List */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">🛒</span>
          Your Selected Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summaryData.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.emoji || '🛍️'}</span>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.milesTraveled}mi • {item.co2Impact}kg CO₂
                  </p>
                </div>
              </div>
              <span className="font-semibold text-gray-900">£{item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleStartOver}
          className="btn-primary px-8 py-3"
        >
          Start New Shopping List
        </button>
        <button
          onClick={() => window.print()}
          className="btn-secondary px-8 py-3"
        >
          Print Summary
        </button>
      </div>

      {/* Environmental Impact Message */}
      <div className="mt-8 p-6 bg-eco-green-50 rounded-lg border border-eco-green-200 text-center">
        <h4 className="text-lg font-semibold text-eco-green-800 mb-2">
          🌟 You're Making a Difference!
        </h4>
        <p className="text-eco-green-700">
          By choosing climate-friendly alternatives, you've reduced your carbon footprint by{' '}
          <strong>{summaryData.co2Reduced.toFixed(1)}kg of CO₂</strong> and saved{' '}
          <strong>£{summaryData.moneySaved.toFixed(2)}</strong> compared to conventional choices.
          Every small decision adds up to create a big impact! 🌍
        </p>
      </div>
    </div>
  )
}

export default Summary
