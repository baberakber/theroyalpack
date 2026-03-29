'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Coffee,
  IceCream,
  Leaf,
  Droplets,
  CircleHelp,
  ThermometerSun,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { SiteContainer } from '@/components/layout/SiteContainer';
import { useLocale } from 'next-intl';

type Step = 1 | 2 | 3 | 'result';

interface SizeRecommenderState {
  step: Step;
  beverage: string | null;
  servingSize: string | null;
  needsInsulation: boolean | null;
}

interface Recommendation {
  cupType: 'single-wall' | 'double-wall' | 'ripple-wall';
  cupTypeLabel: string;
  sizeOz: number;
  reasoning: string;
}

const beverageOptionsEn = [
  { id: 'hot-coffee', label: 'Hot Coffee', icon: Coffee },
  { id: 'iced-coffee', label: 'Iced Coffee', icon: IceCream },
  { id: 'tea', label: 'Tea', icon: Leaf },
  { id: 'smoothie', label: 'Smoothie/Juice', icon: IceCream },
  { id: 'water', label: 'Water', icon: Droplets },
  { id: 'other', label: 'Other', icon: CircleHelp },
];

const servingSizeOptionsEn = [
  { id: 'small', label: 'Small', description: '6-8oz' },
  { id: 'medium', label: 'Medium', description: '10-12oz' },
  { id: 'large', label: 'Large', description: '14-16oz' },
  { id: 'extra-large', label: 'Extra Large', description: '18-22oz' },
];

const insulationOptionsEn = [
  { id: 'yes', label: 'Yes', description: 'Hot drinks held by hand', value: true },
  { id: 'no', label: 'No', description: 'Cold drinks / sleeve provided', value: false },
];

function getRecommendation(state: SizeRecommenderState, isRTL: boolean): Recommendation {
  const { beverage, servingSize, needsInsulation } = state;

  // Size mapping
  const sizeMap: Record<string, number> = {
    small: 8,
    medium: 12,
    large: 16,
    'extra-large': 20,
  };
  const sizeOz = sizeMap[servingSize || 'medium'] || 12;

  // Determine cup type
  let cupType: 'single-wall' | 'double-wall' | 'ripple-wall';
  let cupTypeLabel: string;
  let reasoning: string;

  const isHotDrink = beverage === 'hot-coffee' || beverage === 'tea';
  const isPremiumCold = beverage === 'smoothie';

  if (needsInsulation && isHotDrink) {
    if (servingSize === 'large' || servingSize === 'extra-large') {
      cupType = 'ripple-wall';
      cupTypeLabel = isRTL ? 'جدار متموج' : 'Ripple-Wall';
      reasoning = isRTL
        ? 'للمشروبات الساخنة الكبيرة التي تُحمل باليد، يوفر الجدار المتموج أعلى عزل وإحساسا فاخرا.'
        : 'For larger hot drinks held by hand, ripple-wall cups provide maximum insulation and a premium grip texture.';
    } else {
      cupType = 'double-wall';
      cupTypeLabel = isRTL ? 'جدار مزدوج' : 'Double-Wall';
      reasoning = isRTL
        ? 'أكواب الجدار المزدوج تمنح عزلا ممتازا للمشروبات الساخنة وتحافظ على راحة اليد دون غلاف.'
        : 'Double-wall cups offer excellent insulation for hot drinks, keeping your hands comfortable without a sleeve.';
    }
  } else if (isPremiumCold) {
    cupType = 'single-wall';
    cupTypeLabel = isRTL ? 'جدار واحد' : 'Single-Wall';
    reasoning = isRTL
      ? 'للعصائر والسموذي البارد، أكواب الجدار الواحد خيار عملي واقتصادي.'
      : 'For cold smoothies and juices, single-wall cups are ideal - economical and perfect for showcasing colorful drinks.';
  } else if (beverage === 'water' || beverage === 'iced-coffee') {
    cupType = 'single-wall';
    cupTypeLabel = isRTL ? 'جدار واحد' : 'Single-Wall';
    reasoning = isRTL
      ? 'أكواب الجدار الواحد مناسبة للمشروبات الباردة، اقتصادية وتوفر وضوحا جيدا للطباعة.'
      : 'Single-wall cups are perfect for cold beverages - cost-effective and provide excellent print clarity.';
  } else {
    cupType = needsInsulation ? 'double-wall' : 'single-wall';
    cupTypeLabel = needsInsulation ? (isRTL ? 'جدار مزدوج' : 'Double-Wall') : (isRTL ? 'جدار واحد' : 'Single-Wall');
    reasoning = needsInsulation
      ? (isRTL ? 'بناء على احتياج العزل، نوصي بأكواب الجدار المزدوج لسهولة الاستخدام.' : 'Based on your insulation needs, we recommend double-wall cups for comfortable handling.')
      : (isRTL ? 'أكواب الجدار الواحد خيار اقتصادي ممتاز عندما لا يكون العزل مطلوبا.' : 'Single-wall cups are a great economical choice when insulation is not required.');
  }

  return { cupType, cupTypeLabel, sizeOz, reasoning };
}

