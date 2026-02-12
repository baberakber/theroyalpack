import { z } from 'zod';

// Cup type options for samples
export const sampleCupTypeOptions = [
  { value: 'single-wall', label: 'Single-Wall' },
  { value: 'double-wall', label: 'Double-Wall' },
  { value: 'ripple-wall', label: 'Ripple-Wall' },
  { value: 'all-types', label: 'All Types' },
] as const;

// Cup size options (including assorted)
export const sampleSizeOptions = [
  { value: '2.5oz', label: '2.5oz' },
  { value: '4oz', label: '4oz' },
  { value: '6oz', label: '6oz' },
  { value: '7oz', label: '7oz' },
  { value: '8oz', label: '8oz' },
  { value: '9oz', label: '9oz' },
  { value: '10oz', label: '10oz' },
  { value: '12oz', label: '12oz' },
  { value: '14oz', label: '14oz' },
  { value: '16oz', label: '16oz' },
  { value: '18oz', label: '18oz' },
  { value: '20oz', label: '20oz' },
  { value: '22oz', label: '22oz' },
  { value: 'assorted', label: 'Assorted Sizes' },
] as const;

// Country options (common countries - can be expanded)
export const countryOptions = [
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'QA', label: 'Qatar' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'OM', label: 'Oman' },
  { value: 'JO', label: 'Jordan' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'EG', label: 'Egypt' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'IN', label: 'India' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'AU', label: 'Australia' },
  { value: 'CA', label: 'Canada' },
  { value: 'OTHER', label: 'Other' },
] as const;

// Phone validation regex - international format
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

export const sampleFormSchema = z.object({
  // Contact Information
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .min(7, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long')
    .regex(phoneRegex, 'Please enter a valid phone number'),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  // Shipping Address
  addressLine1: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  addressLine2: z.string()
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  state: z.string()
    .max(100, 'State/Region must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  postalCode: z.string()
    .max(20, 'Postal code must be less than 20 characters')
    .optional()
    .or(z.literal('')),
  country: z.string()
    .min(2, 'Please select a country'),

  // Sample Preferences
  cupTypes: z.array(z.string())
    .optional()
    .default([]),
  preferredSize: z.string()
    .optional()
    .or(z.literal('')),
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional()
    .or(z.literal('')),

  // Consent
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted' }),
  }),
});

export type SampleFormData = z.infer<typeof sampleFormSchema>;
