"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import type { PricingPlans as PricingPlansBlock } from "#/sanity/types";

import { Container, Typography } from "#/design/shared";
import { Button } from "#/design/ui";
import { GradientCircle } from "#/design/icons/GradientCircle";
import { CurrencyDropdown } from "./PricingPlans/components";
import {
  calculateDiscountPercentage,
  type CurrencyCode,
  formatPrice,
} from "./PricingPlans/utils";
import { PlanIcon } from "#/design/icons/pricing/PlanIcon";
import { CheckmarkIcon } from "@sanity/icons";
import { Cross } from "next/dist/client/components/react-dev-overlay/ui/components/errors/dev-tools-indicator/next-logo";

export type PricingPlansProps = {
  block: PricingPlansBlock;
};

export function PricingPlans({ block }: PricingPlansProps): ReactNode {
  const {
    title,
    durations,
    supportedCurrencies,
    defaultCurrency,
    planTypes,
    groupPlans,
  } = block;

  // Find default duration or use first one
  const defaultDuration = durations?.find((d) => d.isDefault) || durations?.[0];
  const [selectedDuration, setSelectedDuration] = useState(
    defaultDuration?.months || 1,
  );

  // Currency state
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(
    (defaultCurrency as CurrencyCode) || "EUR",
  );

  const hasGroupPricing = groupPlans && groupPlans.length > 0;

  // Get price for selected currency from pricing object
  const getPriceForCurrency = (
    // TODO: remove 'any' type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pricing: any,
    currency: CurrencyCode,
  ): number | undefined => {
    return pricing?.[currency]?.price;
  };

  // Get group price for selected currency
  const getGroupPriceForCurrency = (
    // TODO: remove 'any' type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pricing: any,
    currency: CurrencyCode,
    type: "basePrice" | "discountedPrice",
  ): number | undefined => {
    return pricing?.[currency]?.[type];
  };

  return (
    <Container>
      <section className="flex flex-col items-start gap-6 md:gap-10">
        <Typography
          variant="menu"
          className="uppercase text-green-acid !font-bold !leading-tight"
        >
          {title}
        </Typography>

        <div className="w-full flex flex-col gap-8">
          {/* Duration selector and currency dropdown */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {durations?.map((duration) => (
                <button
                  key={duration._key}
                  onClick={() => setSelectedDuration(duration.months || 1)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${
                    selectedDuration === duration.months
                      ? "bg-green-acid text-black"
                      : "bg-dark-gray text-light-gray hover:bg-light-gray/20"
                  }`}
                >
                  <Typography variant="body" className="!font-bold">
                    {duration.title}
                  </Typography>
                </button>
              ))}
            </div>
            <CurrencyDropdown
              supportedCurrencies={supportedCurrencies as CurrencyCode[]}
              selectedCurrency={selectedCurrency}
              onChange={setSelectedCurrency}
            />
          </div>

          {/* Individual Pricing Plans */}
          {!hasGroupPricing && planTypes && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planTypes.map((plan) => {
                const isPopular = plan.isPopular;
                const pricePerMonth = getPriceForCurrency(
                  plan.pricing,
                  selectedCurrency,
                );

                return (
                  <div
                    key={plan._key}
                    className={`flex flex-col gap-6 p-8 rounded-3xl border-2 ${
                      isPopular
                        ? "bg-green-acid border-green-acid text-black"
                        : "bg-dark-gray border-dark-gray"
                    }`}
                  >
                    {/* Plan header */}
                    <div className="flex items-center gap-4">
                      {isPopular ? (
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                          >
                            <path
                              d="M24 4L28 20H44L32 28L36 44L24 36L12 44L16 28L4 20H20L24 4Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      ) : (
                        <PlanIcon className="text-light-gray" />
                      )}
                      <div className="flex flex-col">
                        <Typography
                          variant="title3"
                          className={`!font-bold !text-lg uppercase ${isPopular ? "!text-black" : ""}`}
                        >
                          {plan.title}
                        </Typography>
                        <Typography
                          variant="small"
                          className={`${isPopular ? "!text-black/70" : "!text-light-gray"}`}
                        >
                          {selectedDuration} МІС
                        </Typography>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-current/20 pt-6">
                      <Typography
                        variant="title1"
                        className={`!font-bold !text-4xl slashed-zero ${isPopular ? "!text-black" : "!text-green-acid"}`}
                      >
                        {formatPrice(pricePerMonth, selectedCurrency)}/міс
                      </Typography>
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-3 flex-1">
                      <Typography
                        variant="body"
                        className={`!font-bold uppercase ${isPopular ? "!text-black" : ""}`}
                      >
                        У ТАРИФ ВХОДИТЬ:
                      </Typography>
                      {plan.features?.map((feature) => (
                        <div
                          key={feature._key}
                          className="flex items-center gap-2"
                        >
                          <span
                            className={`flex-shrink-0 ${feature.included ? "text-current" : "text-light-gray/30"}`}
                          >
                            {feature.included ? (
                              <CheckmarkIcon className="h-6 w-6" />
                            ) : (
                              <Cross className="h-6 w-6" />
                            )}
                          </span>
                          <Typography
                            variant="body"
                            className={`!text-sm ${
                              isPopular
                                ? feature.included
                                  ? "!text-black"
                                  : "!text-black/40"
                                : feature.included
                                  ? ""
                                  : "!text-light-gray/40"
                            }`}
                          >
                            {feature.text}
                          </Typography>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={isPopular ? "special-dark" : "secondary"}
                      fullWidth
                    >
                      КУПИТИ
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Group Pricing Plans */}
          {hasGroupPricing && planTypes && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planTypes.map((plan) => {
                const isPopular = plan.isPopular;

                return (
                  <div
                    key={plan._key}
                    className={`flex flex-col gap-6 p-8 rounded-3xl border-2 ${
                      isPopular
                        ? "bg-green-acid border-green-acid text-black"
                        : "bg-dark-gray border-dark-gray"
                    }`}
                  >
                    {/* Plan header */}
                    <div className="flex items-center gap-4">
                      {isPopular ? (
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                          >
                            <path
                              d="M24 4L28 20H44L32 28L36 44L24 36L12 44L16 28L4 20H20L24 4Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      ) : (
                        <GradientCircle className="w-12 h-12" />
                      )}
                      <Typography
                        variant="title3"
                        className={`!font-bold !text-lg uppercase ${isPopular ? "!text-black" : ""}`}
                      >
                        {plan.title}
                      </Typography>
                    </div>

                    {/* Group pricing options */}
                    <div className="flex flex-col gap-3">
                      {groupPlans.map((groupPlan) => {
                        const basePrice = getGroupPriceForCurrency(
                          groupPlan.pricing,
                          selectedCurrency,
                          "basePrice",
                        );
                        const discountedPrice = getGroupPriceForCurrency(
                          groupPlan.pricing,
                          selectedCurrency,
                          "discountedPrice",
                        );

                        const hasDiscount = !!discountedPrice;
                        const discountPercent =
                          hasDiscount && basePrice
                            ? calculateDiscountPercentage(
                                basePrice,
                                discountedPrice,
                              )
                            : null;

                        return (
                          <div
                            key={groupPlan._key}
                            className="flex items-center justify-between"
                          >
                            <Typography
                              variant="body"
                              className={`!text-sm ${isPopular ? "!text-black" : ""}`}
                            >
                              {groupPlan.people} особи:
                            </Typography>
                            <div className="flex items-center gap-2">
                              {hasDiscount && (
                                <Typography
                                  variant="small"
                                  className="line-through !text-light-gray"
                                >
                                  {formatPrice(basePrice, selectedCurrency)}
                                </Typography>
                              )}
                              <Typography
                                variant="body"
                                className={`!font-bold ${isPopular ? "!text-black" : "!text-green-acid"}`}
                              >
                                {formatPrice(
                                  hasDiscount ? discountedPrice : basePrice,
                                  selectedCurrency,
                                )}
                                /міс
                              </Typography>
                              {discountPercent && (
                                <span
                                  className={`px-2 py-1 rounded-md text-xs font-bold ${
                                    isPopular
                                      ? "bg-black/20 text-black"
                                      : "bg-green-acid/20 text-green-acid"
                                  }`}
                                >
                                  -{discountPercent}%
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-current/20 pt-4" />

                    {/* Features */}
                    <div className="flex flex-col gap-3 flex-1">
                      <Typography
                        variant="body"
                        className={`!font-bold uppercase ${isPopular ? "!text-black" : ""}`}
                      >
                        У ТАРИФ ВХОДИТЬ:
                      </Typography>
                      {plan.features?.map((feature) => (
                        <div
                          key={feature._key}
                          className="flex items-start gap-3"
                        >
                          <span
                            className={`flex-shrink-0 ${feature.included ? "text-current" : "text-light-gray/30"}`}
                          >
                            {feature.included ? "✓" : "✗"}
                          </span>
                          <Typography
                            variant="body"
                            className={`!text-sm ${
                              isPopular
                                ? feature.included
                                  ? "!text-black"
                                  : "!text-black/40"
                                : feature.included
                                  ? ""
                                  : "!text-light-gray/40"
                            }`}
                          >
                            {feature.text}
                          </Typography>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={isPopular ? "special-dark" : "secondary"}
                      fullWidth
                    >
                      КУПИТИ
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
