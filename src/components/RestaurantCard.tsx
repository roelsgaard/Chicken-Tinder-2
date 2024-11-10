import React from 'react';
import { Star, Clock, DollarSign, X, Heart, MapPin } from 'lucide-react';

interface RestaurantProps {
  name: string;
  cuisine: string;
  rating: number;
  priceRange: number;
  waitTime: string;
  imageUrl: string;
  vicinity: string;
  onLike: () => void;
  onDislike: () => void;
  isActive?: boolean;
}

export function RestaurantCard({
  name,
  cuisine,
  rating,
  priceRange,
  waitTime,
  imageUrl,
  vicinity,
  onLike,
  onDislike,
  isActive = true,
}: RestaurantProps) {
  return (
    <div className={`absolute left-0 right-0 mx-auto w-full max-w-sm transition-all duration-300 ${
      isActive ? 'z-10' : 'z-0 opacity-0'
    }`}>
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden h-[600px]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-3/4 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 h-3/4 bg-gradient-to-b from-black/50 via-transparent to-transparent p-6">
          <div className="flex items-center space-x-2">
            <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-white font-medium">{rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              <div className="flex items-center text-white">
                {Array(priceRange).fill(0).map((_, i) => (
                  <DollarSign key={i} className="w-3 h-3" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6">
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-gray-600 text-lg mb-2">{cuisine}</p>
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-sm">{vicinity}</span>
          </div>
          <div className="flex items-center text-gray-500 mb-4">
            <Clock className="w-5 h-5 mr-2" />
            <span>{waitTime} wait</span>
          </div>
          <div className="flex justify-center space-x-6">
            <button
              onClick={onDislike}
              className="w-16 h-16 flex items-center justify-center rounded-full bg-white border-4 border-red-500 text-red-500 hover:bg-red-50 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={onLike}
              className="w-16 h-16 flex items-center justify-center rounded-full bg-white border-4 border-green-500 text-green-500 hover:bg-green-50 transition-colors"
            >
              <Heart className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}