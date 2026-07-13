'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { ResponsiveSheet, SheetPage } from './ResponsiveSheet';
import { sendContactMessage, type ContactFormState } from '@/app/actions/contact';

const initialState: ContactFormState = { status: 'idle' };

interface ContactSheetProps {
  open: boolean;
  onClose: () => void;
}

export function ContactSheet({ open, onClose }: ContactSheetProps) {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  return (
    <ResponsiveSheet
      open={open}
      onClose={onClose}
      maxWidth="max-w-xl"
      header={({ collapsed }) => (
        <div style={{ background: '#2A2622', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute',
              top: '-60px',
              right: '-24px',
              fontFamily: 'var(--font-display)',
              fontSize: '14rem',
              color: 'var(--color-accent)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
            }}>
              Hi
            </div>
          </div>

          <div style={{ position: 'relative', padding: collapsed ? '14px 28px 12px' : '36px 28px 30px', zIndex: 1, transition: 'padding 0.3s ease' }}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: collapsed ? 0 : '14px',
              maxHeight: collapsed ? 0 : '20px',
              opacity: collapsed ? 0 : 1,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}>
              Get in Touch
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: collapsed ? '1.4rem' : 'clamp(2.6rem, 7vw, 3.8rem)',
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: 0,
              paddingTop: '0.08em',
              transition: 'all 0.3s ease',
            }}>
              Let&apos;s talk.
            </h2>
          </div>
        </div>
      )}
    >
      <SheetPage name="main">
        <div style={{ padding: '28px' }}>
          {state.status === 'success' ? (
            <div
              style={{
                textAlign: 'center',
                padding: '32px 36px 28px',
                border: '2px solid var(--color-accent)',
                borderRadius: '3px',
                background: 'transparent',
                maxWidth: '520px',
                margin: '12px auto',
                fontFamily: 'var(--font-display)',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1.05,
              }}
            >
              <div style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)' }}>
                Message Sent
              </div>
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  marginTop: '10px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--color-accent)',
                }}
              >
                · I&apos;ll be in touch soon ·
              </div>
            </div>
          ) : (
            <form
              action={formAction}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                aria-hidden="true"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-grid">
                <Field
                  label="Name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  error={state.errors?.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  error={state.errors?.email}
                />
              </div>

              <Field
                label="Message"
                name="message"
                required
                multiline
                placeholder="Tell me about the role, project, or idea you have in mind."
                error={state.errors?.message}
              />

              {state.status === 'error' && state.message && !state.errors && (
                <p style={{ color: 'var(--color-accent)', fontSize: '13px', fontWeight: 500 }}>
                  {state.message}
                </p>
              )}

              <SubmitButton />

              <style jsx>{`
                @media (max-width: 480px) {
                  .contact-grid {
                    grid-template-columns: 1fr !important;
                  }
                }
              `}</style>
            </form>
          )}
        </div>
      </SheetPage>
    </ResponsiveSheet>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  placeholder?: string;
  error?: string;
}

function Field({ label, name, type = 'text', required, autoComplete, multiline, placeholder, error }: FieldProps) {
  const restingBorder = error ? 'var(--color-accent)' : 'var(--color-border)';

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 15px',
    fontSize: '15px',
    fontFamily: 'inherit',
    color: 'var(--color-fg)',
    background: '#ECE8DF',
    border: `1px solid ${restingBorder}`,
    borderRadius: '3px',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    boxShadow: 'inset 0 1px 2px rgba(34, 33, 30, 0.06)',
    transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-accent)';
    e.currentTarget.style.boxShadow =
      'inset 0 1px 2px rgba(34, 33, 30, 0.06), 0 0 0 3px rgba(217, 68, 32, 0.14)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = restingBorder;
    e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(34, 33, 30, 0.06)';
  };

  return (
    <div>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'var(--color-muted)',
          marginBottom: '8px',
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={5}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="contact-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', fontFamily: 'inherit' }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="contact-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
        />
      )}
      {error && (
        <p style={{ color: 'var(--color-accent)', fontSize: '12px', marginTop: '6px', fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        alignSelf: 'flex-end',
        padding: '12px 22px 10px',
        background: 'transparent',
        color: 'var(--color-accent)',
        border: '2px solid var(--color-accent)',
        borderRadius: '3px',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        lineHeight: 1.05,
        textAlign: 'center',
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.5 : 1,
        transition: 'background 0.18s ease, color 0.18s ease, transform 0.18s ease',
      }}
      onMouseEnter={(e) => {
        if (!pending) {
          e.currentTarget.style.background = 'var(--color-accent)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--color-accent)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div>{pending ? 'Sending' : 'Send Message'}</div>
      <div
        style={{
          fontSize: '9px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          letterSpacing: '0.2em',
          marginTop: '5px',
          paddingTop: '4px',
          borderTop: '1px solid currentColor',
          whiteSpace: 'nowrap',
        }}
      >
        {pending ? '· One moment ·' : '· Hit me up ·'}
      </div>
    </button>
  );
}
