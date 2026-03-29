'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Mail, Palette, FileText } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FileUpload } from './FileUpload';
import { WHATSAPP_NUMBER_DIGITS, whatsappUrl } from '@/lib/contactConstants';
import {
  quoteFormSchema,
  type QuoteFormData,
  industryOptions,
  cupTypeOptions,
  cupSizeOptions,
  yesNoOptions,
  printingMethodOptions,
  colorCountOptions,
  timelineOptions,
} from '@/lib/schemas/quote';
import { cn } from '@/lib/utils';

interface QuoteFormProps {
  defaultCupType?: string;
  defaultSize?: string;
  defaultIndustry?: string;
  defaultEco?: boolean;
}

export function QuoteForm({
  defaultCupType,
  defaultSize,
  defaultIndustry,
  defaultEco,
}: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [designFile, setDesignFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      cupType: (defaultCupType as QuoteFormData['cupType']) || undefined,
      cupSize: defaultSize || '',
      industry: defaultIndustry || '',
      ecoPreference: defaultEco || false,
      needsPrinting: 'yes',
      consent: false as unknown as true,
    },
  });

  const needsPrinting = watch('needsPrinting');
  const designReady = watch('designReady');
  const messageValue = watch('message') || '';

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Append form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Append file if present
      if (designFile) {
        formData.append('designFile', designFile);
      }

      const response = await fetch('/api/quote', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      setReference(result.reference);
      setSubmittedEmail(data.email);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Submission failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setDesignFile(null);
    setSubmitSuccess(false);
    setSubmitError(null);
    setReference(null);
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Thank You! Your Quote Request Has Been Sent.
        </h2>
        <p className="text-text-muted mb-4">
          We&apos;ll review your requirements and get back to you within 24 hours at{' '}
          <span className="font-medium text-text-primary">{submittedEmail}</span>.
        </p>
        {reference && (
          <p className="text-sm text-text-muted mb-8 font-mono bg-bg-secondary inline-block px-4 py-2 rounded">
            Reference: {reference}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={handleReset}>
            Submit Another Quote
          </Button>
          <Button variant="secondary" asChild>
            <a href="/">Return to Homepage</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-error" role="alert">
          {submitError}
        </div>
      )}

      {/* Section 1: Contact Information */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 pb-2 border-b border-border-default">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Your full name"
            {...register('name')}
            error={errors.name?.message}
            required
            aria-required="true"
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            {...register('email')}
            error={errors.email?.message}
            required
            aria-required="true"
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+971 50 000 0000"
            {...register('phone')}
            error={errors.phone?.message}
            required
            aria-required="true"
          />
          <Input
            label="Company Name"
            placeholder="Your company"
            {...register('company')}
            error={errors.company?.message}
          />
          <div className="md:col-span-2">
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <Select
                  label="Industry"
                  placeholder="Select your industry"
                  options={industryOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                  {...field}
                  error={errors.industry?.message}
                />
              )}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Cup Requirements */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 pb-2 border-b border-border-default">
          Cup Requirements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="cupType"
            control={control}
            render={({ field }) => (
              <Select
                label="Cup Type"
                placeholder="Select cup type"
                options={cupTypeOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                {...field}
                error={errors.cupType?.message}
                required
                aria-required="true"
              />
            )}
          />
          <Controller
            name="cupSize"
            control={control}
            render={({ field }) => (
              <Select
                label="Cup Size"
                placeholder="Select size"
                options={cupSizeOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                {...field}
                error={errors.cupSize?.message}
                required
                aria-required="true"
              />
            )}
          />
          <Input
            label="Quantity"
            type="number"
            placeholder="e.g., 5000"
            min={1000}
            {...register('quantity', { valueAsNumber: true })}
            error={errors.quantity?.message}
            helperText="Minimum order: 1,000 pieces"
            required
            aria-required="true"
          />
          <Controller
            name="lidRequired"
            control={control}
            render={({ field }) => (
              <Select
                label="Lid Required?"
                placeholder="Select option"
                options={yesNoOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                {...field}
                error={errors.lidRequired?.message}
              />
            )}
          />
          <Controller
            name="sleeveRequired"
            control={control}
            render={({ field }) => (
              <Select
                label="Sleeve Required?"
                placeholder="Select option"
                options={yesNoOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                {...field}
                error={errors.sleeveRequired?.message}
              />
            )}
          />
        </div>
      </section>

      {/* Section 3: Printing Details */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 pb-2 border-b border-border-default">
          Printing Details
        </h2>

        {/* Radio buttons for printing */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Do you need custom printing? <span className="text-error">*</span>
          </label>
          <div className="flex gap-6">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="yes"
                {...register('needsPrinting')}
                className="w-4 h-4 text-primary-500 border-border-default focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">Yes</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="no"
                {...register('needsPrinting')}
                className="w-4 h-4 text-primary-500 border-border-default focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">No</span>
            </label>
          </div>
          {errors.needsPrinting && (
            <p className="mt-1.5 text-sm text-error">{errors.needsPrinting.message}</p>
          )}
        </div>

        {needsPrinting === 'yes' && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="printingMethod"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Preferred Printing Method"
                    placeholder="Select method"
                    options={printingMethodOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                    {...field}
                    error={errors.printingMethod?.message}
                  />
                )}
              />
              <Controller
                name="colorCount"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Number of Print Colors"
                    placeholder="Select color count"
                    options={colorCountOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                    {...field}
                    error={errors.colorCount?.message}
                  />
                )}
              />
            </div>

            {/* Design Ready Radio */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Is your design ready?
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register('designReady')}
                    className="w-4 h-4 text-primary-500 border-border-default focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary">Yes, needs adaptation</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register('designReady')}
                    className="w-4 h-4 text-primary-500 border-border-default focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary">No, need design support</span>
                </label>
              </div>
            </div>

            {designReady === 'yes' && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Upload Your Design
                </label>
                <FileUpload
                  onFileSelect={setDesignFile}
                  disabled={isSubmitting}
                />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Section 4: Additional Details */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 pb-2 border-b border-border-default">
          Additional Details
        </h2>
        <div className="space-y-4">
          <Controller
            name="timeline"
            control={control}
            render={({ field }) => (
              <Select
                label="When do you need the cups?"
                placeholder="Select timeline"
                options={timelineOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                {...field}
                error={errors.timeline?.message}
              />
            )}
          />

          <Controller
            name="ecoPreference"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Checkbox
                label="I'm interested in eco-friendly options"
                checked={value}
                onChange={onChange}
                {...field}
              />
            )}
          />

          <div>
            <Textarea
              label="Additional Notes"
              placeholder="Any other details or questions..."
              {...register('message')}
              error={errors.message?.message}
              maxLength={2000}
            />
            <p className="mt-1 text-xs text-text-muted text-right">
              {messageValue.length} / 2000
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Submit */}
      <section className="border-t border-border-default pt-6">
        <Controller
          name="consent"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <Checkbox
              label="I agree to be contacted regarding this quote request."
              checked={value}
              onChange={onChange}
              error={errors.consent?.message}
              {...field}
            />
          )}
        />

        <div className="mt-6">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            isLoading={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </Button>
        </div>
      </section>
    </form>
  );
}

// Sidebar component for the quote page
export function QuoteSidebar() {
  return (
    <aside className="bg-bg-secondary rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        What Happens Next?
      </h3>
      <ul className="space-y-4 mb-6">
        <li className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <Mail className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-text-primary text-sm">Quote Delivery</p>
            <p className="text-sm text-text-muted">
              We&apos;ll email you a detailed quote within 24 hours.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <Palette className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-text-primary text-sm">Design Support</p>
            <p className="text-sm text-text-muted">
              If you need design help, our team will reach out with options.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-text-primary text-sm">No Commitment</p>
            <p className="text-sm text-text-muted">
              This is a free, no-obligation quote.
            </p>
          </div>
        </li>
      </ul>

      <div className="border-t border-border-default pt-4">
        <h4 className="font-medium text-text-primary text-sm mb-3">
          Need Help Faster?
        </h4>
        <div className="space-y-2 text-sm">
          <p className="text-text-muted">
            <span className="font-medium text-text-primary">Phone:</span>{' '}
            <a href={`tel:+${WHATSAPP_NUMBER_DIGITS}`} className="text-primary-600 hover:underline">
              +966 556 240 690
            </a>
          </p>
          <p className="text-text-muted">
            <span className="font-medium text-text-primary">WhatsApp:</span>{' '}
            <a href={whatsappUrl()} className="text-primary-600 hover:underline">
              +966 556 240 690
            </a>
          </p>
          <p className="text-text-muted">
            <span className="font-medium text-text-primary">Email:</span>{' '}
            <a href="mailto:sales@theroyalpack.com" className="text-primary-600 hover:underline">
              sales@theroyalpack.com
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
