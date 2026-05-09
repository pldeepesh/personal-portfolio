'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { trackEvent } from '@/lib/analytics';

type DriverSalaryTemplate = 'template-1' | 'template-2' | 'template-3';
type Salutation = 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.';
type CurrencyCode = 'INR' | 'USD' | 'EUR';

type DriverSalaryFormState = {
  template: DriverSalaryTemplate;
  driverSalutation: Salutation;
  driverName: string;
  employeeSalutation: Salutation;
  employeeName: string;
  vehicleNumber: string;
  paymentDate: string;
  currency: CurrencyCode;
  salaryAmount: string;
  salaryMonth: string;
  needsRevenueStamp: boolean;
  disclaimer: string;
  signatureName: string;
  signatureDataUrl: string;
};

const DEFAULT_DISCLAIMER =
  'I also declare that the driver is exclusively utilized for official purpose only. Please reimburse the above amount.';

const DEFAULT_FORM_STATE: DriverSalaryFormState = {
  template: 'template-1',
  driverSalutation: 'Mr.',
  driverName: '',
  employeeSalutation: 'Mr.',
  employeeName: '',
  vehicleNumber: '',
  paymentDate: '',
  currency: 'INR',
  salaryAmount: '',
  salaryMonth: '',
  needsRevenueStamp: true,
  disclaimer: DEFAULT_DISCLAIMER,
  signatureName: '',
  signatureDataUrl: ''
};

const TEMPLATE_OPTIONS: Array<{ value: DriverSalaryTemplate; label: string }> = [
  { value: 'template-1', label: 'Template 1' },
  { value: 'template-2', label: 'Template 2' },
  { value: 'template-3', label: 'Template 3' }
];

const SALUTATION_OPTIONS: Salutation[] = ['Mr.', 'Mrs.', 'Ms.', 'Dr.'];
const CURRENCY_OPTIONS: Array<{ value: CurrencyCode; label: string; locale: string }> = [
  { value: 'INR', label: 'Indian Rupee (INR)', locale: 'en-IN' },
  { value: 'USD', label: 'US Dollar (USD)', locale: 'en-US' },
  { value: 'EUR', label: 'Euro (EUR)', locale: 'en-IE' }
];
const MONTH_OPTIONS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function getCurrencyLocale(currency: CurrencyCode): string {
  return CURRENCY_OPTIONS.find((option) => option.value === currency)?.locale ?? 'en-IN';
}

