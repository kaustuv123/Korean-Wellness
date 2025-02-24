export interface Address {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  alternatePhoneNumber?: string;
  flat?: string;
  area?: string;
  landmark?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}
