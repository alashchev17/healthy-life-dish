"use client";

import {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useState,
} from "react";
import styles from "./InputField.module.css";
import classNames from "classnames";
import { ErrorIcon } from "#/design/icons/ErrorIcon";

export type InputFieldVariant = "default" | "flat";

type InputFieldProps = TextInputFieldProps | TextareaFieldProps;

type InputFieldBaseProps = {
  variant?: InputFieldVariant;
  inputClassName?: string;
  error?: string;
};

export type TextInputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputFieldBaseProps & {
    textarea?: false;
  };

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputFieldBaseProps & {
    textarea: true;
  };

function omitCustomProps<T extends InputFieldProps>(
  props: T,
): Omit<T, "error" | "variant" | "inputClassName" | "className" | "textarea"> {
  const {
    error: _error,
    variant: _variant,
    inputClassName: _inputClassName,
    className: _className,
    textarea: _textarea,
    ...rest
  } = props;
  return rest as Omit<
    T,
    "error" | "variant" | "inputClassName" | "className" | "textarea"
  >;
}

function InputField(props: TextInputFieldProps): ReactNode;
function InputField(props: TextareaFieldProps): ReactNode;
function InputField(props: InputFieldProps): ReactNode {
  const [showTooltip, setShowTooltip] = useState(true);

  const {
    error,
    variant = "default",
    className,
    inputClassName,
    placeholder,
  } = props;

  const inputClass = classNames(
    styles.baseInputField,
    { [styles.errorInputField]: !!error },
    { [styles.flatInputField]: variant === "flat" },
    inputClassName,
  );

  const sharedProps = {
    className: inputClass,
    placeholder,
    onMouseEnter: () => setShowTooltip(true),
    onMouseLeave: () => setShowTooltip(false),
  };

  const errorIconPosition = props.textarea
    ? "top-[0.8rem]"
    : "top-1/2 -translate-y-1/2";
  const tooltipClass = props.textarea
    ? styles.tooltipTextarea
    : styles.tooltipInput;

  const renderError = error && (
    <div className={`absolute ${errorIconPosition} right-4`}>
      <ErrorIcon className="text-error cursor-help" />
      {showTooltip && (
        <div className={classNames(styles.errorTooltip, tooltipClass)}>
          {error}
        </div>
      )}
    </div>
  );

  if (props.textarea) {
    const htmlProps = omitCustomProps(props);
    return (
      <div className={classNames("relative", className)}>
        <textarea {...sharedProps} {...htmlProps}>
          {props.children}
        </textarea>
        {renderError}
      </div>
    );
  }

  const htmlProps = omitCustomProps(props);
  return (
    <div className={classNames("relative", className)}>
      <input {...sharedProps} {...htmlProps} />
      {renderError}
    </div>
  );
}

export { InputField };