function formatCurrency(amount: string, currency: CurrencyCode): string {
  const value = Number(amount);

  if (!Number.isFinite(value) || value <= 0) {
    return new Intl.NumberFormat(getCurrencyLocale(currency), {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(0);
  }

  return new Intl.NumberFormat(getCurrencyLocale(currency), {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

function formatDateDisplay(dateString: string): string {
  if (!dateString) {
    return 'Date pending';
  }

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (Number.isNaN(date.getTime())) {
    return 'Date pending';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
}

function getFilledName(salutation: string, name: string): string {
  return `${salutation} ${name}`.trim();
}

function templateClasses(template: DriverSalaryTemplate) {
  switch (template) {
    case 'template-2':
      return {
        shell: 'border-accent/30 bg-[linear-gradient(180deg,#fffaf3_0%,#fffdf9_100%)]',
        heading: 'text-accent',
        receipt: 'bg-white'
      };
    case 'template-3':
      return {
        shell: 'border-ink/15 bg-[linear-gradient(180deg,#f7f1e7_0%,#fffdf8_100%)]',
        heading: 'text-ink',
        receipt: 'bg-paper'
      };
    default:
      return {
        shell: 'border-border bg-white',
        heading: 'text-accent',
        receipt: 'bg-paper'
      };
  }
}

function getClientDefaultFields() {
  const now = new Date();

  return {
    paymentDate: now.toISOString().slice(0, 10),
    salaryMonth: MONTH_OPTIONS[now.getUTCMonth()] ?? ''
  };
}

export function DriverSalarySlipGenerator() {
  const [form, setForm] = useState<DriverSalaryFormState>(DEFAULT_FORM_STATE);

  useEffect(() => {
    const defaults = getClientDefaultFields();

    setForm((current) => ({
      ...current,
      paymentDate: current.paymentDate || defaults.paymentDate,
      salaryMonth: current.salaryMonth || defaults.salaryMonth
    }));
  }, []);

  useEffect(() => {
    const originalTitle = document.title;

    function handleBeforePrint() {
      document.title = '';
    }

    function handleAfterPrint() {
      document.title = originalTitle;
    }

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      document.title = originalTitle;
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  function updateField<Key extends keyof DriverSalaryFormState>(key: Key, value: DriverSalaryFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleTemplateChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as DriverSalaryTemplate;
    updateField('template', value);
    trackEvent('tool_template_change', { slug: 'driver-salary-slip-generator', template: value });
  }

  function handleSignatureUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      updateField('signatureName', '');
      updateField('signatureDataUrl', '');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField('signatureName', file.name);
      updateField('signatureDataUrl', typeof reader.result === 'string' ? reader.result : '');
    };
    reader.readAsDataURL(file);
  }

  function handleReset() {
    const defaults = getClientDefaultFields();
    setForm({ ...DEFAULT_FORM_STATE, ...defaults });
    trackEvent('tool_reset_click', { slug: 'driver-salary-slip-generator' });
  }

  function handlePrint() {
    trackEvent('tool_print_click', { slug: 'driver-salary-slip-generator', template: form.template });
    window.print();
  }

  const amountLabel = formatCurrency(form.salaryAmount, form.currency);
  const driverDisplayName = getFilledName(form.driverSalutation, form.driverName).trim();
  const employeeDisplayName = getFilledName(form.employeeSalutation, form.employeeName).trim();
  const visual = templateClasses(form.template);

  return (
    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="print-hidden rounded-2xl border border-border bg-white p-6 shadow-editorial sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Live generator</p>
            <h2 className="mt-3 font-heading text-3xl text-ink">Generate driver salary slip</h2>
          </div>
          <div className="rounded-full border border-border bg-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Client-side only
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-sm font-semibold text-ink">Template</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {TEMPLATE_OPTIONS.map((option) => (
                <label
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition ${
                    form.template === option.value
                      ? 'border-accent bg-tint text-ink'
                      : 'border-border bg-paper text-muted hover:border-accent'
                  }`}
                  key={option.value}
                >
                  <input
                    checked={form.template === option.value}
                    className="sr-only"
                    name="template"
                    onChange={handleTemplateChange}
                    type="radio"
                    value={option.value}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink">
              Driver salutation
              <select
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                onChange={(event) => updateField('driverSalutation', event.target.value as Salutation)}
                value={form.driverSalutation}
              >
                {SALUTATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-ink">
              Driver name
              <input
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                onChange={(event) => updateField('driverName', event.target.value)}
                placeholder="Driver name"
                type="text"
                value={form.driverName}
              />
            </label>

            <label className="text-sm font-medium text-ink">
              Employee salutation
              <select
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                onChange={(event) => updateField('employeeSalutation', event.target.value as Salutation)}
                value={form.employeeSalutation}
              >
                {SALUTATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-ink">
              Employee name
              <input
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                onChange={(event) => updateField('employeeName', event.target.value)}
                placeholder="Employee name"
                type="text"
                value={form.employeeName}
              />
            </label>

            <label className="text-sm font-medium text-ink">
              Vehicle number
              <input
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                onChange={(event) => updateField('vehicleNumber', event.target.value.toUpperCase())}
                placeholder="TS09AB1234"
                type="text"
                value={form.vehicleNumber}
              />
            </label>

            <label className="text-sm font-medium text-ink">
              Payment date
              <input
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                onChange={(event) => updateField('paymentDate', event.target.value)}
                type="date"
                value={form.paymentDate}
              />
            </label>

            <label className="text-sm font-medium text-ink">
              Currency
              <select
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                onChange={(event) => updateField('currency', event.target.value as CurrencyCode)}
                value={form.currency}
              >
                {CURRENCY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-ink">
              Salary amount
              <input
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                min="0"
                onChange={(event) => updateField('salaryAmount', event.target.value)}
                placeholder="10000"
                type="number"
                value={form.salaryAmount}
              />
            </label>

            <label className="text-sm font-medium text-ink">
              Salary month
              <select
                className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
                onChange={(event) => updateField('salaryMonth', event.target.value)}
                value={form.salaryMonth}
              >
                <option value="">Select month</option>
                {MONTH_OPTIONS.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-border bg-paper px-4 py-3 text-sm font-medium text-ink">
              <input
                checked={form.needsRevenueStamp}
                className="h-4 w-4 accent-[var(--color-accent)]"
                onChange={(event) => updateField('needsRevenueStamp', event.target.checked)}
                type="checkbox"
              />
              Need revenue stamp?
            </label>

            <label className="text-sm font-medium text-ink">
              Signature upload
              <input
                accept="image/*"
                className="mt-2 block w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink file:mr-4 file:rounded-lg file:border-0 file:bg-tint file:px-3 file:py-2 file:font-semibold file:text-ink"
                onChange={handleSignatureUpload}
                type="file"
              />
              {form.signatureName ? <span className="mt-2 block text-xs text-muted">Loaded: {form.signatureName}</span> : null}
            </label>
          </div>

          <label className="block text-sm font-medium text-ink">
            Disclaimer
            <textarea
              className="mt-2 min-h-28 w-full rounded-xl border border-border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-accent"
              onChange={(event) => updateField('disclaimer', event.target.value)}
              placeholder="Optional declaration text"
              value={form.disclaimer}
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button className="btn-primary" onClick={handlePrint} type="button">
              Print / Save PDF
            </button>
            <button className="btn-secondary" onClick={handleReset} type="button">
              Reset form
            </button>
          </div>

          <p className="text-xs leading-6 text-muted">
            This tool stays in your browser. Use the print dialog to save a PDF after reviewing the preview.
          </p>
          <p className="text-xs leading-6 text-muted">
            To remove the browser title and URL from the saved PDF, turn off <span className="font-semibold text-ink">Headers and footers</span> in the print dialog.
          </p>
        </div>
      </section>

      <section className="print-document-root preview-stage rounded-[32px] border border-[#cfc5b7] bg-[linear-gradient(145deg,#d7cec0_0%,#efe9df_42%,#d5cabd_100%)] p-5 shadow-[0_30px_90px_rgba(31,40,34,0.14)] sm:p-7 print-shell">
        <div className="print-hidden mb-5 flex items-center justify-between gap-4 px-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/65">Preview stage</p>
            <h2 className="mt-2 font-heading text-2xl text-ink">A4 salary receipt preview</h2>
          </div>
          <div className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70 shadow-sm backdrop-blur">
            Paper preview
          </div>
        </div>

        <div className={`print-preview print-document-page mx-auto rounded-[28px] border p-6 sm:p-8 ${visual.shell}`}>
          <div className={`print-document-card rounded-[24px] border border-border/70 p-6 sm:p-8 ${visual.receipt}`}>
            <div className="print-document-header flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${visual.heading}`}>Driver salary receipt</p>
                <h3 className="mt-3 font-heading text-3xl text-ink">Monthly payment acknowledgement</h3>
              </div>
              <div className="print-document-block rounded-2xl border border-border bg-white px-4 py-3 text-right text-sm text-muted">
                <p>Payment date</p>
                <p className="mt-1 font-semibold text-ink">{formatDateDisplay(form.paymentDate)}</p>
              </div>
            </div>

            <div className="print-document-grid mt-6 grid gap-4 md:grid-cols-[1.15fr_0.9fr_0.95fr]">
              <div className="print-document-block rounded-2xl border border-border bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Paid amount</p>
                <p className="mt-2 font-heading text-[clamp(1.5rem,2vw,2.15rem)] leading-tight text-ink [overflow-wrap:anywhere]">
                  {amountLabel}
                </p>
              </div>
              <div className="print-document-block rounded-2xl border border-border bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Salary month</p>
                <p className="mt-2 text-sm font-semibold text-ink">{form.salaryMonth || 'Pending month'}</p>
              </div>
              <div className="print-document-block rounded-2xl border border-border bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Vehicle number</p>
                <p className="mt-2 text-sm font-semibold text-ink">{form.vehicleNumber || 'Pending vehicle number'}</p>
              </div>
            </div>

            <div className="print-document-block mt-6 rounded-2xl border border-border bg-white p-5">
              <h4 className="font-heading text-2xl text-ink">Driver Salary Receipt</h4>
              <p className="mt-4 text-sm leading-8 text-muted">
                This is to certify that I have paid {amountLabel} to driver {driverDisplayName || '__________'} for the
                month of {form.salaryMonth || '__________'} (acknowledged receipt enclosed). {form.disclaimer || DEFAULT_DISCLAIMER}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">Employee name</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{employeeDisplayName || 'Pending employee name'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">Date</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{formatDateDisplay(form.paymentDate)}</p>
                </div>
              </div>
            </div>

            <div className="print-document-block mt-6 rounded-2xl border border-border bg-white p-5">
              <h4 className="font-heading text-2xl text-ink">Receipt Acknowledgement</h4>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">Date of receipt</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{formatDateDisplay(form.paymentDate)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">For the month of</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{form.salaryMonth || 'Pending month'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">Driver name</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{driverDisplayName || 'Pending driver name'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">Vehicle no.</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{form.vehicleNumber || 'Pending vehicle number'}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-8 text-muted">
                Received a sum of {amountLabel} only for the month of {form.salaryMonth || '__________'} from{' '}
                {employeeDisplayName || '__________'}.
              </p>

              <div className="print-signature-grid mt-8 grid gap-6 sm:grid-cols-[1fr_160px]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">Driver signature</p>
                  <div className="mt-3 flex min-h-20 items-end border-b border-border pb-2">
                    {form.signatureDataUrl ? (
                      <img
                        alt="Uploaded signature preview"
                        className="print-signature-image max-h-16 w-auto object-contain"
                        src={form.signatureDataUrl}
                      />
                    ) : (
                      <span className="text-sm text-muted">Signature pending</span>
                    )}
                  </div>
                </div>

                {form.needsRevenueStamp ? (
                  <div className="print-document-block print-stamp-area rounded-2xl border border-dashed border-accent/45 bg-tint px-4 py-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">Revenue stamp</p>
                    <div className="mt-3 flex h-20 items-center justify-center rounded-xl border border-accent/30 bg-white px-3 text-sm font-semibold text-ink">
                      Affix here
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
