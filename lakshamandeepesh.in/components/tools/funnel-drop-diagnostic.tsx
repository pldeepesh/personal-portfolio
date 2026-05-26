'use client';

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { ArrowDownToLine, ArrowRight, Copy, Mail, RotateCcw } from 'lucide-react';

import { Button } from '@/components/primitives/button';
import { FieldLabel, FormField, InlineError, TextInput, Textarea } from '@/components/primitives/form';
import { trackEvent } from '@/lib/analytics';

type DiagnosticResult = {
  headline: string;
  volumeLoss: number;
  conversionLoss: number;
  totalRevenueChange: number;
  stageFinding: string;
  questions: string[];
  actions: string[];
  summary: string;
};

type FormState = {
  previousLeads: string;
  currentLeads: string;
  previousConversionRate: string;
  currentConversionRate: string;
  previousRevenue: string;
  currentRevenue: string;
  stages: string;
  segment: string;
  email: string;
};

const initialState: FormState = {
  previousLeads: '1200',
  currentLeads: '930',
  previousConversionRate: '14',
  currentConversionRate: '10.5',
  previousRevenue: '84000',
  currentRevenue: '58500',
  stages: 'Landing page,1200,930\nQualified lead,620,410\nDemo booked,210,120\nClosed won,168,98',
  segment: '',
  email: ''
};

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency'
  }).format(Math.max(0, Math.round(value)));
}

