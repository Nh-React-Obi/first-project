import { useState } from "react";

export function BottleDetails() {
  const [cap, setCap] = useState("Blue");
  const [body, setBody] = useState("Round");
  const [logo, setLogo] = useState("Aqua");
  const [quantity, setQuantity] = useState(1);

  const bottle = {
    name: "Aqua Classic",
    price: 500,
    size: "50cl",
    material: "PET Plastic",
    type: "Purified Water",
    sku: "AQ-001",
    description: "A refreshing bottled water designed for everyday hydration.",
  };

  const totalPrice = bottle.price * quantity;

  const handleAddToCart = () => {
    alert(`${quantity} ${bottle.name} bottle(s) added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        Home / Catalogue / Bottle Details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white rounded-xl p-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div
              className="w-12 h-5 rounded-t-lg"
              style={{
                backgroundColor: cap.toLowerCase(),
              }}
            />

            <div className="w-36 h-80 rounded-3xl border-2 border-blue-200 bg-blue-50 flex items-center justify-center shadow-md">
              <div className="text-center">
                <h2 className="font-bold text-blue-800 text-xl">{logo}</h2>

                <p className="text-xs text-gray-500 mt-2">PURE WATER</p>

                <p className="text-xs mt-2">{bottle.size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-5">
          <div>
            <p className="text-blue-700 text-sm">Natural Purified Water</p>

            <h1 className="text-3xl font-bold mt-2">{bottle.name}</h1>

            <p className="text-gray-500 mt-2">SKU: {bottle.sku}</p>
          </div>

          <h2 className="text-2xl font-bold text-blue-700">
            ₦{bottle.price.toLocaleString()}
          </h2>

          <p className="text-gray-600">{bottle.description}</p>

          <hr />

          {/* Specifications */}
          <div>
            <h3 className="font-bold mb-3">Bottle Specifications</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>Size: {bottle.size}</p>
              <p>Material: {bottle.material}</p>
              <p>Type: {bottle.type}</p>
              <p>Availability: In Stock</p>
            </div>
          </div>

          <hr />

          {/* Cap Selection */}
          <div>
            <label className="font-bold block mb-2">Select Cap Colour</label>

            <select
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option>Blue</option>
              <option>Red</option>
              <option>Green</option>
              <option>Black</option>
              <option>White</option>
              <option>Yellow</option>
            </select>
          </div>

          {/* Body Selection */}
          <div>
            <label className="font-bold block mb-2">Select Bottle Body</label>

            <select
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option>Round</option>
              <option>Slim</option>
              <option>Square</option>
              <option>Curved</option>
              <option>Sports</option>
            </select>
          </div>

          {/* Logo Selection */}
          <div>
            <label className="font-bold block mb-2">Select Logo</label>

            <select
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option>Aqua</option>
              <option>Nature</option>
              <option>Premium</option>
              <option>Company</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="font-bold block mb-2">Quantity</label>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border rounded-lg px-4 py-2"
              >
                -
              </button>

              <span className="font-bold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border rounded-lg px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Total Price</p>

            <h2 className="text-2xl font-bold text-blue-800">
              ₦{totalPrice.toLocaleString()}
            </h2>
          </div>

          {/* Buttons */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-800 text-white p-3 rounded-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={() => alert("Opening bottle builder...")}
            className="w-full border border-blue-800 text-blue-800 p-3 rounded-lg"
          >
            Build Your Own Bottle
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottleDetails;
