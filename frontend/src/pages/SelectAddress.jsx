import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/addresses",
        {
          withCredentials: true,
        }
      );
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load addresses");
    }
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handleConfirmAddress = () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    // Proceed with order placement logic
    toast.success("Address selected successfully");
    navigate("/place-order");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Select Address</h1>
        {addresses.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">No addresses available</p>
            <button
              onClick={() => navigate("/add-address")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Address
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="bg-white p-4 rounded-lg shadow mb-4"
              >
                <p>
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.zip}
                </p>
                <button
                  onClick={() => handleSelectAddress(address._id)}
                  className={`px-4 py-2 ${
                    selectedAddress === address._id
                      ? "bg-green-600"
                      : "bg-gray-200"
                  } text-white rounded hover:bg-green-700`}
                >
                  {selectedAddress === address._id ? "Selected" : "Select"}
                </button>
              </div>
            ))}
            <button
              onClick={handleConfirmAddress}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Confirm Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAddress;
