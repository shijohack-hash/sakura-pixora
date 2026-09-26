export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="#0C2233" />
      <path
        d="M11 8.5H18C20.4853 8.5 22.5 10.5147 22.5 13C22.5 15.4853 20.4853 17.5 18 17.5H14.2V23.5H11V8.5Z"
        fill="#FAFAF8"
      />
      <path
        d="M14.2 11.2H17.7C18.6941 11.2 19.5 12.0059 19.5 13C19.5 13.9941 18.6941 14.8 17.7 14.8H14.2V11.2Z"
        fill="#0E7A73"
      />
    </svg>
  );
}

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="font-display font-semibold text-[1.15rem] tracking-tight text-ink">
        Pixora
      </span>
    </div>
  );
}
