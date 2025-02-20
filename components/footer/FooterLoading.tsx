export const FooterLoading = () => {
    return (
      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Footer columns */}
            {Array(4).fill(0).map((_, columnIndex) => (
              <div key={columnIndex} className="space-y-4">
                {/* Column header skeleton */}
                <div className="h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" />
                
                {/* Column links skeleton */}
                <div className="space-y-3">
                  {Array(4).fill(0).map((_, linkIndex) => (
                    <div
                      key={linkIndex}
                      className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright skeleton */}
              <div className="h-4 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" />
              
              {/* Social links skeleton */}
              <div className="flex space-x-6">
                {Array(4).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };