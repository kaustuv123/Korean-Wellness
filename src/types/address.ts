export interface Address {
  street: string; // Street address
  city: string;   // City name
  state: string;  // State or region
  country: string; // Country name
  postalCode: string; // Postal or ZIP code
  isDefault?: boolean; // Optional flag to indicate if this is the default address
}
