import { useState } from "react";

function BuildYourOwn() {
  const [cap, setCap] = useState("blue");
  const [body, setBody] = useState("round");
  const [label, setLabel] = useState("blue");
  const [size, setSize] = useState("50cl");
  const [logo, setLogo] = useState("AQUA");
  const [brandName, setBrandName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [uploadedLogo, setUploadedLogo] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const price = 700;
  const totalPrice = price * quantity;

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUploadedLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-900">
        Build Your Own Bottle
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Design your own personalised water bottle.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LIVE PREVIEW */}

        <div className="bg-white rounded-2xl p-8 shadow">
          <h2 className="font-bold text-xl mb-6">Live Bottle Preview</h2>

          <div className="bg-blue-50 rounded-xl min-h-96 flex flex-col items-center justify-center">
            {/* CAP */}

            <div
              className="w-12 h-7 rounded-t-lg"
              style={{ backgroundColor: cap }}
            />

            {/* BOTTLE BODY */}

            <div
              className="h-64 border-2 border-blue-200 bg-white/80 flex items-center justify-center shadow-lg transition-all duration-300"
              style={{
                width:
                  body === "slim"
                    ? "95px"
                    : body === "square"
                      ? "145px"
                      : body === "sports"
                        ? "125px"
                        : body === "curved"
                          ? "125px"
                          : "125px",

                borderRadius:
                  body === "square"
                    ? "10px"
                    : body === "slim"
                      ? "25px"
                      : body === "curved"
                        ? "45px"
                        : "25px",
              }}
            >
              {/* LABEL */}

              <div
                className="w-full py-6 text-center text-white"
                style={{ backgroundColor: label }}
              >
                {uploadedLogo ? (
                  <img
                    src={uploadedLogo}
                    alt="Custom logo"
                    className="w-12 h-12 object-contain mx-auto"
                  />
                ) : (
                  <h3 className="font-bold text-lg">{logo}</h3>
                )}

                <p className="text-xs mt-2">{brandName || "PURE WATER"}</p>

                <p className="text-xs mt-1">{size}</p>
              </div>
            </div>

            <p className="mt-5 font-semibold capitalize">{body} Bottle</p>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold mb-3">Your Design Summary</h3>

            <p>Cap: {cap}</p>
            <p>Body: {body}</p>
            <p>Label: {label}</p>
            <p>Logo: {logo}</p>
            <p>Size: {size}</p>
            <p>Quantity: {quantity}</p>
          </div>
        </div>

        {/* CUSTOMISATION PANEL */}

        <div className="bg-white rounded-2xl p-8 shadow space-y-6">
          {/* CAP */}

          <div>
            <h3 className="font-bold mb-3">1. Choose Cap Colour</h3>

            <div className="flex gap-3 flex-wrap">
              {["blue", "red", "green", "black", "white", "yellow"].map(
                (colour) => (
                  <button
                    key={colour}
                    onClick={() => setCap(colour)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      cap === colour
                        ? "border-blue-600 ring-2 ring-blue-200"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: colour }}
                    title={colour}
                  />
                ),
              )}
            </div>
          </div>

          <hr />

          {/* BODY */}

          <div>
            <h3 className="font-bold mb-3">2. Choose Bottle Body</h3>

            <select
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="round">Round</option>
              <option value="slim">Slim</option>
              <option value="square">Square</option>
              <option value="curved">Curved</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <hr />

          {/* LABEL */}

          <div>
            <h3 className="font-bold mb-3">3. Choose Label Colour</h3>

            <div className="flex gap-3 flex-wrap">
              {["blue", "green", "red", "black", "white"].map((colour) => (
                <button
                  key={colour}
                  onClick={() => setLabel(colour)}
                  className="w-10 h-10 rounded-full border-2"
                  style={{ backgroundColor: colour }}
                  title={colour}
                />
              ))}
            </div>
          </div>

          <hr />

          {/* LOGO */}

          <div>
            <h3 className="font-bold mb-3">4. Choose Logo</h3>

            <select
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="AQUA">Aqua</option>
              <option value="NATURE">Nature</option>
              <option value="PREMIUM">Premium</option>
              <option value="PURE">Pure</option>
            </select>

            <label className="block text-sm mt-4 mb-2">
              Or upload your own logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <hr />

          {/* BRAND NAME */}

          <div>
            <h3 className="font-bold mb-3">5. Your Brand Name</h3>

            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter your brand name"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* SIZE */}

          <div>
            <h3 className="font-bold mb-3">6. Bottle Size</h3>

            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option>33cl</option>
              <option>50cl</option>
              <option>75cl</option>
              <option>1L</option>
              <option>1.5L</option>
            </select>
          </div>

          {/* QUANTITY */}

          <div>
            <h3 className="font-bold mb-3">7. Quantity</h3>

            <div className="flex items-center gap-5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border px-4 py-2 rounded-lg"
              >
                -
              </button>

              <span className="font-bold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border px-4 py-2 rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* PRICE */}

          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="text-gray-500">Estimated Total</p>

            <h2 className="text-2xl font-bold text-blue-800">
              ₦{totalPrice.toLocaleString()}
            </h2>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-800 text-white p-4 rounded-lg font-bold"
          >
            Save My Bottle Design
          </button>

          {showSuccess && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg">
              Your bottle design has been saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuildYourOwn;
