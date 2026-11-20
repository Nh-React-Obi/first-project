import { useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";

export function Homepage() {
  const navigate = useNavigate();

  const { toggle } = useTheme();

  const bottles = [
    {
      id: 1,
      name: "Aqua Classic",
      price: 500,
      size: "50cl",
      description: "Pure and refreshing everyday hydration.",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    },
    {
      id: 2,
      name: "Premium Water",
      price: 800,
      size: "75cl",
      description: "Premium quality water for your lifestyle.",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500",
    },
    {
      id: 3,
      name: "Sports Water",
      price: 1200,
      size: "1L",
      description: "Stay refreshed during every workout.",
      image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=500",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-purple-900 to-purple-600 rounded-3xl px-8 md:px-16 py-16 text-white">
        <div className="max-w-2xl">
          <p className="text-purple-200 font-semibold mb-4 tracking-widest">
            PURE WATER, BETTER LIVING
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hydration Made
            <span className="text-yellow-300"> Personal.</span>
          </h1>

          <p className="mt-6 text-purple-100 text-lg">
            Discover your perfect bottle of water or create a unique bottle that matches
            your personal style.
          </p>

          <button
            onClick={() => navigate("/build-your-own")}
            className="mt-8 bg-white text-purple-800 font-bold px-8 py-3 rounded-xl hover:bg-purple-100 transition"
          >
            Build Your Own Bottle
          </button>
        </div>
      </section>

      <section className="py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <p className="text-purple-700 font-semibold text-sm">OUR COLLECTION</p>

            <h2 className="text-3xl font-bold text-gray-900 mt-2">Explore Our Bottles</h2>

            <p className="text-gray-500 mt-2">
              Find the perfect bottle for every occasion.
            </p>
          </div>

          <p className="text-gray-500 text-sm">{bottles.length} Products Available</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bottles.map((bottle) => (
            <div
              key={bottle.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <div className="bg-purple-50 h-64 flex items-center justify-center p-5">
                <img
                  src={bottle.image}
                  alt={bottle.name}
                  className="h-full w-full object-contain rounded-xl"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">{bottle.name}</h3>

                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {bottle.size}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mt-3">{bottle.description}</p>

                <div className="flex justify-between items-center mt-6">
                  <p className="text-2xl font-bold text-purple-800">
                    ₦{bottle.price.toLocaleString()}
                  </p>

                  <button
                    onClick={() => navigate(`/bottle/${bottle.id}`)}
                    className="bg-purple-700 text-white px-5 py-3 rounded-lg hover:bg-purple-800 transition"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Bottle Banner */}
      <section className="bg-purple-100 rounded-2xl p-10 md:p-14 text-center mb-10">
        <h2 className="text-3xl font-bold text-purple-950">Make It Yours!</h2>

        <p className="text-gray-600 mt-3">
          Choose your bottle body, cap and logo to create something unique.
        </p>

        <button
          onClick={() => navigate("/build-your-own")}
          className="mt-6 bg-purple-800 text-white px-8 py-3 rounded-xl hover:bg-purple-900 transition"
        >
          Start Customizing
        </button>
      </section>
    </div>
  );
}

export default Homepage;
