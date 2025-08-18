'use client'

import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, useState } from 'react'
import styles from './InputField.module.css'
import classNames from 'classnames'
import { ErrorIcon } from '#/design/icons/ErrorIcon'

export type InputFieldVariant = 'default' | 'flat'

type InputFieldProps = TextInputFieldProps | TextareaFieldProps

type InputFieldBaseProps = {
  variant?: InputFieldVariant
  error?: string
}

export type TextInputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputFieldBaseProps & {
    textarea?: false
  }

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputFieldBaseProps & {
    textarea: true
  }

// Function overloads for better type inference
function InputField(props: TextInputFieldProps): ReactNode
function InputField(props: TextareaFieldProps): ReactNode
function InputField(props: InputFieldProps): ReactNode {
  const [showTooltip, setShowTooltip] = useState(true)

  if (props.textarea) {
    // TypeScript now knows this is TextareaFieldProps
    const { children, placeholder, error, variant = 'default', className, ...restProps } = props

    const baseClassName = classNames(
      styles.baseInputField,
      { [styles.errorInputField]: !!error },
      { [styles.flatInputField]: variant === 'flat' },
      className
    )

    return (
      <div className="relative">
        <textarea
          className={baseClassName}
          placeholder={placeholder}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          {...restProps}
        >
          {children}
        </textarea>
        {error && (
          <div className={`absolute top-[0.8rem] right-4`}>
            <ErrorIcon className="text-error cursor-help" />
            {showTooltip && <div className={classNames(styles.errorTooltip, styles.tooltipTextarea)}>{error}</div>}
          </div>
        )}
      </div>
    )
  } else {
    // TypeScript now knows this is TextInputFieldProps
    const { placeholder, error, variant = 'default', className, ...restProps } = props

    const baseClassName = classNames(
      styles.baseInputField,
      { [styles.errorInputField]: !!error },
      { [styles.flatInputField]: variant === 'flat' },
      className
    )

    return (
      <div className="relative">
        <input
          className={baseClassName}
          placeholder={placeholder}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          {...restProps}
        />
        {error && (
          <div className={`absolute top-1/2 -translate-y-1/2 right-4`}>
            <ErrorIcon className="text-error cursor-help" />
            {showTooltip && <div className={classNames(styles.errorTooltip, styles.tooltipInput)}>{error}</div>}
          </div>
        )}
      </div>
    )
  }
}

export { InputField }
