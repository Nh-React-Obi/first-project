import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex min-h-svh flex-1 flex-col items-center justify-center bg-white py-10 text-center font-[system-ui,'Segoe_UI',Roboto,sans-serif] text-[18px] leading-[145%] tracking-[0.18px] text-[#6b6375] antialiased max-[1024px]:text-[16px] dark:bg-[#16171d] dark:text-[#9ca3af]">
      <DowntimeIllustration />

      <h1 className="mt-6 mb-2 text-[56px] font-medium tracking-[-1.68px] text-[#08060d] max-[1024px]:text-[36px] dark:text-[#f3f4f6]">
        404
      </h1>
      <p className="m-0 max-w-md text-lg">
        We're experiencing a technical downtime. The page you're looking for
        isn't available right now.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-[#aa3bff] px-5 py-2.5 font-medium text-white transition hover:opacity-90 dark:bg-[#c084fc]"
      >
        Back to home
      </Link>
    </div>
  );
}

function DowntimeIllustration() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="w-64 max-w-full"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Disconnected monitor showing a warning sign"
    >
      {/* Monitor */}
      <rect
        x="40"
        y="20"
        width="160"
        height="104"
        rx="10"
        className="fill-[#f4f3ec] stroke-[#e5e4e7] dark:fill-[#1f2028] dark:stroke-[#2e303a]"
        strokeWidth="4"
      />
      <rect
        x="52"
        y="32"
        width="136"
        height="80"
        rx="4"
        className="fill-white dark:fill-[#16171d]"
      />
      <path
        d="M104 124 L98 146 H142 L136 124"
        className="fill-[#f4f3ec] stroke-[#e5e4e7] dark:fill-[#1f2028] dark:stroke-[#2e303a]"
        strokeWidth="4"
      />
      <line
        x1="84"
        y1="148"
        x2="156"
        y2="148"
        className="stroke-[#e5e4e7] dark:stroke-[#2e303a]"
        strokeWidth="4"
      />

      {/* Warning sign */}
      <path
        d="M120 46 L146 94 H94 Z"
        className="fill-amber-400/20 stroke-amber-500"
        strokeWidth="4"
      />
      <line
        x1="120"
        y1="62"
        x2="120"
        y2="78"
        className="stroke-amber-500"
        strokeWidth="4"
      />
      <circle cx="120" cy="86" r="2.5" className="fill-amber-500" />

      {/* Unplugged cable */}
      <path
        d="M200 100 C222 100 222 140 196 150 C184 155 178 160 178 168"
        className="stroke-[#6b6375] dark:stroke-[#9ca3af]"
        strokeWidth="3"
      />
      <rect
        x="170"
        y="164"
        width="16"
        height="10"
        rx="2"
        className="fill-[#6b6375] dark:fill-[#9ca3af]"
      />
      <path
        d="M164 160 l-6 -4 M162 168 h-8 M164 176 l-6 4"
        className="stroke-[#aa3bff] dark:stroke-[#c084fc]"
        strokeWidth="2.5"
      />
    </svg>
  );
}
