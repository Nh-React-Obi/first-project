import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { bottles } from "../data/bottles";

export function BottleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  // Find the bottle selected from the Homepage
  const bottle = bottles.find((item) => item.id === Number(id));

  // Check if the bottle exists
  if (!bottle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Bottle Not Found</h1>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-800 text-white px-6 py-3 rounded-lg"
        >
          Back to Catalogue
        </button>
      </div>
    );
  }

  const totalPrice = bottle.price * quantity;

  const handleAddToCart = () => {
    alert(`${quantity} ${bottle.name} bottle(s) added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <p className="text-sm text-gray-500 mb-6">
        Home / Catalogue / {bottle.name}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bottle Image */}
        <div className="bg-white rounded-xl p-8 flex items-center justify-center">
          <img
            src={bottle.image}
            alt={bottle.name}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* Bottle Information */}
        <div className="space-y-5">
          <div>
            <p className="text-blue-700 text-sm">Bottle Collection</p>

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

          {/* Total Price */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600">Total Price</p>

            <h2 className="text-2xl font-bold text-blue-800">
              ₦{totalPrice.toLocaleString()}
            </h2>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-800 text-white p-3 rounded-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate("/build")}
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
