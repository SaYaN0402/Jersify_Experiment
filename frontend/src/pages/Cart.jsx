import React, { useState } from "react";
import { Star } from "lucide-react"; // for ratings icon

const JerseyProductPage = () => {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/src/assets/j1.jpg"); // Default main image

  // Example rating data
  const ratings = {
    5: 120,
    4: 80,
    3: 40,
    2: 20,
    1: 10,
  };

  // Initial sample reviews
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ram", text: "Great quality jersey! Feels like the real deal." },
    { id: 2, name: "Sam", text: "Fabric is awesome, fits perfectly. Worth the price!" },
  ]);

  const [newName, setNewName] = useState("");
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newName.trim() && newReview.trim()) {
      const newEntry = {
        id: Date.now(),
        name: newName,
        text: newReview,
      };
      setReviews([newEntry, ...reviews]); // add latest on top
      setNewName("");
      setNewReview("");
      alert("✅ Review submitted successfully!");
    } else {
      alert("⚠️ Please enter both name and review.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-20">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section - Images */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-2">
            <img
              src="/src/assets/j1.jpg"
              alt="Front Thumbnail"
              className={`w-16 h-20 object-cover border rounded cursor-pointer transition 
                          ${selectedImage === "/src/assets/j1.jpg" ? "border-black" : "border-gray-300"}`}
              onClick={() => setSelectedImage("/src/assets/j1.jpg")}
            />
            <img
              src="/src/assets/j2.jpg"
              alt="Back Thumbnail"
              className={`w-16 h-20 object-cover border rounded cursor-pointer transition 
                          ${selectedImage === "/src/assets/j2.jpg" ? "border-black" : "border-gray-300"}`}
              onClick={() => setSelectedImage("/src/assets/j2.jpg")}
            />
          </div>

          {/* Main Image */}
          <div>
            <img
              src={selectedImage}
              alt="Main Jersey"
              className="w-[300px] md:w-[400px] object-contain border rounded
                         transition-transform duration-300 ease-in-out
                         hover:scale-105 hover:shadow-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            RL Madrid Third Jersey 25 26 Season PLAYER VERSION
          </h1>
          <div className="mb-4">
            <span className="line-through text-gray-500 mr-2">₹2,499.00</span>
            <span className="text-xl font-semibold text-green-600">₹1,299.00</span>
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h2 className="font-medium mb-2">Size</h2>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  className={`px-4 py-2 border rounded-full ${
                    size === s ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center border rounded px-3 py-1">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="mx-2">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="bg-yellow-400 px-6 py-2 rounded hover:bg-yellow-500 transition">
              Buy Now
            </button>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              This RL Madrid Third Jersey for the 25/26 season is a <strong>Player Version</strong> made with
              high-quality breathable fabric. Perfect for die-hard fans and collectors.
            </p>
          </div>

          {/* Ratings Breakdown */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Ratings</h2>
            {Object.entries(ratings).map(([star, count]) => (
              <div key={star} className="flex items-center mb-1">
                <div className="flex text-yellow-500">
                  {Array.from({ length: star }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{count} users</span>
              </div>
            ))}
          </div>

          {/* Review Form */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded p-2 mb-2"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <textarea
              className="w-full border rounded p-2 mb-2"
              rows="3"
              placeholder="Share your thoughts about this jersey..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleAddReview}
            >
              Submit Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Customer Reviews ({reviews.length} users)
            </h2>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="border p-3 rounded mb-2 shadow-sm bg-gray-50"
                >
                  <p className="font-semibold">{rev.name}</p>
                  <p className="text-gray-700">{rev.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JerseyProductPage;
