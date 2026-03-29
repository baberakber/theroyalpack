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
import { useLocale } from 'next-intl';
import { whatsappUrl } from '@/lib/contactConstants';
import {
  formatRiyadhDateTime,
  getRiyadhDayHourMinute,
  isOpenNowInRiyadh,
} from '@/lib/saudiBusinessHours';

export function ContactForm() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
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

  const tr = {
    successTitle: isRTL ? 'تم إرسال الرسالة بنجاح!' : 'Message Sent Successfully!',
    successBody: isRTL
      ? 'شكرا لتواصلك معنا. سنقوم بالرد خلال 24 ساعة.'
      : 'Thank you for reaching out. We\'ll respond within 24 hours.',
    reference: isRTL ? 'المرجع' : 'Reference',
    sendAnother: isRTL ? 'إرسال رسالة أخرى' : 'Send Another Message',
    sendFailed: isRTL ? 'تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'Failed to send message. Please try again.',
    fullName: isRTL ? 'الاسم الكامل' : 'Full Name',
    yourName: isRTL ? 'اكتب اسمك' : 'Your name',
    email: isRTL ? 'البريد الإلكتروني' : 'Email',
    phone: isRTL ? 'رقم الهاتف' : 'Phone',
    subject: isRTL ? 'الموضوع' : 'Subject',
    selectTopic: isRTL ? 'اختر موضوعا' : 'Select a topic',
    message: isRTL ? 'الرسالة' : 'Message',
    messagePlaceholder: isRTL ? 'كيف يمكننا مساعدتك؟' : 'How can we help?',
    sending: isRTL ? 'جار الإرسال...' : 'Sending...',
    sendMessage: isRTL ? 'إرسال الرسالة' : 'Send Message',
  };

  const subjectLabelMap: Record<(typeof subjectOptions)[number]['value'], string> = {
    general: isRTL ? 'استفسار عام' : 'General Inquiry',
    product: isRTL ? 'استفسار عن منتج' : 'Product Question',
    printing: isRTL ? 'استفسار عن الطباعة' : 'Printing Question',
    quote: isRTL ? 'طلب عرض سعر' : 'Request a Quote',
    partnership: isRTL ? 'استفسار شراكة' : 'Partnership Inquiry',
    feedback: isRTL ? 'ملاحظات' : 'Feedback',
    other: isRTL ? 'أخرى' : 'Other',
  };

  const localizeError = (msg?: string) => {
    if (!msg || !isRTL) return msg;
    const map: Record<string, string> = {
      'Name must be at least 2 characters': 'يجب أن يكون الاسم حرفين على الأقل',
      'Name must be less than 100 characters': 'يجب ألا يتجاوز الاسم 100 حرف',
      'Please enter a valid email address': 'يرجى إدخال بريد إلكتروني صحيح',
      'Phone number is too long': 'رقم الهاتف طويل جدا',
      'Please enter a valid phone number': 'يرجى إدخال رقم هاتف صحيح',
      'Please select a subject': 'يرجى اختيار موضوع',
      'Message must be at least 10 characters': 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل',
      'Message must be less than 2000 characters': 'يجب ألا تتجاوز الرسالة 2000 حرف',
    };
    return map[msg] ?? msg;
  };

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
        throw new Error(result.error || tr.sendFailed);
      }

      setReference(result.reference);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : tr.sendFailed
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
          {tr.successTitle}
        </h3>
        <p className="text-text-muted mb-4">
          {tr.successBody}
        </p>
        {reference && (
          <p className="text-sm text-text-muted mb-6 font-mono bg-bg-secondary inline-block px-4 py-2 rounded">
            {tr.reference}: {reference}
          </p>
        )}
        <Button variant="primary" onClick={handleReset}>
          {tr.sendAnother}
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
            label={tr.fullName}
            placeholder={tr.yourName}
            {...register('name')}
            error={localizeError(errors.name?.message)}
            required
            aria-required="true"
          />
          <Input
            label={tr.email}
            type="email"
            placeholder="you@company.com"
            {...register('email')}
            error={localizeError(errors.email?.message)}
            required
            aria-required="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={tr.phone}
            type="tel"
            placeholder="+966 55 624 0690"
            {...register('phone')}
            error={localizeError(errors.phone?.message)}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select
                label={tr.subject}
                placeholder={tr.selectTopic}
                options={subjectOptions.map((opt) => ({ value: opt.value, label: subjectLabelMap[opt.value] }))}
                {...field}
                error={localizeError(errors.subject?.message)}
                required
                aria-required="true"
              />
            )}
          />
        </div>

        <div>
          <Textarea
            label={tr.message}
            placeholder={tr.messagePlaceholder}
            {...register('message')}
            error={localizeError(errors.message?.message)}
            required
            aria-required="true"
            maxLength={2000}
            className="min-h-[150px]"
          />
          <p className="mt-1 text-xs text-text-muted text-end">
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
          {isSubmitting ? tr.sending : tr.sendMessage}
        </Button>
      </div>
    </form>
  );
}

