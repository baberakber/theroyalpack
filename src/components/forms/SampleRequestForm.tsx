'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Package, Coffee, Ruler, FileCheck, Star } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import {
  sampleFormSchema,
  type SampleFormData,
  sampleCupTypeOptions,
  sampleSizeOptions,
  countryOptions,
} from '@/lib/schemas/sample';
import { cn } from '@/lib/utils';

export function SampleRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{ email: string; address: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SampleFormData>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues: {
      cupTypes: [],
      consent: false as unknown as true,
    },
  });

  const selectedCupTypes = watch('cupTypes') || [];

  const handleCupTypeChange = (value: string, checked: boolean) => {
    const current = selectedCupTypes;
    if (checked) {
      setValue('cupTypes', [...current, value]);
    } else {
      setValue('cupTypes', current.filter((t) => t !== value));
    }
  };

  const onSubmit = async (data: SampleFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit sample request');
      }

      setReference(result.reference);
      setSubmittedData({
        email: data.email,
        address: [data.addressLine1, data.city, data.country].filter(Boolean).join(', '),
      });
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
    setSubmitSuccess(false);
    setSubmitError(null);
    setReference(null);
    setSubmittedData(null);
  };

  if (submitSuccess && submittedData) {
    return (
      <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Package className="h-8 w-8 text-green-600" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Your Sample Request Has Been Sent!
        </h2>
        <p className="text-text-muted mb-2">
          We&apos;ll prepare your sample kit and ship it to{' '}
          <span className="font-medium text-text-primary">{submittedData.address}</span>.
        </p>
        <p className="text-text-muted mb-4">
          You&apos;ll receive a confirmation email at{' '}
          <span className="font-medium text-text-primary">{submittedData.email}</span>.
        </p>
        <p className="text-sm text-text-muted mb-2">
          Expected delivery: <span className="font-medium">3-5 business days</span>
        </p>
        {reference && (
          <p className="text-sm text-text-muted mb-8 font-mono bg-bg-secondary inline-block px-4 py-2 rounded">
            Reference: {reference}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={handleReset}>
            Request Another Sample
          </Button>
          <Button variant="accent" asChild>
            <a href="/get-a-quote">Get a Quote Now</a>
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

      {/* Contact Fields */}
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
        </div>
      </section>

      {/* Shipping Address */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 pb-2 border-b border-border-default">
          Shipping Address
        </h2>
        <fieldset>
          <legend className="sr-only">Shipping Address</legend>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Address Line 1"
              placeholder="Street address"
              {...register('addressLine1')}
              error={errors.addressLine1?.message}
              required
              aria-required="true"
            />
            <Input
              label="Address Line 2"
              placeholder="Suite, floor, etc."
              {...register('addressLine2')}
              error={errors.addressLine2?.message}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                placeholder="City"
                {...register('city')}
                error={errors.city?.message}
                required
                aria-required="true"
              />
              <Input
                label="State / Region"
                placeholder="State or region"
                {...register('state')}
                error={errors.state?.message}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Postal / ZIP Code"
                placeholder="Postal code"
                {...register('postalCode')}
                error={errors.postalCode?.message}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Country"
                    placeholder="Select country"
                    options={countryOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                    {...field}
                    error={errors.country?.message}
                    required
                    aria-required="true"
                  />
                )}
              />
            </div>
          </div>
        </fieldset>
      </section>

      {/* Sample Preferences */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 pb-2 border-b border-border-default">
          Sample Preferences
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Which cup types interest you?
          </label>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            role="group"
            aria-label="Cup type preferences"
          >
            {sampleCupTypeOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  'flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors',
                  selectedCupTypes.includes(option.value)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-border-default hover:border-primary-300'
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedCupTypes.includes(option.value)}
                  onChange={(e) => handleCupTypeChange(option.value, e.target.checked)}
                  className="w-4 h-4 text-primary-500 border-border-default focus:ring-primary-500 rounded"
                />
                <span className="text-sm text-text-primary">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <Controller
            name="preferredSize"
            control={control}
            render={({ field }) => (
              <Select
                label="Preferred Cup Size"
                placeholder="Select size"
                options={sampleSizeOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                {...field}
                error={errors.preferredSize?.message}
              />
            )}
          />
        </div>

        <Textarea
          label="Any specific requirements?"
          placeholder="e.g., we're looking for 8oz cups for hot coffee"
          {...register('message')}
          error={errors.message?.message}
          maxLength={1000}
        />
      </section>

      {/* Submit */}
      <section className="border-t border-border-default pt-6">
        <Controller
          name="consent"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <Checkbox
              label="I agree to be contacted regarding this sample request."
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
            {isSubmitting ? 'Submitting...' : 'Request Free Sample'}
          </Button>
          <p className="mt-3 text-sm text-text-muted">
            Samples are shipped within 3-5 business days. Shipping is free within the UAE and GCC region.
          </p>
        </div>
      </section>
    </form>
  );
}

// Sidebar component for the sample request page
export function SampleSidebar() {
  return (
    <aside className="bg-bg-secondary rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Your Free Sample Kit
      </h3>
      <ul className="space-y-3 mb-6">
        <li className="flex gap-3">
          <Coffee className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-text-muted">
            Assorted cup types (single, double, ripple wall)
          </span>
        </li>
        <li className="flex gap-3">
          <Ruler className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-text-muted">
            Selected sizes to test
          </span>
        </li>
        <li className="flex gap-3">
          <FileCheck className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-text-muted">
            Product spec sheet included
          </span>
        </li>
        <li className="flex gap-3">
          <Star className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-text-muted">
            Examples of printed cups (if available)
          </span>
        </li>
      </ul>

      <div className="border-t border-border-default pt-4 mb-4">
        <h4 className="font-medium text-text-primary text-sm mb-3">
          Why Request a Sample?
        </h4>
        <ul className="space-y-2 text-sm text-text-muted">
          <li>Feel the cup quality in your hands</li>
          <li>Test insulation and durability</li>
          <li>Show your team before ordering</li>
          <li>No cost, no obligation</li>
        </ul>
      </div>

      {/* Placeholder for sample kit image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center">
        <Package className="h-16 w-16 text-primary-300" />
      </div>
    </aside>
  );
}
