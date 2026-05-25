import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

type FieldProps = {
  children: ReactNode;
  className?: string;
};

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;
type ErrorProps = {
  children?: ReactNode;
  id?: string;
};

const fieldControlClassName =
  'w-full rounded-lg border border-border bg-background/72 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/25';

export function FormField({ children, className }: FieldProps) {
  return <div className={`space-y-2 ${className ?? ''}`}>{children}</div>;
}

export function FieldLabel({ children, className, ...props }: LabelProps) {
  return (
    <label className={`block text-sm font-semibold text-ink ${className ?? ''}`} {...props}>
      {children}
    </label>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${fieldControlClassName} ${className ?? ''}`} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${fieldControlClassName} min-h-32 resize-y ${className ?? ''}`} {...props} />;
}

export function Select({ children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${fieldControlClassName} ${className ?? ''}`} {...props}>
      {children}
    </select>
  );
}

export function InlineError({ children, id }: ErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p className="text-sm font-medium text-gold" id={id}>
      {children}
    </p>
  );
}