function numberFrom(value: string) {
  const parsed = Number(value.replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseStages(input: string) {
  return input
    .split('\n')
    .map((line) => {
      const [name, previous, current] = line.split(',').map((part) => part.trim());
      return {
        name,
        previous: numberFrom(previous ?? ''),
        current: numberFrom(current ?? '')
      };
    })
    .filter((stage) => stage.name && stage.previous > 0 && stage.current >= 0);
}

function diagnose(state: FormState): DiagnosticResult {
  const previousLeads = numberFrom(state.previousLeads);
  const currentLeads = numberFrom(state.currentLeads);
  const previousConversionRate = numberFrom(state.previousConversionRate);
  const currentConversionRate = numberFrom(state.currentConversionRate);
  const previousRevenue = numberFrom(state.previousRevenue);
  const currentRevenue = numberFrom(state.currentRevenue);

  const previousCustomers = Math.max(1, previousLeads * (previousConversionRate / 100));
  const valuePerCustomer = previousRevenue / previousCustomers;
  const volumeLostLeads = Math.max(0, previousLeads - currentLeads);
  const volumeLoss = volumeLostLeads * (previousConversionRate / 100) * valuePerCustomer;
  const expectedCustomersAtPreviousRate = currentLeads * (previousConversionRate / 100);
  const currentCustomers = currentLeads * (currentConversionRate / 100);
  const conversionLoss = Math.max(0, expectedCustomersAtPreviousRate - currentCustomers) * valuePerCustomer;
  const totalRevenueChange = currentRevenue - previousRevenue;

  const stages = parseStages(state.stages);
  let stageFinding = 'No valid stage-level rows were provided, so the result uses lead volume, conversion rate, and revenue movement.';

  if (stages.length >= 2) {
    const transitions = stages.slice(1).map((stage, index) => {
      const previousParent = stages[index].previous;
      const currentParent = stages[index].current;
      const previousRate = previousParent > 0 ? stage.previous / previousParent : 0;
      const currentRate = currentParent > 0 ? stage.current / currentParent : 0;

      return {
        name: `${stages[index].name} to ${stage.name}`,
        delta: currentRate - previousRate,
        previousRate,
        currentRate
      };
    });
    const worst = transitions.sort((a, b) => a.delta - b.delta)[0];

    stageFinding = `${worst.name} shows the largest conversion-rate decline: ${(worst.previousRate * 100).toFixed(1)}% to ${(worst.currentRate * 100).toFixed(1)}%.`;
  }

  const volumeDropPercent = previousLeads > 0 ? ((previousLeads - currentLeads) / previousLeads) * 100 : 0;
  const conversionDropPoints = previousConversionRate - currentConversionRate;
  const headline =
    volumeLoss > conversionLoss
      ? 'Primary pressure appears to be lead volume loss.'
      : conversionLoss > volumeLoss
        ? 'Primary pressure appears to be conversion-rate loss.'
        : 'Volume and conversion pressure look similar.';

  const segmentPrefix = state.segment.trim() ? `For ${state.segment.trim()}, ` : '';
  const summary = `${segmentPrefix}leads moved from ${previousLeads.toLocaleString()} to ${currentLeads.toLocaleString()} (${volumeDropPercent.toFixed(1)}%), conversion moved from ${previousConversionRate.toFixed(1)}% to ${currentConversionRate.toFixed(1)}% (${conversionDropPoints.toFixed(1)} pts), and revenue changed by ${currency(Math.abs(totalRevenueChange))}.`;

  return {
    headline,
    volumeLoss,
    conversionLoss,
    totalRevenueChange,
    stageFinding,
    summary,
    questions: [
      'Did source mix, campaign intent, city/type mix, or cohort composition change during the same window?',
      'Did any tracking event, attribution rule, CRM status, or funnel stage definition change?',
      'Is the largest stage drop concentrated in one channel, landing page, audience, or lifecycle cohort?',
      'Did conversion quality move in the same direction as short-term revenue, retention, or refund guardrails?'
    ],
    actions: [
      'Segment the result by source, channel, location/type, and new versus returning audience.',
      'Audit event continuity for the stage with the largest rate decline before changing spend or UX.',
      'Run one focused experiment against the largest confirmed bottleneck instead of a full-funnel redesign.',
      'Add a weekly diagnostic readout that separates volume, conversion, revenue, and data-quality movement.'
    ]
  };
}

export function FunnelDropDiagnostic() {
  const [state, setState] = useState<FormState>(initialState);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const canCalculate = useMemo(
    () =>
      numberFrom(state.previousLeads) > 0 &&
      numberFrom(state.currentLeads) >= 0 &&
      numberFrom(state.previousConversionRate) > 0 &&
      numberFrom(state.currentConversionRate) >= 0 &&
      numberFrom(state.previousRevenue) > 0 &&
      numberFrom(state.currentRevenue) >= 0,
    [state]
  );

  function updateField(field: keyof FormState, value: string) {
    if (!started) {
      setStarted(true);
      trackEvent('tool_started', { tool: 'funnel-drop-diagnostic' });
    }

    setState((current) => ({ ...current, [field]: value }));
    setError('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!started) {
      setStarted(true);
      trackEvent('tool_started', { tool: 'funnel-drop-diagnostic' });
    }

    if (!canCalculate) {
      setError('Add valid previous/current leads, conversion rates, and revenue before calculating.');
      return;
    }

    const nextResult = diagnose(state);
    setResult(nextResult);
    setCopied(false);
    trackEvent('tool_completed', { tool: 'funnel-drop-diagnostic' });
  }

  async function copyResult() {
    if (!result) return;

    await navigator.clipboard.writeText(result.summary);
    setCopied(true);
    trackEvent('tool_result_copied', { tool: 'funnel-drop-diagnostic' });
  }

  function downloadResult() {
    if (!result) return;

    const content = [
      result.headline,
      '',
      result.summary,
      '',
      result.stageFinding,
      '',
      'Diagnostic questions:',
      ...result.questions.map((question) => `- ${question}`),
      '',
      'Recommended next actions:',
      ...result.actions.map((action) => `- ${action}`)
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'funnel-drop-diagnostic-result.txt';
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    trackEvent('tool_result_downloaded', { tool: 'funnel-drop-diagnostic' });
  }

  function emailResult() {
    if (!result) return;

    const subject = encodeURIComponent('Funnel Drop Diagnostic Result');
    const body = encodeURIComponent(`${result.headline}\n\n${result.summary}\n\n${result.stageFinding}\n\nRecommended actions:\n- ${result.actions.join('\n- ')}`);
    trackEvent('tool_result_emailed', { tool: 'funnel-drop-diagnostic' });
    window.location.href = `mailto:${state.email.trim()}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form className="rounded-lg border border-border bg-surface p-5 shadow-editorial sm:p-6" onSubmit={handleSubmit}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Tool input</p>
          <h2 className="mt-2 font-heading text-3xl text-ink">Compare the before and after funnel</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Use percentages for conversion rates. Add stage rows as: stage name, previous count, current count.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FormField>
            <FieldLabel htmlFor="previousLeads">Previous leads</FieldLabel>
            <TextInput id="previousLeads" inputMode="decimal" value={state.previousLeads} onChange={(event) => updateField('previousLeads', event.target.value)} />
          </FormField>
          <FormField>
            <FieldLabel htmlFor="currentLeads">Current leads</FieldLabel>
            <TextInput id="currentLeads" inputMode="decimal" value={state.currentLeads} onChange={(event) => updateField('currentLeads', event.target.value)} />
          </FormField>
          <FormField>
            <FieldLabel htmlFor="previousConversionRate">Previous conversion rate</FieldLabel>
            <TextInput
              id="previousConversionRate"
              inputMode="decimal"
              value={state.previousConversionRate}
              onChange={(event) => updateField('previousConversionRate', event.target.value)}
            />
          </FormField>
          <FormField>
            <FieldLabel htmlFor="currentConversionRate">Current conversion rate</FieldLabel>
            <TextInput
              id="currentConversionRate"
              inputMode="decimal"
              value={state.currentConversionRate}
              onChange={(event) => updateField('currentConversionRate', event.target.value)}
            />
          </FormField>
          <FormField>
            <FieldLabel htmlFor="previousRevenue">Previous revenue</FieldLabel>
            <TextInput id="previousRevenue" inputMode="decimal" value={state.previousRevenue} onChange={(event) => updateField('previousRevenue', event.target.value)} />
          </FormField>
          <FormField>
            <FieldLabel htmlFor="currentRevenue">Current revenue</FieldLabel>
            <TextInput id="currentRevenue" inputMode="decimal" value={state.currentRevenue} onChange={(event) => updateField('currentRevenue', event.target.value)} />
          </FormField>
        </div>

        <FormField className="mt-4">
          <FieldLabel htmlFor="stages">Funnel stages</FieldLabel>
          <Textarea id="stages" value={state.stages} onChange={(event) => updateField('stages', event.target.value)} />
        </FormField>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormField>
            <FieldLabel htmlFor="segment">Source, city/type, channel, or cohort</FieldLabel>
            <TextInput id="segment" placeholder="Optional segment label" value={state.segment} onChange={(event) => updateField('segment', event.target.value)} />
          </FormField>
          <FormField>
            <FieldLabel htmlFor="resultEmail">Email result to</FieldLabel>
            <TextInput id="resultEmail" placeholder="Optional email" type="email" value={state.email} onChange={(event) => updateField('email', event.target.value)} />
          </FormField>
        </div>

        <InlineError>{error}</InlineError>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="submit">
            Run diagnostic <ArrowRight aria-hidden="true" size={16} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setState(initialState);
              setResult(null);
              setError('');
              setCopied(false);
            }}
          >
            <RotateCcw aria-hidden="true" size={16} />
            Reset example
          </Button>
        </div>
      </form>

      <aside className="rounded-lg border border-border bg-surface p-5 shadow-editorial sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Diagnostic output</p>
        {result ? (
          <div className="mt-4 space-y-5">
            <div>
              <h2 className="font-heading text-3xl text-ink">{result.headline}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">{result.summary}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted">Volume loss estimate</p>
                <p className="mt-2 font-heading text-2xl text-ink">{currency(result.volumeLoss)}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted">Conversion loss estimate</p>
                <p className="mt-2 font-heading text-2xl text-ink">{currency(result.conversionLoss)}</p>
              </div>
            </div>

            <div className="rounded-lg border border-accent/30 bg-accent-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Where the drop happened</p>
              <p className="mt-2 text-sm leading-6 text-muted">{result.stageFinding}</p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-ink">Diagnostic questions</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                {result.questions.map((question) => (
                  <li key={question}>- {question}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-xl text-ink">Recommended next actions</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                {result.actions.map((action) => (
                  <li key={action}>- {action}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={copyResult}>
                <Copy aria-hidden="true" size={16} />
                {copied ? 'Copied' : 'Copy result'}
              </Button>
              <Button type="button" variant="secondary" onClick={downloadResult}>
                <ArrowDownToLine aria-hidden="true" size={16} />
                Download result
              </Button>
              <Button type="button" variant="secondary" onClick={emailResult}>
                <Mail aria-hidden="true" size={16} />
                Email result
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-dashed border-border p-5">
            <h2 className="font-heading text-2xl text-ink">Your diagnostic will appear here</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Run the example or enter your own funnel numbers to separate volume pressure from conversion pressure.
            </p>
          </div>
        )}
      </aside>
    </section>
  );
}
