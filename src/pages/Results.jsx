import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarList from '../components/SidebarList'
import Flashcard from '../components/Flashcard'
import { getMockAlternatives } from '../data/mockData'

const Results = () => {
  const [cleanedList, setCleanedList] = useState([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const [alternatives, setAlternatives] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Load data from localStorage
    const storedCleanedList = localStorage.getItem('cleanedList')
    const storedCurrentIndex = localStorage.getItem('currentItemIndex')
    const storedSelectedItems = localStorage.getItem('selectedItems')

    if (storedCleanedList && storedCurrentIndex !== null) {
      setCleanedList(JSON.parse(storedCleanedList))
      setCurrentItemIndex(parseInt(storedCurrentIndex))
      setSelectedItems(storedSelectedItems ? JSON.parse(storedSelectedItems) : [])
      
      // Load alternatives for current item
      loadAlternatives(JSON.parse(storedCleanedList)[parseInt(storedCurrentIndex)])
    } else {
      // Redirect to home if no data
      navigate('/')
    }
  }, [navigate])

  const loadAlternatives = async (item) => {
    if (!item) return
    
    setIsLoading(true)
    try {
      // Get mock alternatives for the item
      const mockAlternatives = await getMockAlternatives(item)
      setAlternatives(mockAlternatives)
    } catch (error) {
      console.error('Error loading alternatives:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleItemSelect = (selectedAlternative) => {
    const newSelectedItems = [...selectedItems]
    newSelectedItems[currentItemIndex] = selectedAlternative
    
    setSelectedItems(newSelectedItems)
    localStorage.setItem('selectedItems', JSON.stringify(newSelectedItems))
    
    // Move to next item
    const nextIndex = currentItemIndex + 1
    if (nextIndex < cleanedList.length) {
      setCurrentItemIndex(nextIndex)
      localStorage.setItem('currentItemIndex', nextIndex.toString())
      loadAlternatives(cleanedList[nextIndex])
    } else {
      // All items processed, go to summary
      navigate('/summary')
    }
  }

  const currentItem = cleanedList[currentItemIndex]
  const progress = ((currentItemIndex + 1) / cleanedList.length) * 100

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading alternatives...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <SidebarList 
          items={cleanedList}
          selectedItems={selectedItems}
          currentIndex={currentItemIndex}
        />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Choose Your {currentItem?.name || 'Item'}
            </h2>
            <span className="text-sm text-gray-600">
              {currentItemIndex + 1} of {cleanedList.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-eco-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Item Info */}
        {currentItem && (
          <div className="mb-6 p-4 bg-eco-green-50 rounded-lg border border-eco-green-200">
            <h3 className="font-medium text-gray-900 mb-2">Original Item:</h3>
            <p className="text-gray-700">{currentItem.name}</p>
            {currentItem.originalText && (
              <p className="text-sm text-gray-500 mt-1">
                From your list: "{currentItem.originalText}"
              </p>
            )}
          </div>
        )}

        {/* Flashcards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternatives.map((alternative, index) => (
            <Flashcard
              key={index}
              item={alternative}
              onSelect={() => handleItemSelect(alternative)}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Click on any card to select that option. Each choice shows the price, 
            miles traveled, and CO₂ impact to help you make an informed decision.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Results
