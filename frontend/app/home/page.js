"use client";

import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  // Sample flower data - you can replace with your actual flower data
  const flowers = [
    {
      id: 1,
      name: "Rose",
      description: "Roses are one of the most popular and beloved flowers worldwide. Known for their beauty, fragrance, and symbolism of love, roses come in various colors, each carrying its own meaning. They are perfect for gardens, bouquets, and special occasions.",
      image: "https://images.unsplash.com/photo-1518621012-2d340d3e9dab?w=800&auto=format&fit=crop&q=60",
      scientificName: "Rosa",
      family: "Rosaceae",
      colors: ["Red", "White", "Pink", "Yellow", "Orange"]
    },
    {
      id: 2,
      name: "Sunflower",
      description: "Sunflowers are known for their large, bright yellow petals and dark centers. These cheerful flowers always face the sun, symbolizing loyalty, adoration, and positivity. They're not only beautiful but also produce nutritious seeds.",
      image: "https://images.unsplash.com/photo-1470509037663-253afd7f7c4e?w=800&auto=format&fit=crop&q=60",
      scientificName: "Helianthus annuus",
      family: "Asteraceae",
      colors: ["Yellow", "Orange", "Red"]
    },
    {
      id: 3,
      name: "Tulip",
      description: "Tulips are elegant spring flowers known for their cup-shaped blooms and vibrant colors. Originally from Central Asia, they became synonymous with Holland and are perfect for creating stunning garden displays and bouquets.",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&auto=format&fit=crop&q=60",
      scientificName: "Tulipa",
      family: "Liliaceae",
      colors: ["Red", "Yellow", "Pink", "Purple", "White"]
    },
    {
      id: 4,
      name: "Lily",
      description: "Lilies are elegant and fragrant flowers that symbolize purity, rebirth, and motherhood. With their distinctive trumpet shape and prominent stamens, they make excellent cut flowers and are perfect for both gardens and floral arrangements.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=60",
      scientificName: "Lilium",
      family: "Liliaceae",
      colors: ["White", "Pink", "Orange", "Yellow", "Red"]
    },
    {
      id: 5,
      name: "Orchid",
      description: "Orchids are exotic and sophisticated flowers known for their intricate patterns and unique shapes. They represent luxury, strength, and beauty. With over 25,000 species, orchids are one of the largest flower families in the world.",
      image: "https://images.unsplash.com/photo-1596124951115-be28420b1ed6?w=800&auto=format&fit=crop&q=60",
      scientificName: "Orchidaceae",
      family: "Orchidaceae",
      colors: ["Purple", "White", "Pink", "Yellow", "Blue"]
    },
    {
      id: 6,
      name: "Daisy",
      description: "Daisies are simple yet charming flowers that symbolize innocence, purity, and new beginnings. With their white petals and yellow centers, they bring a cheerful and fresh appearance to any garden or bouquet.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60",
      scientificName: "Bellis perennis",
      family: "Asteraceae",
      colors: ["White", "Pink", "Red", "Yellow"]
    }
  ];

  const handleLearnMore = (flowerId) => {
    router.push(`/classify?flower=${flowerId}`);
  };

  const handleStartQuiz = (flowerName) => {
    router.push(`/analyze?flower=${flowerName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            🌸 Eco Explorer
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover the Beauty of Nature's Flowers
          </p>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Explore our comprehensive collection of flowers, learn about their unique characteristics, 
            and test your knowledge with interactive quizzes.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-50 to-transparent"></div>
      </div>

      {/* Flowers Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Flowers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the fascinating world of flowers with our curated collection. 
            Each flower has its own story, characteristics, and beauty to explore.
          </p>
        </div>

        {/* Flower Grid with Alternating Pattern */}
        <div className="space-y-20">
          {flowers.map((flower, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={flower.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
              >
                {/* Image Section (1) */}
                <div className="flex-1 max-w-lg">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                    <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                      <img
                        src={flower.image}
                        alt={flower.name}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-emerald-600">
                          {flower.family}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Section (0) */}
                <div className="flex-1 max-w-lg">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {flower.name}
                      </h3>
                      <p className="text-lg text-emerald-600 font-medium italic">
                        {flower.scientificName}
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-lg">
                      {flower.description}
                    </p>

                    {/* Color Tags */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                        Available Colors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {flower.colors.map((color, colorIndex) => (
                          <span
                            key={colorIndex}
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={() => handleLearnMore(flower.id)}
                        className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        🔍 Learn More
                      </button>
                      <button
                        onClick={() => handleStartQuiz(flower.name)}
                        className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        🧠 Take Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Challenge yourself with our interactive flower identification quizzes and become a flower expert!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/classify')}
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🌸 Identify Flowers
            </button>
            <button
              onClick={() => router.push('/analyze')}
              className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-400 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              📊 Analyze Results
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">🌸 Eco Explorer</h3>
          <p className="text-gray-400 mb-6">
            Exploring the beauty of nature, one flower at a time.
          </p>
          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => router.push('/home')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => router.push('/classify')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Classify
            </button>
            <button 
              onClick={() => router.push('/analyze')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Analyze
            </button>
            <button 
              onClick={() => router.push('/profile')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Profile
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;