export function SizeRecommender() {
  const { ref, isVisible } = useScrollAnimation();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const beverageOptions = isRTL
    ? [
      { id: 'hot-coffee', label: 'قهوة ساخنة', icon: Coffee },
      { id: 'iced-coffee', label: 'قهوة مثلجة', icon: IceCream },
      { id: 'tea', label: 'شاي', icon: Leaf },
      { id: 'smoothie', label: 'سموذي/عصير', icon: IceCream },
      { id: 'water', label: 'ماء', icon: Droplets },
      { id: 'other', label: 'أخرى', icon: CircleHelp },
    ]
    : beverageOptionsEn;
  const servingSizeOptions = isRTL
    ? [
      { id: 'small', label: 'صغير', description: '6-8 أونصة' },
      { id: 'medium', label: 'متوسط', description: '10-12 أونصة' },
      { id: 'large', label: 'كبير', description: '14-16 أونصة' },
      { id: 'extra-large', label: 'كبير جدا', description: '18-22 أونصة' },
    ]
    : servingSizeOptionsEn;
  const insulationOptions = isRTL
    ? [
      { id: 'yes', label: 'نعم', description: 'مشروبات ساخنة تُحمل باليد', value: true },
      { id: 'no', label: 'لا', description: 'مشروبات باردة / يوجد غلاف', value: false },
    ]
    : insulationOptionsEn;
  const [state, setState] = useState<SizeRecommenderState>({
    step: 1,
    beverage: null,
    servingSize: null,
    needsInsulation: null,
  });

  const handleBeverageSelect = (beverage: string) => {
    setState((prev) => ({ ...prev, beverage, step: 2 }));
  };

  const handleSizeSelect = (size: string) => {
    setState((prev) => ({ ...prev, servingSize: size, step: 3 }));
  };

  const handleInsulationSelect = (needs: boolean) => {
    setState((prev) => ({ ...prev, needsInsulation: needs, step: 'result' }));
  };

  const handleBack = () => {
    setState((prev) => {
      if (prev.step === 2) return { ...prev, step: 1 };
      if (prev.step === 3) return { ...prev, step: 2 };
      if (prev.step === 'result') return { ...prev, step: 3 };
      return prev;
    });
  };

  const handleReset = () => {
    setState({
      step: 1,
      beverage: null,
      servingSize: null,
      needsInsulation: null,
    });
  };

  const recommendation = state.step === 'result' ? getRecommendation(state, isRTL) : null;
  const progress = state.step === 'result' ? 100 : ((state.step - 1) / 3) * 100;

  return (
    <section ref={ref} className="py-16 bg-primary-50">
      <SiteContainer>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className={cn(
                'text-2xl lg:text-3xl font-bold text-text-primary mb-2',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
            >
              {isRTL ? 'غير متأكد من المقاس؟ دعنا نساعدك' : 'Not Sure Which Size? Let Us Help'}
            </h2>
            <p
              className={cn(
                'text-text-secondary',
                'animate-fade-in-up',
                isVisible && 'is-visible'
              )}
              style={{ animationDelay: '100ms' }}
            >
              {isRTL ? 'أجب عن بعض الأسئلة السريعة للحصول على توصية مناسبة لك.' : 'Answer a few quick questions to get a personalized recommendation.'}
            </p>
          </div>

          {/* Progress Bar */}
          <div
            className={cn(
              'h-2 bg-gray-200 rounded-full mb-8 overflow-hidden',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '200ms' }}
          >
            <div
              className="h-full bg-primary-500 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Recommender Card */}
          <div
            className={cn(
              'bg-white rounded-xl shadow-lg p-6 lg:p-8',
              'animate-fade-in-up',
              isVisible && 'is-visible'
            )}
            style={{ animationDelay: '300ms' }}
          >
            <div aria-live="polite">
              {/* Step 1: Beverage Selection */}
              {state.step === 1 && (
                <div className="animate-slide-in">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    {isRTL ? 'الخطوة 1: ماذا ستقدم؟' : 'Step 1: What will you serve?'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {beverageOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleBeverageSelect(option.id)}
                          className={cn(
                            'flex flex-col items-center justify-center p-4 rounded-lg border-2',
                            'transition-all duration-200',
                            'hover:border-primary-500 hover:bg-primary-50',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                            state.beverage === option.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-border-light'
                          )}
                        >
                          <Icon className="w-8 h-8 text-primary-500 mb-2" />
                          <span className="text-sm font-medium text-text-primary">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Serving Size */}
              {state.step === 2 && (
                <div className="animate-slide-in">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    {isRTL ? 'الخطوة 2: ما حجم التقديم؟' : 'Step 2: What serving size?'}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {servingSizeOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSizeSelect(option.id)}
                        className={cn(
                          'flex flex-col items-center justify-center p-4 rounded-lg border-2',
                          'transition-all duration-200',
                          'hover:border-primary-500 hover:bg-primary-50',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                          state.servingSize === option.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-border-light'
                        )}
                      >
                        <span className="text-lg font-semibold text-text-primary">
                          {option.label}
                        </span>
                        <span className="text-sm text-text-muted">{option.description}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleBack}
                    className="mt-4 flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} /> {isRTL ? 'رجوع' : 'Back'}
                  </button>
                </div>
              )}

              {/* Step 3: Insulation */}
              {state.step === 3 && (
                <div className="animate-slide-in">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    {isRTL ? 'الخطوة 3: هل تحتاج عزلا حراريا؟' : 'Step 3: Do you need insulation?'}
                  </h3>
                  <div className="flex items-center gap-2 mb-4 p-3 bg-accent-50 rounded-lg">
                    <ThermometerSun className="w-5 h-5 text-accent-600" />
                    <span className="text-sm text-accent-700">
                      {isRTL ? 'الأكواب المعزولة تسمح بحمل المشروبات الساخنة براحة دون غلاف.' : 'Insulated cups let customers hold hot drinks comfortably without sleeves.'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {insulationOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleInsulationSelect(option.value)}
                        className={cn(
                          'flex flex-col items-center justify-center p-4 rounded-lg border-2',
                          'transition-all duration-200',
                          'hover:border-primary-500 hover:bg-primary-50',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                          'border-border-light'
                        )}
                      >
                        <span className="text-lg font-semibold text-text-primary">
                          {option.label}
                        </span>
                        <span className="text-sm text-text-muted text-center">
                          {option.description}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleBack}
                    className="mt-4 flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} /> {isRTL ? 'رجوع' : 'Back'}
                  </button>
                </div>
              )}

              {/* Result */}
              {state.step === 'result' && recommendation && (
                <div className="animate-slide-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {isRTL ? 'توصيتنا لك' : 'Your Recommendation'}
                    </h3>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-6 mb-6">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-primary-600">
                        {recommendation.sizeOz}{isRTL ? ' أونصة' : 'oz'}
                      </span>
                      <span className="block text-xl font-semibold text-text-primary mt-1">
                        {isRTL ? `كوب ${recommendation.cupTypeLabel}` : `${recommendation.cupTypeLabel} Cup`}
                      </span>
                    </div>
                    <p className="text-text-secondary text-center">
                      {recommendation.reasoning}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      asChild
                    >
                      <Link
                        href={`/get-a-quote?cup_type=${recommendation.cupType}&size=${recommendation.sizeOz}oz`}
                      >
                        {isRTL ? 'احصل على عرض سعر لهذا الكوب' : 'Get a Quote for This Cup'}
                      </Link>
                    </Button>
                    <Button variant="secondary" size="lg" onClick={handleReset}>
                      {isRTL ? 'ابدأ من جديد' : 'Start Over'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
