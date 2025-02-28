"use client";
import { useState } from "react";
import { Address } from "@/src/types/address";

interface AddressFormProps {
  initialData?: Partial<Address>;
  onSubmit: (address: Omit<Address, '_id'>) => void;
  onCancel?: () => void;
}

export default function AddressForm({ initialData, onSubmit, onCancel }: AddressFormProps) {
  // Parse street into components if it exists in initialData
  const parseStreetComponents = (street?: string) => {
    if (!street) return { flat: '', area: '', landmark: '' };
    
    const components = street.split(' | ');
    return {
      flat: components[0] || '',
      area: components[1] || '',
      landmark: components[2] || ''
    };
  };

  const streetComponents = parseStreetComponents(initialData?.street);

  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    phoneNumber: initialData?.phoneNumber || '',
    email: initialData?.email || '',
    alternatePhoneNumber: initialData?.alternatePhoneNumber || '',
    flat: streetComponents.flat,
    area: streetComponents.area,
    landmark: streetComponents.landmark,
    city: initialData?.city || '',
    state: initialData?.state || '',
    postalCode: initialData?.postalCode || '',
    country: initialData?.country || 'India',
    isDefault: initialData?.isDefault || false,
  });

  // Track which fields have been touched
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  // Add phone validation function
  const isValidPhoneNumber = (phone: string) => {
    return /^\d{10}$/.test(phone);
  };

  // Update isFieldInvalid function
  const isFieldInvalid = (fieldName: string) => {
    if (fieldName === 'phoneNumber') {
      return touchedFields[fieldName] && 
        (!formData[fieldName] || !isValidPhoneNumber(formData[fieldName]));
    }
    return touchedFields[fieldName] && !formData[fieldName as keyof typeof formData];
  };

  const getInputClassName = (fieldName: string) => `
    peer h-14 w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${isFieldInvalid(fieldName) ? 'border-red-500' : ''}
  `;

  // Update the phone number input section
  const getPhoneErrorMessage = (phone: string) => {
    if (!phone) return 'Phone number is required';
    if (!isValidPhoneNumber(phone)) return 'Phone number must be 10 digits';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'phoneNumber',
      'flat',
      'area',
      'city',
      'state',
      'postalCode',
      'country'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      alert('Please fill in all required fields');
      return;
    }

    // Use pipe character as delimiter instead of comma
    const street = [formData.flat, formData.area, formData.landmark]
      .filter(Boolean)
      .join(' | ');

    const { flat, area, landmark, ...rest } = formData;
    const submitData = { ...rest, street };
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            onBlur={() => handleBlur('firstName')}
            placeholder=" "
            className={getInputClassName('firstName')}
          />
          <label
            htmlFor="firstName"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            First Name
          </label>
          {isFieldInvalid('firstName') && (
            <p className="mt-1 text-xs text-red-500">First name is required</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            onBlur={() => handleBlur('lastName')}
            placeholder=" "
            className={getInputClassName('lastName')}
          />
          <label
            htmlFor="lastName"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Last Name
          </label>
          {isFieldInvalid('lastName') && (
            <p className="mt-1 text-xs text-red-500">Last name is required</p>
          )}
        </div>

        <div className="relative">
          <input
            type="tel"
            id="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={(e) => {
              // Only allow digits
              const value = e.target.value.replace(/\D/g, '');
              setFormData({ ...formData, phoneNumber: value });
            }}
            onBlur={() => handleBlur('phoneNumber')}
            placeholder=" "
            className={getInputClassName('phoneNumber')}
            maxLength={10}
          />
          <label
            htmlFor="phoneNumber"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Phone Number
          </label>
          {touchedFields.phoneNumber && (
            <p className="mt-1 text-xs text-red-500">
              {getPhoneErrorMessage(formData.phoneNumber)}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur('email')}
            placeholder=" "
            className={getInputClassName('email')}
          />
          <label
            htmlFor="email"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500"
          >
            Email (Optional)
          </label>
        </div>

        <div className="relative">
          <input
            type="tel"
            id="alternatePhoneNumber"
            value={formData.alternatePhoneNumber}
            onChange={(e) => setFormData({ ...formData, alternatePhoneNumber: e.target.value })}
            onBlur={() => handleBlur('alternatePhoneNumber')}
            placeholder=" "
            className={getInputClassName('alternatePhoneNumber')}
          />
          <label
            htmlFor="alternatePhoneNumber"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500"
          >
            Alternate Phone (Optional)
          </label>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-6">Shipping Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative md:col-span-2">
          <input
            type="text"
            id="flat"
            required
            value={formData.flat}
            onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
            onBlur={() => handleBlur('flat')}
            placeholder=" "
            className={getInputClassName('flat')}
          />
          <label
            htmlFor="flat"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Flat, House no., Building, Company, Apartment
          </label>
          {isFieldInvalid('flat') && (
            <p className="mt-1 text-xs text-red-500">Flat is required</p>
          )}
        </div>

        <div className="relative md:col-span-2">
          <input
            type="text"
            id="area"
            required
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            onBlur={() => handleBlur('area')}
            placeholder=" "
            className={getInputClassName('area')}
          />
          <label
            htmlFor="area"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Area, Street, Sector, Village
          </label>
          {isFieldInvalid('area') && (
            <p className="mt-1 text-xs text-red-500">Area is required</p>
          )}
        </div>

        <div className="relative md:col-span-2">
          <input
            type="text"
            id="landmark"
            value={formData.landmark}
            onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
            onBlur={() => handleBlur('landmark')}
            placeholder=" "
            className={getInputClassName('landmark')}
          />
          <label
            htmlFor="landmark"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500"
          >
            Landmark (Optional)
          </label>
        </div>

        <div className="relative md:col-span-2">
          <input
            type="text"
            id="city"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            onBlur={() => handleBlur('city')}
            placeholder=" "
            className={getInputClassName('city')}
          />
          <label
            htmlFor="city"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            City/District
          </label>
          {isFieldInvalid('city') && (
            <p className="mt-1 text-xs text-red-500">City is required</p>
          )}
        </div>

        <div className="relative md:col-span-2">
          <select
            id="state"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            onBlur={() => handleBlur('state')}
            className={getInputClassName('state')}
          >
            <option value="">Select state</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi">Delhi</option>
          </select>
          <label
            htmlFor="state"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            State
          </label>
          {isFieldInvalid('state') && (
            <p className="mt-1 text-xs text-red-500">Please select a state</p>
          )}
        </div>

        <div className="relative md:col-span-2">
          <input
            type="text"
            id="postalCode"
            required
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            onBlur={() => handleBlur('postalCode')}
            placeholder=" "
            className={getInputClassName('postalCode')}
          />
          <label
            htmlFor="postalCode"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Postal Code
          </label>
          {isFieldInvalid('postalCode') && (
            <p className="mt-1 text-xs text-red-500">Postal code is required</p>
          )}
        </div>

        <div className="relative md:col-span-2">
          <input
            type="text"
            id="country"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            onBlur={() => handleBlur('country')}
            placeholder=" "
            className={getInputClassName('country')}
          />
          <label
            htmlFor="country"
            className="absolute left-3 transition-all duration-200 ease-in-out
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                     peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs
                     peer-focus:text-blue-500 top-1 text-xs text-blue-500
                     after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Country
          </label>
          {isFieldInvalid('country') && (
            <p className="mt-1 text-xs text-red-500">Country is required</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 
                       focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-700">Set as default address</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 
                     hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-md 
                   hover:bg-blue-700 transition-colors duration-200"
        >
          Save Address
        </button>
      </div>
    </form>
  );
}