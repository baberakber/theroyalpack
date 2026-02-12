import { z } from 'zod';

// Industry options
export const industryOptions = [
  { value: 'cafe', label: 'Cafe / Coffee Shop' },
  { value: 'restaurant', label: 'Restaurant / Fast Food' },
  { value: 'food-truck', label: 'Food Truck' },
  { value: 'hotel', label: 'Hotel / Hospitality' },
  { value: 'airline', label: 'Airline / Travel' },
  { value: 'hospital', label: 'Hospital / Healthcare' },
  { value: 'corporate', label: 'Corporate / Events' },
  { value: 'other', label: 'Other' },
] as const;

// Cup type options
export const cupTypeOptions = [
  { value: 'single-wall', label: 'Single-Wall' },
  { value: 'double-wall', label: 'Double-Wall' },
  { value: 'ripple-wall', label: 'Ripple-Wall' },
  { value: 'not-sure', label: 'Not Sure' },
] as const;

// Cup size options
export const cupSizeOptions = [
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
  { value: 'not-sure', label: 'Not Sure' },
] as const;

// Lid/Sleeve options
export const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not-sure', label: 'Not Sure' },
] as const;

// Printing method options
export const printingMethodOptions = [
  { value: 'offset', label: 'Offset (Full Color)' },
  { value: 'flexographic', label: 'Flexographic (Spot Colors)' },
  { value: 'not-sure', label: 'Not Sure' },
] as const;

// Color count options
export const colorCountOptions = [
  { value: '1', label: '1 Color' },
  { value: '2', label: '2 Colors' },
  { value: '3', label: '3 Colors' },
  { value: '4', label: '4 Colors' },
  { value: '5', label: '5 Colors' },
  { value: '6', label: '6 Colors' },
  { value: 'cmyk', label: 'Full Color (CMYK)' },
] as const;

// Timeline options
export const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '2-weeks', label: 'Within 2 weeks' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '3-months', label: 'Within 3 months' },
  { value: 'not-urgent', label: 'Not urgent' },
] as const;

// Phone validation regex - international format
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

export const quoteFormSchema = z.object({
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
  industry: z.string()
    .optional()
    .or(z.literal('')),

  // Cup Requirements
  cupType: z.enum(['single-wall', 'double-wall', 'ripple-wall', 'not-sure'], {
    required_error: 'Please select a cup type',
  }),
  cupSize: z.string()
    .min(1, 'Please select a cup size'),
  quantity: z.number({
    required_error: 'Please enter a quantity',
    invalid_type_error: 'Please enter a valid number',
  })
    .min(1000, 'Minimum order is 1,000 pieces')
    .max(10000000, 'Maximum order is 10,000,000 pieces'),
  lidRequired: z.enum(['yes', 'no', 'not-sure'])
    .optional(),
  sleeveRequired: z.enum(['yes', 'no', 'not-sure'])
    .optional(),

  // Printing Details
  needsPrinting: z.enum(['yes', 'no'], {
    required_error: 'Please select whether you need printing',
  }),
  printingMethod: z.string()
    .optional()
    .or(z.literal('')),
  designReady: z.enum(['yes', 'no'])
    .optional(),
  colorCount: z.string()
    .optional()
    .or(z.literal('')),

  // Additional Details
  timeline: z.string()
    .optional()
    .or(z.literal('')),
  ecoPreference: z.boolean()
    .optional()
    .default(false),
  message: z.string()
    .max(2000, 'Message must be less than 2000 characters')
    .optional()
    .or(z.literal('')),

  // Consent
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to be contacted' }),
  }),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
