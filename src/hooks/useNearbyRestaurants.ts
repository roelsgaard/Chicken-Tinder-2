import { useState, useEffect } from 'react';
import { Restaurant } from '../types/restaurant';

const GOOGLE_API_KEY = 'AIzaSyABfS0soV133Q4eOTv4BCkmfkv7xw0WYG0'; // Replace with your actual API key

export function useNearbyRestaurants(radius: number) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        
        // Get current location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        // Load Google Places API
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        
        const request = {
          location: new google.maps.LatLng(latitude, longitude),
          radius: radius * 1000, // Convert km to meters
          type: 'restaurant'
        };

        const results = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
          service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              resolve(results);
            } else {
              reject(new Error('Failed to fetch restaurants'));
            }
          });
        });

        // Transform results to our Restaurant type
        const transformedResults = results.map(place => ({
          id: place.place_id!,
          name: place.name!,
          cuisine: place.types?.find(type => type !== 'restaurant' && type !== 'food') || 'Restaurant',
          rating: place.rating || 4.0,
          priceRange: place.price_level || 2,
          waitTime: '15-20 min',
          imageUrl: place.photos?.[0].getUrl() || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
          vicinity: place.vicinity!
        }));

        setRestaurants(transformedResults);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [radius]);

  return { restaurants, loading, error };
}