"use client";

import type { ReactNode } from "react";

import type { CurrencyCode } from "../utils/currency";
import { CURRENCIES, getCurrencySymbol } from "../utils/currency";
import { Typography, Dropdown, type DropdownOption } from "#/design/shared";

export type CurrencyDropdownProps = {
  supportedCurrencies: CurrencyCode[];
  selectedCurrency: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
};

export function CurrencyDropdown({
  supportedCurrencies,
  selectedCurrency,
  onChange,
}: CurrencyDropdownProps): ReactNode {
  const selectedSymbol = getCurrencySymbol(selectedCurrency);

  // Convert currencies to dropdown options
  const options: DropdownOption<CurrencyCode>[] = supportedCurrencies.map(
    (currency) => ({
      value: currency,
      label: CURRENCIES[currency].label,
      isActive: currency === selectedCurrency,
    })
  );

  return (
    <Dropdown
      trigger={
        <Typography variant="body" className="!font-bold">
          ВАЛЮТА ({selectedSymbol})
        </Typography>
      }
      options={options}
      onSelect={onChange}
      align="right"
    />
  );
}
