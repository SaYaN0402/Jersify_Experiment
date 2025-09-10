import React, { useState } from "react";
import { Star } from "lucide-react"; // ⭐ icon

const JerseyProductPage = () => {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/src/assets/j1.jpg");

  // Ratings Data
  const ratings = {
    5: 120,
    4: 80,
    3: 40,
    2: 20,
    1: 10,
  };

  const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);
  const averageRating =
    (
      (5 * ratings[5] +
        4 * ratings[4] +
        3 * ratings[3] +
        2 * ratings[2] +
        1 * ratings[1]) /
      totalRatings
    ).toFixed(1);

  // Reviews
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ram", text: "Great quality jersey! Feels like the real deal.", stars: 5 },
    { id: 2, name: "Sam", text: "Fabric is awesome, fits perfectly. Worth the price!", stars: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  // ✅ Simulate purchase status (in real app, backend will verify this)
  const [hasPurchased] = useState(true); // set to false to test restriction

  const handleAddReview = () => {
    if (!hasPurchased) {
      alert("⚠️ You must purchase this product before leaving a review.");
      return;
    }
    if (newName.trim() && newReview.trim() && newRating > 0) {
      const newEntry = {
        id: Date.now(),
        name: newName,
        text: newReview,
        stars: newRating,
      };
      setReviews([newEntry, ...reviews]);
      setNewName("");
      setNewReview("");
      setNewRating(0);
      alert("✅ Review submitted successfully!");
    } else {
      alert("⚠️ Please fill all fields and give a star rating.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-20">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section - Images */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-2">
            <img
              src="/src/assets/j1.jpg"
              alt="Front Thumbnail"
              className="w-16 h-20 object-cover border rounded cursor-pointer hover:border-black"
              onClick={() => setSelectedImage("/src/assets/j1.jpg")}
            />
            <img
              src="/src/assets/j2.jpg"
              alt="Back Thumbnail"
              className="w-16 h-20 object-cover border rounded cursor-pointer hover:border-black"
              onClick={() => setSelectedImage("/src/assets/j2.jpg")}
            />
          </div>
          <div>
            <img
              src={selectedImage}
              alt="Main Jersey"
              className="w-[300px] md:w-[400px] object-contain border rounded"
            />
          </div>
        </div>

        {/* Right Section - Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            RL Madrid Third Jersey 25 26 Season PLAYER VERSION
          </h1>
          <div className="mb-4">
            <span className="line-through text-gray-500 mr-2">₹2,499.00</span>
            <span className="text-xl font-semibold text-green-600">₹1,299.00</span>
          </div>

          {/* ⭐ Overall Rating */}
          <div className="relative inline-block group mb-6">
            <div className="flex items-center cursor-pointer">
              <span className="text-lg font-semibold mr-1">{averageRating}</span>
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.round(averageRating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="ml-2 text-blue-600">{totalRatings} ratings</span>
            </div>

            {/* Hover Box */}
            <div className="absolute hidden group-hover:block top-8 left-0 bg-white border shadow-lg rounded-lg p-4 w-64 z-10">
              <h3 className="font-semibold mb-2">
                ⭐ {averageRating} out of 5
              </h3>
              <p className="text-sm text-gray-600 mb-2">{totalRatings} global ratings</p>
              {Object.entries(ratings)
                .sort(([a], [b]) => b - a)
                .map(([star, count]) => {
                  const percent = ((count / totalRatings) * 100).toFixed(0);
                  return (
                    <div key={star} className="flex items-center text-sm mb-1">
                      <span className="w-10">{star} star</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded mx-2">
                        <div
                          className="h-3 bg-orange-500 rounded"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span>{percent}%</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Size */}
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

          {/* Quantity + Buttons */}
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
              This RL Madrid Third Jersey for the 25/26 season is a **Player Version** made with
              high-quality breathable fabric. Perfect for die-hard fans and collectors.
            </p>
          </div>

          {/* Review Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
            {hasPurchased ? (
              <>
                {/* Star Rating Input */}
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className="cursor-pointer"
                      fill={i < newRating ? "gold" : "none"}
                      onClick={() => setNewRating(i + 1)}
                    />
                  ))}
                </div>
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
              </>
            ) : (
              <p className="text-red-600">
                ⚠️ You must purchase this product before leaving a review.
              </p>
            )}
          </div>

          {/* Reviews */}
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
                  <div className="flex items-center text-yellow-500 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < rev.stars ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
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
