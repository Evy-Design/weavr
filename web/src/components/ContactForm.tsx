'use client'

import {useActionState, useState, type FormEvent} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import {submitContactForm, type ContactFormState} from '@/app/contact/actions'
import {SmallArrowIcon} from '@/components/SmallArrowIcon'
import {CheckIcon} from '@/components/CheckIcon'

const initialState: ContactFormState = {status: 'idle'}

const fieldClass =
  'w-full border-b border-[#343434]/30 bg-transparent py-3 text-sm text-[#343434] outline-none placeholder:text-[#343434]/50 focus:border-accent disabled:opacity-50'

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const [isValid, setIsValid] = useState(false)
  const success = state.status === 'success'

  function handleChange(e: FormEvent<HTMLFormElement>) {
    setIsValid(e.currentTarget.checkValidity())
  }

  return (
    <form action={formAction} onChange={handleChange} className="space-y-5">
      <fieldset disabled={success} className="space-y-5 border-0 p-0">
        <div>
          <label className="text-sm text-[#343434]/60">Naam</label>
          <input name="name" required className={fieldClass} />
        </div>
        <div>
          <label className="text-sm text-[#343434]/60">Bedrijfsnaam</label>
          <input name="company" className={fieldClass} />
        </div>
        <div>
          <label className="text-sm text-[#343434]/60">Telefoonnummer</label>
          <input name="phone" className={fieldClass} />
        </div>
        <div>
          <label className="text-sm text-[#343434]/60">Email</label>
          <input name="email" type="email" required className={fieldClass} />
        </div>
        <div>
          <label className="text-sm text-[#343434]/60">Toelichting</label>
          <textarea name="message" required rows={3} className={fieldClass} />
        </div>
      </fieldset>
      {state.status === 'error' && <p className="text-sm text-red-600">{state.message}</p>}
      {success && state.message && <p className="text-sm text-[#343434]/70">{state.message}</p>}
      <button
        type="submit"
        disabled={(!isValid && !success) || isPending || success}
        className="inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#343434] px-6 py-3 text-sm text-[#f0ede1] transition-colors duration-300 hover:bg-accent disabled:opacity-60 disabled:hover:bg-[#343434]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {success ? (
            <motion.span
              key="success"
              initial={{opacity: 0, scale: 0.6}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
              className="flex items-center gap-2"
            >
              <CheckIcon className="h-3 w-3" />
              Verstuurd
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{opacity: 0, scale: 0.6}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.6}}
              transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
              className="flex items-center gap-2"
            >
              {isPending ? 'Versturen…' : 'Verstuur'}
              <SmallArrowIcon className="h-3 w-3" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </form>
  )
}
