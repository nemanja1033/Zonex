"use client"

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { EASING } from '@/lib/animations'

type FormState = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialState: FormState = {
  name: '',
  email: '',
  message: '',
}

export default function ContactForm() {
  const reduceMotion = useReducedMotion()
  const [values, setValues] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const updateField = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const nextErrors: FormErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Unesite ime i kompaniju.'
    if (!values.email.trim()) {
      nextErrors.email = 'Unesite email adresu.'
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = 'Unesite ispravan email.'
    }
    if (!values.message.trim()) nextErrors.message = 'Dodajte kratak opis projekta.'
    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setIsSubmitting(true)
    setIsSent(false)

    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
      setValues(initialState)
    }, 900)
  }

  const shake = reduceMotion ? undefined : { x: [0, -6, 6, -4, 4, 0] }

  return (
    <form
      className="p-6 md:p-8 rounded-2xl bg-[#303036] border border-white/12 space-y-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <Field
        label="Ime i kompanija"
        value={values.name}
        onChange={updateField('name')}
        error={errors.name}
        shake={shake}
        autoComplete="name"
      />
      <Field
        label="Email"
        type="email"
        value={values.email}
        onChange={updateField('email')}
        error={errors.email}
        shake={shake}
        autoComplete="email"
      />
      <Field
        label="Opis projekta"
        as="textarea"
        value={values.message}
        onChange={updateField('message')}
        error={errors.message}
        shake={shake}
      />
      <div className="space-y-3">
        <motion.div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <motion.div
            className="h-full bg-[#DC2626]"
            initial={{ scaleX: 0 }}
            animate={isSubmitting ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3, ease: EASING.power4 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#DC2626] py-4 text-sm font-medium uppercase tracking-[0.1em] text-white transition-all duration-300 hover:shadow-[0_8px_32px_rgba(220,38,38,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              Slanje...
            </>
          ) : isSent ? (
            <>
              <motion.svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15, ease: EASING.power4 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: EASING.power4 }}
                />
              </motion.svg>
              <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, ease: EASING.power4 }}>
                Potvrđeno
              </motion.span>
            </>
          ) : (
            'Pošalji upit'
          )}
        </button>
      </div>
      <AnimatePresence>
        {isSent && (
          <motion.p
            className="text-sm text-white/70"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: EASING.power4 }}
          >
            Primili smo upit. Vraćamo se u najkraćem roku.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

type FieldProps = {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  type?: string
  as?: 'input' | 'textarea'
  shake?: { x: number[] }
  autoComplete?: string
}

function Field({
  label,
  value,
  onChange,
  error,
  type = 'text',
  as = 'input',
  shake,
  autoComplete,
}: FieldProps) {
  const Component = as
  const fieldId = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <motion.div animate={error ? shake : undefined} transition={{ duration: 0.15, ease: EASING.power4 }}>
      <label htmlFor={fieldId} className="text-sm font-medium text-white/80">
        {label}
      </label>
      <Component
        id={fieldId}
        className="mt-2 w-full rounded-lg border border-white/12 bg-[#3A3A42] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/40 focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
        placeholder={label}
        value={value}
        onChange={onChange}
        type={as === 'input' ? type : undefined}
        rows={as === 'textarea' ? 5 : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        autoComplete={autoComplete}
      />
      <AnimatePresence mode="wait">
        <motion.p
          key={error ? 'error' : 'helper'}
          id={error ? `${fieldId}-error` : undefined}
          className={`mt-2 text-xs ${error ? 'text-[#DC2626]' : 'text-white/40'}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: EASING.power4 }}
        >
          {error ?? 'Polje je obavezno za brzu procenu projekta.'}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}
