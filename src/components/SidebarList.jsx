const SidebarList = ({ items, selectedItems, currentIndex }) => {
  const getItemStatus = (index) => {
    if (index < currentIndex) return 'completed'
    if (index === currentIndex) return 'current'
    return 'pending'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'current':
        return '🔄'
      default:
        return '⏳'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'current':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600'
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="text-xl mr-2">📝</span>
        Your Shopping List
      </h3>
      
      <div className="space-y-2">
        {items.map((item, index) => {
          const status = getItemStatus(index)
          const selectedItem = selectedItems[index]
          
          return (
            <div
              key={index}
              className={`p-3 rounded-lg border transition-all duration-200 ${getStatusColor(status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{getStatusIcon(status)}</span>
                <span className="text-xs font-medium uppercase tracking-wide">
                  {status}
                </span>
              </div>
              
              <div className="text-sm">
                <p className="font-medium mb-1">{item.name}</p>
                
                {status === 'completed' && selectedItem ? (
                  <div className="text-xs space-y-1">
                    <p className="text-gray-600">
                      Selected: <span className="font-medium">{selectedItem.name}</span>
                    </p>
                    <div className="flex justify-between">
                      <span>£{selectedItem.price.toFixed(2)}</span>
                      <span>{selectedItem.co2Impact}kg CO₂</span>
                    </div>
                  </div>
                ) : status === 'current' ? (
                  <p className="text-xs text-blue-600">
                    Choose from 3 alternatives below
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Waiting to be processed
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Progress:</span>
          <span className="font-medium">{currentIndex + 1} of {items.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-eco-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="font-semibold text-green-800">
            {selectedItems.filter(item => item).length}
          </div>
          <div className="text-green-600">Completed</div>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="font-semibold text-blue-800">
            {items.length - currentIndex - 1}
          </div>
          <div className="text-blue-600">Remaining</div>
        </div>
      </div>
    </div>
  )
}

export default SidebarList