// Contact Info component
export function ContactInfo() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        {isRTL ? 'تواصل معنا' : 'Get in Touch'}
      </h2>

      <div className="space-y-6">
        {/* Phone */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center">
            <Phone className="h-5 w-5 text-primary-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
              {isRTL ? 'الهاتف' : 'Phone'}
            </p>
            <a
              href="tel:+966556240690"
              className="text-text-primary hover:text-primary-600 transition-colors"
            >
              +966 556 240 690
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
              href={whatsappUrl()}
              className="text-text-primary hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              +966 556 240 690
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
              {isRTL ? 'البريد الإلكتروني' : 'Email'}
            </p>
            <a
              href="mailto:sales@theroyalpack.com"
              className="text-text-primary hover:text-primary-600 transition-colors"
            >
              sales@theroyalpack.com
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
              {isRTL ? 'زورونا' : 'Visit Us'}
            </p>
            <a
              href="https://maps.google.com/?q=Exit+18+As+Sulay+Riyadh+14321"
              className="text-text-primary hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Exit 18, As Sulay<br />
              {isRTL ? 'الرياض 14321، المملكة العربية السعودية' : 'Riyadh 14321, Saudi Arabia'}
            </a>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8 pt-6 border-t border-border-default">
        <p className="text-sm font-medium text-text-muted mb-3">{isRTL ? 'تابعنا' : 'Follow Us'}</p>
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
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="w-full rounded-lg overflow-hidden border border-border-light">
      <iframe
        src="https://www.google.com/maps?q=Exit+18+As+Sulay+Riyadh+14321&output=embed"
        width="100%"
        height="400"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={isRTL ? 'موقع رويال باك في الرياض' : 'Royal Pack Riyadh location'}
        className="w-full h-[300px] md:h-[400px] border-0"
      />
    </div>
  );
}

// Business Hours component
export function BusinessHours() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [currentDay, setCurrentDay] = useState<number>(-1);
  const [riyadhTimeLabel, setRiyadhTimeLabel] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const { dayIndex } = getRiyadhDayHourMinute(now);
      setCurrentDay(dayIndex);
      setIsOpen(isOpenNowInRiyadh(now));
      setRiyadhTimeLabel(formatRiyadhDateTime(locale, now));
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [locale]);

  const closedLabel = isRTL ? 'مغلق' : 'Closed';

  const hours = [
    { day: isRTL ? 'الاثنين' : 'Monday', hours: isRTL ? '8:00 ص - 6:00 م' : '8:00 AM - 6:00 PM', dayIndex: 1 },
    { day: isRTL ? 'الثلاثاء' : 'Tuesday', hours: isRTL ? '8:00 ص - 6:00 م' : '8:00 AM - 6:00 PM', dayIndex: 2 },
    { day: isRTL ? 'الأربعاء' : 'Wednesday', hours: isRTL ? '8:00 ص - 6:00 م' : '8:00 AM - 6:00 PM', dayIndex: 3 },
    { day: isRTL ? 'الخميس' : 'Thursday', hours: isRTL ? '8:00 ص - 6:00 م' : '8:00 AM - 6:00 PM', dayIndex: 4 },
    { day: isRTL ? 'الجمعة' : 'Friday', hours: closedLabel, dayIndex: 5 },
    { day: isRTL ? 'السبت' : 'Saturday', hours: isRTL ? '8:00 ص - 6:00 م' : '8:00 AM - 6:00 PM', dayIndex: 6 },
    { day: isRTL ? 'الأحد' : 'Sunday', hours: isRTL ? '8:00 ص - 6:00 م' : '8:00 AM - 6:00 PM', dayIndex: 0 },
  ];

  return (
    <section className="bg-bg-secondary py-12">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Clock className="h-6 w-6 text-primary-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-text-primary">{isRTL ? 'ساعات العمل' : 'Business Hours'}</h2>
          {isOpen !== null && (
            <span
              className={cn(
                'px-2 py-1 rounded text-xs font-medium animate-pulse-once',
                isOpen
                  ? 'bg-green-500 text-white'
                  : 'bg-text-muted text-white'
              )}
            >
              {isOpen ? (isRTL ? 'مفتوح الآن' : 'Open Now') : (isRTL ? 'مغلق' : 'Closed')}
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
                  className="py-3 px-4 text-start text-sm font-medium text-text-primary"
                >
                  {day}
                </th>
                <td
                  className={cn(
                    'py-3 px-4 text-end text-sm',
                    time === closedLabel ? 'text-text-muted' : 'text-text-primary'
                  )}
                >
                  {time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {riyadhTimeLabel ? (
          <p className="mt-4 text-sm text-text-secondary text-center font-medium">
            {isRTL ? 'الوقت الحالي في السعودية:' : 'Current time in Saudi Arabia:'}{' '}
            <span dir="ltr" className="inline-block">
              {riyadhTimeLabel}
            </span>
          </p>
        ) : null}
        <p className="mt-3 text-sm text-text-muted text-center">
          {isRTL
            ? 'ساعات العمل بتوقيت المملكة العربية السعودية الرسمي (توقيت العربية القياسي AST — ‎UTC+3). يوم الجمعة عطلة أسبوعية.'
            : 'Hours follow Saudi Arabia official time (Arabia Standard Time, AST — UTC+3). Friday is closed.'}
        </p>
      </div>
    </section>
  );
}

