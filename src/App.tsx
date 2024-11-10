import React, { useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { RestaurantCard } from './components/RestaurantCard';
import { useNearbyRestaurants } from './hooks/useNearbyRestaurants';
import { LoadingSpinner } from './components/LoadingSpinner';

export function App() {
  const [matchId, setMatchId] = useState('');
  const [radius, setRadius] = useState(5); // Default 5km radius
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedRestaurants, setLikedRestaurants] = useState<string[]>([]);

  const { restaurants, loading, error } = useNearbyRestaurants(radius);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleBack = () => {
    setIsSubmitted(false);
    setCurrentIndex(0);
    setLikedRestaurants([]);
  };

  const handleLike = () => {
    setLikedRestaurants([...likedRestaurants, restaurants[currentIndex].id]);
    if (currentIndex < restaurants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDislike = () => {
    if (currentIndex < restaurants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Find Restaurants
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="matchId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Match ID
                  </label>
                  <input
                    type="text"
                    id="matchId"
                    value={matchId}
                    onChange={(e) => setMatchId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    placeholder="Enter match ID"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="radius"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Search Radius (km)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      id="radius"
                      min="1"
                      max="20"
                      value={radius}
                      onChange={(e) => setRadius(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-gray-600 w-12">{radius}km</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Uses your current location</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-md hover:from-pink-600 hover:to-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Start Matching
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="flex items-center text-pink-600 hover:text-pink-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Change Match ID
        </button>

        <div className="relative max-w-sm mx-auto h-[600px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : currentIndex < restaurants.length ? (
            restaurants.slice(currentIndex).map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onLike={handleLike}
                onDislike={handleDislike}
                isActive={index === 0}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No More Restaurants</h2>
              <p className="text-gray-600 mb-6">You've viewed all available restaurants!</p>
              <p className="text-gray-600">
                Liked restaurants: {likedRestaurants.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}