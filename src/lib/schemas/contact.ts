import { z } from 'zod';

// Subject options
export const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'product', label: 'Product Question' },
  { value: 'printing', label: 'Printing Question' },
  { value: 'quote', label: 'Request a Quote' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
] as const;

// Phone validation regex - international format (optional field, more lenient)
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .max(20, 'Phone number is too long')
    .refine(
      (val) => !val || val === '' || phoneRegex.test(val),
      'Please enter a valid phone number'
    )
    .optional()
    .or(z.literal('')),
  subject: z.string()
    .min(1, 'Please select a subject'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
