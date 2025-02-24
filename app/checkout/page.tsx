"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import AddressList from "@/components/checkout/AddressList";
import AddressForm from "@/components/checkout/AddressForm";
import PayNowSidebar from "@/components/checkout/PayNowSidebar";
import { Address } from "@/src/types/address";
import { addressService } from "@/utils/addressService";

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
      const addresses = await addressService.getAddresses();
      setAddresses(addresses);
      setShowAddressForm(addresses.length === 0);

      // Select default address if exists
      const defaultIndex = addresses.findIndex(
        (addr: Address) => addr.isDefault
      );
      if (defaultIndex !== -1) {
        setSelectedAddress(defaultIndex);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching addresses:", axiosError);
      // Only redirect on unauthorized errors, handle other errors differently
      if (axiosError.response?.status === 401) {
        router.push("/auth/login?redirect=/checkout");
      }
    }
  };

  console.log("address", addresses);

  const handleAddressSubmit = async (addressData: Address) => {
    try {
      console.log('Submitting address data:', addressData);
      
      if (editingAddress) {
        // Update existing address using addressService
        await addressService.updateAddress(editingAddress.index, addressData);
      } else {
        // Add new address using addressService
        await addressService.addAddress(addressData);
      }

      // Refresh addresses after successful submission
      await fetchAddresses();
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const handleSetDefault = async (index: number) => {
    try {
      const addressToUpdate = { ...addresses[index], isDefault: true };
      await addressService.updateAddress(index, addressToUpdate);
      await fetchAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const handleAddressDelete = async (index: number) => {
    try {
      await addressService.deleteAddress(index);
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
