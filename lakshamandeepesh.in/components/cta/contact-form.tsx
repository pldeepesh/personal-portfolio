'use client';

import { type FormEvent, useState } from 'react';
import { Send } from 'lucide-react';

import { Button } from '@/components/primitives/button';
import { FieldLabel, FormField, InlineError, Select, Textarea, TextInput } from '@/components/primitives/form';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/lib/site-config';

type ContactFormErrors = Partial<Record<'name' | 'email' | 'helpType' | 'projectType' | 'timeline' | 'message' | 'form', string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validateContactForm(formData);

    setErrors(nextErrors);
    setStatus('idle');

    if (Object.keys(nextErrors).length > 0) return;

    if (siteConfig.contactFormAction.includes('your-form-id')) {
      setErrors({ form: 'Configure NEXT_PUBLIC_CONTACT_FORM_ACTION to activate this form.' });
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(siteConfig.contactFormAction, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) throw new Error('Contact request failed');

      trackEvent('contact_form_submitted', { location: 'contact_page' });
      setStatus('success');
      form.reset();
    } catch (_error) {
      setErrors({ form: 'Could not submit right now. Please email me directly or try again later.' });
      setStatus('error');
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <TextInput id="name" name="name" placeholder="Your name" />
          <InlineError>{errors.name}</InlineError>
        </FormField>
        <FormField>
          <FieldLabel htmlFor="email">Work email</FieldLabel>
          <TextInput id="email" name="email" placeholder="you@company.com" type="email" />
          <InlineError>{errors.email}</InlineError>
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField>
          <FieldLabel htmlFor="helpType">Help type</FieldLabel>
          <Select id="helpType" name="helpType" defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Analytics system design</option>
            <option>AI workflow advisory</option>
            <option>Experimentation system</option>
            <option>Growth funnel diagnosis</option>
            <option>Other</option>
          </Select>
          <InlineError>{errors.helpType}</InlineError>
        </FormField>
        <FormField>
          <FieldLabel htmlFor="projectType">Budget / project type</FieldLabel>
          <Select id="projectType" name="projectType" defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Advisory call</option>
            <option>Focused sprint</option>
            <option>Monthly advisory</option>
            <option>Not sure yet</option>
          </Select>
          <InlineError>{errors.projectType}</InlineError>
        </FormField>
        <FormField>
          <FieldLabel htmlFor="timeline">Timeline</FieldLabel>
          <Select id="timeline" name="timeline" defaultValue="">
            <option value="" disabled>Select one</option>
            <option>This month</option>
            <option>Next 1-2 months</option>
            <option>This quarter</option>
            <option>Exploring</option>
          </Select>
          <InlineError>{errors.timeline}</InlineError>
        </FormField>
      </div>

      <FormField>
        <FieldLabel htmlFor="message">What decision or workflow do you want to improve?</FieldLabel>
        <Textarea id="message" name="message" placeholder="Share context, current stack, bottlenecks, and what success would look like." />
        <InlineError>{errors.message}</InlineError>
      </FormField>

      <input aria-hidden="true" aria-label="Company website" className="hidden" name="company_website" tabIndex={-1} type="text" />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">
          <Send className="h-4 w-4" />
          Send Project Context
        </Button>
        {status === 'success' ? <p className="text-sm font-semibold text-success">Message sent. I will reply soon.</p> : null}
        {status === 'error' || errors.form ? <InlineError>{errors.form}</InlineError> : null}
      </div>
    </form>
  );
}

function validateContactForm(formData: FormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const helpType = String(formData.get('helpType') ?? '').trim();
  const projectType = String(formData.get('projectType') ?? '').trim();
  const timeline = String(formData.get('timeline') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (name.length < 2) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid work email.';
  if (!helpType) errors.helpType = 'Choose a help type.';
  if (!projectType) errors.projectType = 'Choose a project type.';
  if (!timeline) errors.timeline = 'Choose a timeline.';
  if (message.length < 30) errors.message = 'Share at least 30 characters of context.';

  return errors;
}
