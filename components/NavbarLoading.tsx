export const NavbarLoading = () => {
    return (
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo skeleton */}
            <div className="h-8 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" />
            
            {/* Navigation links skeleton */}
            <div className="hidden md:flex items-center space-x-8">
              {Array(4).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
            
            {/* Right side elements (search, cart, profile) */}
            <div className="flex items-center space-x-4">
              {/* Search bar skeleton */}
              <div className="hidden md:block">
                <div className="h-8 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" />
              </div>
              
              {/* Icons skeleton */}
              <div className="flex items-center space-x-4">
                {Array(3).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"
                  />
                ))}
              </div>
            </div>
            
            {/* Mobile menu button skeleton */}
            <div className="md:hidden">
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </nav>
    );
  };