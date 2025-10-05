const Flashcard = ({ item, onSelect }) => {
  if (!item) return null

  const getCO2Rating = (co2Impact) => {
    if (co2Impact <= 0.5) return { rating: 'A', color: 'text-green-600', bg: 'bg-green-100' }
    if (co2Impact <= 1.0) return { rating: 'B', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (co2Impact <= 2.0) return { rating: 'C', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { rating: 'D', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const co2Rating = getCO2Rating(item.co2Impact)

  return (
    <div 
      className="card cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 hover:border-eco-green-300"
      onClick={onSelect}
    >
      {/* Item Image/Emoji */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-2">
          {item.emoji || '🛍️'}
        </div>
        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
      </div>

      {/* Price */}
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-eco-green-600">£{item.price.toFixed(2)}</div>
        <div className="text-sm text-gray-500">per {item.unit || 'item'}</div>
      </div>

      {/* Environmental Impact */}
      <div className="space-y-3">
        {/* Miles Traveled */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Miles traveled:</span>
          <span className="font-medium text-gray-900">{item.milesTraveled} mi</span>
        </div>

        {/* CO2 Impact */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">CO₂ impact:</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{item.co2Impact}kg</span>
            <div className={`px-2 py-1 rounded-full text-xs font-bold ${co2Rating.bg} ${co2Rating.color}`}>
              {co2Rating.rating}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {item.description && (
          <div className="text-xs text-gray-500 text-center pt-2 border-t">
            {item.description}
          </div>
        )}
      </div>

      {/* Select Button */}
      <button className="w-full mt-4 btn-primary py-2 text-sm">
        Select This Option
      </button>
    </div>
  )
}

export default Flashcard
