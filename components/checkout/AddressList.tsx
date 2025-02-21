import { Address } from '@/src/types/address';
import { Trash2, Edit2, Star } from 'lucide-react';

interface AddressListProps {
  addresses: Address[];
  selectedAddress: number | null;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
  onEdit: (address: Address, index: number) => void;
  onSetDefault: (index: number) => void;
}

export default function AddressList({
  addresses,
  selectedAddress,
  onSelect,
  onDelete,
  onEdit,
  onSetDefault,
}: AddressListProps) {
  return (
    <div className="space-y-4">
      {addresses.map((address, index) => (
        <div
          key={index}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            selectedAddress === index
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => onSelect(index)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {address.isDefault && (
                  <span className="text-blue-600">
                    <Star className="h-4 w-4 fill-current" />
                  </span>
                )}
                <p className="font-medium">
                  {address.street}
                </p>
              </div>
              <p className="text-gray-600">
                {address.city}, {address.state}
              </p>
              <p className="text-gray-600">
                {address.country} - {address.postalCode}
              </p>
            </div>
            <div className="flex space-x-2">
              {!address.isDefault && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetDefault(index);
                  }}
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Set as default"
                >
                  <Star className="h-4 w-4" />
                </button>
              )}
                            <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(index);
                }}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}