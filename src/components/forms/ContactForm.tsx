'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import {
  contactFormSchema,
  type ContactFormData,
  subjectOptions,
} from '@/lib/schemas/contact';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subject: '',
    },
  });

  const messageValue = watch('message') || '';

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setReference(result.reference);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
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
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-3">
          Message Sent Successfully!
        </h3>
        <p className="text-text-muted mb-4">
          Thank you for reaching out. We&apos;ll respond within 24 hours.
        </p>
        {reference && (
          <p className="text-sm text-text-muted mb-6 font-mono bg-bg-secondary inline-block px-4 py-2 rounded">
            Reference: {reference}
          </p>
        )}
        <Button variant="primary" onClick={handleReset}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-white rounded-lg shadow-md p-6 md:p-8"
    >
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-error" role="alert">
          {submitError}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Your name"
            {...register('name')}
            error={errors.name?.message}
            required
            aria-required="true"
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            {...register('email')}
            error={errors.email?.message}
            required
            aria-required="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone"
            type="tel"
            placeholder="+971 50 000 0000"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select
                label="Subject"
                placeholder="Select a topic"
                options={subjectOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                {...field}
                error={errors.subject?.message}
                required
                aria-required="true"
              />
            )}
          />
        </div>

        <div>
          <Textarea
            label="Message"
            placeholder="How can we help?"
            {...register('message')}
            error={errors.message?.message}
            required
            aria-required="true"
            maxLength={2000}
            className="min-h-[150px]"
          />
          <p className="mt-1 text-xs text-text-muted text-right">
            {messageValue.length} / 2000
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

// Contact Info component
export function ContactInfo() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-6">Get in Touch</h2>

      <div className="space-y-6">
        {/* Phone */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center">
            <Phone className="h-5 w-5 text-primary-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
              Phone
            </p>
            <a
              href="tel:+971000000000"
              className="text-text-primary hover:text-primary-600 transition-colors"
            >
              +971 XX XXX XXXX
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-primary-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
              WhatsApp
            </p>
            <a
              href="https://wa.me/971000000000"
              className="text-text-primary hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              +971 XX XXX XXXX
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center">
            <Mail className="h-5 w-5 text-primary-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
              Email
            </p>
            <a
              href="mailto:info@xerostopcups.com"
              className="text-text-primary hover:text-primary-600 transition-colors"
            >
              info@xerostopcups.com
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
              Visit Us
            </p>
            <a
              href="https://maps.google.com"
              className="text-text-primary hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              123 Industrial Area<br />
              Dubai, United Arab Emirates
            </a>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8 pt-6 border-t border-border-default">
        <p className="text-sm font-medium text-text-muted mb-3">Follow Us</p>
        <div className="flex gap-3">
          {/* Placeholder social icons */}
          {['facebook', 'instagram', 'linkedin', 'twitter'].map((social) => (
            <a
              key={social}
              href={`https://${social}.com`}
              className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-muted hover:text-primary-600 hover:bg-primary-50 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${social}`}
            >
              <span className="text-xs font-medium uppercase">{social.charAt(0)}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Google Maps Embed component
export function MapEmbed() {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-border-light">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3011806427!2d54.89784349404474!3d25.07628039538461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Xerostop Cups location"
        className="w-full h-[300px] md:h-[400px]"
      />
    </div>
  );
}

// Business Hours component
export function BusinessHours() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [currentDay, setCurrentDay] = useState<number>(-1);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    setCurrentDay(day);

    // Business hours: Mon-Fri 8-18, Sat 9-14, Sun closed
    if (day === 0) {
      setIsOpen(false);
    } else if (day === 6) {
      setIsOpen(hour >= 9 && hour < 14);
    } else {
      setIsOpen(hour >= 8 && hour < 18);
    }
  }, []);

  const hours = [
    { day: 'Monday', hours: '8:00 AM - 6:00 PM', dayIndex: 1 },
    { day: 'Tuesday', hours: '8:00 AM - 6:00 PM', dayIndex: 2 },
    { day: 'Wednesday', hours: '8:00 AM - 6:00 PM', dayIndex: 3 },
    { day: 'Thursday', hours: '8:00 AM - 6:00 PM', dayIndex: 4 },
    { day: 'Friday', hours: '8:00 AM - 6:00 PM', dayIndex: 5 },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM', dayIndex: 6 },
    { day: 'Sunday', hours: 'Closed', dayIndex: 0 },
  ];

  return (
    <section className="bg-bg-secondary py-12">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Clock className="h-6 w-6 text-primary-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-text-primary">Business Hours</h2>
          {isOpen !== null && (
            <span
              className={cn(
                'px-2 py-1 rounded text-xs font-medium animate-pulse-once',
                isOpen
                  ? 'bg-green-500 text-white'
                  : 'bg-text-muted text-white'
              )}
            >
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          )}
        </div>

        <table className="w-full">
          <tbody>
            {hours.map(({ day, hours: time, dayIndex }) => (
              <tr
                key={day}
                className={cn(
                  'border-b border-border-light last:border-b-0',
                  dayIndex === currentDay && 'bg-primary-50'
                )}
              >
                <th
                  scope="row"
                  className="py-3 px-4 text-left text-sm font-medium text-text-primary"
                >
                  {day}
                </th>
                <td
                  className={cn(
                    'py-3 px-4 text-right text-sm',
                    time === 'Closed' ? 'text-text-muted' : 'text-text-primary'
                  )}
                >
                  {time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-sm text-text-muted text-center">
          All times are in Gulf Standard Time (GST / UTC+4)
        </p>
      </div>
    </section>
  );
}
