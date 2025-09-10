import React, { useState } from "react";
import { Eye, Heart, Filter } from "lucide-react";

// Categories and Brands
const categories = ["All", "Real Madrid", "Arsenal", "Manchester United"];
const brands = ["Nike", "Adidas"];
const sizes = ["Small", "Medium", "Large"];
const colors = ["Red", "Blue", "White"];
const prices = [1000, 2000, 3000];

// Products with Ratings
const products = [
  {
    id: 1,
    name: "RL Madrid Third Jersey 25 26",
    oldPrice: 2499,
    price: 1299,
    frontImg: "/src/assets/j1.jpg",
    backImg: "/src/assets/j2.jpg",
    category: "Real Madrid",
    brand: "Nike",
    size: "Medium",
    color: "White",
    rating: 4.0,
    ratingsBreakdown: { 5: 58, 4: 20, 3: 5, 2: 2, 1: 15 },
  },
  {
    id: 2,
    name: "RL Madrid US Pack Jersey 2025",
    oldPrice: 2499,
    price: 1499,
    frontImg: "/src/assets/j1.jpg",
    backImg: "/src/assets/j2.jpg",
    category: "Real Madrid",
    brand: "Adidas",
    size: "Large",
    color: "Blue",
    rating: 3.5,
    ratingsBreakdown: { 5: 40, 4: 30, 3: 15, 2: 5, 1: 10 },
  },
  {
    id: 3,
    name: "ARS Football Jersey Third 25 26",
    oldPrice: 1999,
    price: 1199,
    frontImg: "/src/assets/j1.jpg",
    backImg: "/src/assets/j2.jpg",
    category: "Arsenal",
    brand: "Nike",
    size: "Small",
    color: "Red",
    rating: 4.5,
    ratingsBreakdown: { 5: 70, 4: 20, 3: 5, 2: 3, 1: 2 },
  },
  {
    id: 4,
    name: "Manchester United Jersey Away",
    oldPrice: 1999,
    price: 1299,
    frontImg: "/src/assets/j1.jpg",
    backImg: "/src/assets/j2.jpg",
    category: "Manchester United",
    brand: "Adidas",
    size: "Medium",
    color: "Red",
    rating: 3.8,
    ratingsBreakdown: { 5: 50, 4: 25, 3: 10, 2: 5, 1: 10 },
  },
];

