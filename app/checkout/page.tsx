"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AddressList from "@/components/checkout/AddressList";
import AddressForm from "@/components/checkout/AddressForm";
import PayNowSidebar from "@/components/checkout/PayNowSidebar";
import { Address } from "@/src/types/user";

export default function CheckoutPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<{
    address: Address;
    index: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user exists in cookies
        const response = await axios.get("/api/users/userData");
        

        if (!response) {
          console.log("No user found, redirecting to login");
          router.push("/auth/login?redirect=/checkout");
          return;
        }

        console.log("user found, fetching addresses");
        await fetchAddresses();
      } catch (error) {
        console.error("Auth check failed:", error);
        // Don't automatically redirect on any error
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("/api/user/addresses");
      setAddresses(response.data.addresses);
      setShowAddressForm(response.data.addresses.length === 0);

      // Select default address if exists
      const defaultIndex = response.data.addresses.findIndex(
        (addr: Address) => addr.isDefault
      );
      if (defaultIndex !== -1) {
        setSelectedAddress(defaultIndex);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      // Only redirect on unauthorized errors, handle other errors differently
      if (error.response?.status === 401) {
        router.push("/auth/login?redirect=/checkout");
      }
    }
  };

  console.log("address", addresses);

  const handleAddressSubmit = async (addressData: Omit<Address, "_id">) => {
    try {
      if (editingAddress) {
        // Update existing address
        await axios.put(
          `/api/user/addresses/${editingAddress.index}`,
          addressData
        );
        setEditingAddress(null);
      } else {
        // Add new address
        await axios.post("/api/user/addresses", addressData);
        setShowAddressForm(false);
      }
      await fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleSetDefault = async (index: number) => {
    try {
      const addressToUpdate = { ...addresses[index], isDefault: true };
      await axios.put(`/api/user/addresses/${index}`, addressToUpdate);
      await fetchAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const handleAddressDelete = async (index: number) => {
    try {
      await axios.delete(`/api/user/addresses/${index}`);
      await fetchAddresses();
      if (selectedAddress === index) {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Address Management */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

            {showAddressForm || editingAddress ? (
              <AddressForm
                initialData={editingAddress?.address}
                onSubmit={handleAddressSubmit}
                onCancel={() => {
                  setShowAddressForm(false);
                  setEditingAddress(null);
                }}
              />
            ) : (
              <>
                <AddressList
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  onSelect={setSelectedAddress}
                  onDelete={handleAddressDelete}
                  onEdit={(address, index) => {
                    setEditingAddress({ address, index });
                  }}
                  onSetDefault={handleSetDefault}
                />
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Address
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Section - PayNow Sidebar */}
        <div className="lg:w-1/3">
          <PayNowSidebar
            selectedAddress={selectedAddress}
            addresses={addresses}
          />
        </div>
      </div>
    </div>
  );
}
