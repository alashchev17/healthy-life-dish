import { FC, SVGProps } from "react";

export const GradientCircle: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="552"
      height="552"
      viewBox="0 0 552 552"
      fill="none"
      {...props}
    >
      <path
        d="M276 552C428.154 552 551 428.431 551 276C551 123.569 428.154 0 276 0C123.846 0 0 123.569 0 276C0 428.431 123.846 552 276 552Z"
        fill="url(#paint0_radial_344_2438)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_344_2438"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(275.5 276) scale(312.049 312.615)"
        >
          <stop stopColor="currentColor" />
          <stop offset="0.07" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="0.19" stopColor="currentColor" stopOpacity="0.63" />
          <stop offset="0.31" stopColor="currentColor" stopOpacity="0.43" />
          <stop offset="0.43" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="0.55" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="0.66" stopColor="currentColor" stopOpacity="0.07" />
          <stop offset="0.78" stopColor="currentColor" stopOpacity="0.02" />
          <stop offset="0.89" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