const App = () => {
  const [hovered, setHovered] = useState(null);
  const [flippedImages, setFlippedImages] = useState({});
  const [wishlisted, setWishlisted] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(null);

  // 🔹 Dropdown states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [isClickMode, setIsClickMode] = useState(false);

  const toggleImage = (id) => {
    setFlippedImages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleWishlist = (id) => {
    setWishlisted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedPrice(null);
  };

  // Dropdown hover logic
  const handleMouseEnter = () => {
    if (isClickMode) return;
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (isClickMode) return;
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
    setCloseTimeout(timeout);
  };

  const handleClickToggle = () => {
    setIsDropdownOpen((prev) => {
      if (!prev) {
        setIsClickMode(true);
        return true;
      } else {
        setIsClickMode(false);
        return false;
      }
    });
  };

  // Filter products
  let filteredProducts = products;
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }
  if (selectedBrand) {
    filteredProducts = filteredProducts.filter((p) => p.brand === selectedBrand);
  }
  if (selectedSize) {
    filteredProducts = filteredProducts.filter((p) => p.size === selectedSize);
  }
  if (selectedColor) {
    filteredProducts = filteredProducts.filter((p) => p.color === selectedColor);
  }
  if (selectedPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= selectedPrice);
  }

  return (
    <div className="container mx-auto p-4">
      {/* 🔹 Top Navigation with Club Dropdown */}
      <div className="flex justify-center mb-12">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handleClickToggle}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
          >
            Club
          </button>

          {isDropdownOpen && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-[600px] z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="grid grid-cols-3 gap-6 text-sm">
                {/* Column 1 - Clubs */}
                <div>
                  <h4 className="font-semibold mb-2">Clubs</h4>
                  <ul className="space-y-1">
                    {["Real Madrid", "Arsenal", "Manchester United", "Barcelona"].map(
                      (club) => (
                        <li
                          key={club}
                          className="hover:text-blue-600 cursor-pointer"
                          onClick={() => {
                            setSelectedCategory("All");
                            setSelectedBrand(club);
                            setIsDropdownOpen(false);
                            setIsClickMode(false);
                          }}
                        >
                          {club}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Column 2 - Budget Range */}
                <div>
                  <h4 className="font-semibold mb-2">Budget Range</h4>
                  <ul className="space-y-1">
                    <li
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        setSelectedPrice(1000);
                        setIsDropdownOpen(false);
                        setIsClickMode(false);
                      }}
                    >
                      Under ₹1,000
                    </li>
                    <li
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        setSelectedPrice(2000);
                        setIsDropdownOpen(false);
                        setIsClickMode(false);
                      }}
                    >
                      ₹1,000 - ₹2,000
                    </li>
                    <li
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        setSelectedPrice(3000);
                        setIsDropdownOpen(false);
                        setIsClickMode(false);
                      }}
                    >
                      ₹2,000 - ₹3,000
                    </li>
                    <li
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        setSelectedPrice(999999);
                        setIsDropdownOpen(false);
                        setIsClickMode(false);
                      }}
                    >
                      ₹3,000+
                    </li>
                  </ul>
                </div>


              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar + Main */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-48 sticky top-4 self-start">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedBrand(null);
                }}
                className={`text-left px-4 py-2 rounded transition-colors duration-200 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top controls */}
          <div className="flex justify-between mb-4 items-center flex-wrap gap-4">
            <button
              type="button"
              onClick={toggleFilter}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                showFilter ? "bg-black text-white" : "bg-blue-600 text-white"
              } hover:opacity-90 transition-colors duration-300`}
            >
              <Filter size={20} />
              Filter Options
            </button>
          </div>

          {/* Filter Section */}
          {showFilter && (
            <div className="mb-4 p-4 border border-gray-300 rounded bg-gray-50 space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Reset Filters
                </button>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="font-semibold mb-2">Filter by Size</h4>
                <div className="flex gap-4 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size === selectedSize ? null : size)
                      }
                      className={`px-4 py-2 rounded border transition-colors duration-200 ${
                        selectedSize === size
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h4 className="font-semibold mb-2">Filter by Color</h4>
                <div className="flex gap-4 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(color === selectedColor ? null : color)
                      }
                      className={`px-4 py-2 rounded border transition-colors duration-200 ${
                        selectedColor === color
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="font-semibold mb-2">Filter by Brand</h4>
                <div className="flex gap-4 flex-wrap">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() =>
                        setSelectedBrand(brand === selectedBrand ? null : brand)
                      }
                      className={`px-4 py-2 rounded border transition-colors duration-200 ${
                        selectedBrand === brand
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-semibold mb-2">Filter by Budget (≤)</h4>
                <div className="flex gap-4 flex-wrap">
                  {prices.map((price) => (
                    <button
                      key={price}
                      onClick={() =>
                        setSelectedPrice(price === selectedPrice ? null : price)
                      }
                      className={`px-4 py-2 rounded border transition-colors duration-200 ${
                        selectedPrice === price
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      ₹{price}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isHovered = hovered === product.id;
                const isWishlisted = wishlisted[product.id];
                const showBack = flippedImages[product.id];

                return (
                  <div
                    key={product.id}
                    className="relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group cursor-pointer"
                    onMouseEnter={() => setHovered(product.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <img
                      src={showBack ? product.backImg : product.frontImg}
                      alt={product.name}
                      className={`w-full h-64 object-cover transition duration-500 ease-in-out transform ${
                        isHovered ? "scale-105 brightness-110" : ""
                      }`}
                    />

                    {/* Action Buttons */}
                    {(isHovered || isWishlisted) && (
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button
                          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                          onClick={() => toggleImage(product.id)}
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart
                            size={20}
                            fill={isWishlisted ? "red" : "none"}
                            stroke={isWishlisted ? "red" : "currentColor"}
                          />
                        </button>
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="p-4 relative">
                      <h2 className="font-semibold text-sm">{product.name}</h2>
                      <div className="flex items-center gap-2 mt-4">
                        <span className="line-through text-gray-400">
                          ₹{product.oldPrice}
                        </span>
                        <span className="font-bold text-lg">
                          ₹{product.price}
                        </span>
                      </div>

                      {/* Rating Section */}
                      <div
                        className="flex items-center gap-2 mt-3 relative"
                        onMouseEnter={() => setHoveredRating(product.id)}
                        onMouseLeave={() => setHoveredRating(null)}
                      >
                        <button className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 text-white text-sm font-semibold">
                          {product.rating.toFixed(1)} ★
                        </button>

                        {hoveredRating === product.id && (
                          <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg p-3 w-56 text-sm z-20">
                            <p className="font-semibold mb-2">
                              {product.rating} out of 5
                            </p>
                            {Object.entries(product.ratingsBreakdown)
                              .sort((a, b) => b[0] - a[0])
                              .map(([stars, percent]) => (
                                <div
                                  key={stars}
                                  className="flex items-center gap-2 mb-1 px-2 py-1 rounded cursor-pointer hover:bg-gray-100 transition"
                                >
                                  <span className="w-8">{stars}★</span>
                                  <div className="flex-1 h-2 bg-gray-200 rounded">
                                    <div
                                      className="h-2 bg-yellow-400 rounded"
                                      style={{ width: `${percent}%` }}
                                    ></div>
                                  </div>
                                  <span>{percent}%</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No products found
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
