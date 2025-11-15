"use client";

import React, { useState, useRef, useEffect, type ReactNode } from "react";
import classNames from "classnames";

import { ChevronRight } from "#/design/icons";
import styles from "./Dropdown.module.css";

export interface DropdownOption<T = string> {
  value: T;
  label: string;
  isActive?: boolean;
}

export interface DropdownProps<T = string> {
  trigger: ReactNode;
  options: DropdownOption<T>[];
  onSelect: (value: T) => void;
  className?: string;
  dropdownClassName?: string;
  align?: "left" | "center" | "right";
}

export function Dropdown<T = string>({
  trigger,
  options,
  onSelect,
  className,
  dropdownClassName,
  align = "center",
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={classNames(styles.container, className)}>
      {/* Trigger Button */}
      <div
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {trigger}
        <ChevronRight
          className={classNames(styles.chevron, {
            [styles.chevronActive]: isOpen,
          })}
        />
      </div>

      {/* Dropdown Menu */}
      <div
        className={classNames(
          styles.dropdown,
          {
            [styles.dropdownOpen]: isOpen,
            [styles.alignLeft]: align === "left",
            [styles.alignCenter]: align === "center",
            [styles.alignRight]: align === "right",
          },
          dropdownClassName
        )}
      >
        {options.map((option) => (
          <div
            key={String(option.value)}
            className={classNames(styles.option, {
              [styles.optionActive]: option.isActive,
            })}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
