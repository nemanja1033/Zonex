"use client"

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

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
      className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_60px_rgba(3,6,12,0.45)] backdrop-blur md:p-8"
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
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-3 button-primary py-3 text-micro font-mono uppercase tracking-micro disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border border-white/40 border-t-white" aria-hidden="true" />
            Slanje...
          </>
        ) : isSent ? (
          'Hvala, javicemo se.'
        ) : (
          'Pošalji upit'
        )}
      </button>
      <AnimatePresence>
        {isSent && (
          <motion.p
            className="text-small text-white/70"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: [0.22, 0.72, 0, 1] }}
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
    <motion.div animate={error ? shake : undefined} transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}>
      <label htmlFor={fieldId} className="text-micro font-mono uppercase tracking-micro text-white/60">
        {label}
      </label>
      <Component
        id={fieldId}
        className="input-field mt-2"
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
          className={`mt-2 text-small ${error ? 'form-error' : 'form-helper'}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.22, 0.72, 0, 1] }}
        >
          {error ?? 'Polje je obavezno za brzu procenu projekta.'}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}
