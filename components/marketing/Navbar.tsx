import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getCurrentUser, initials } from "@/lib/auth";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#workflow" className="text-[0.925rem] text-ink/80 hover:text-ink">
            How it works
          </a>
          <a href="#features" className="text-[0.925rem] text-ink/80 hover:text-ink">
            Features
          </a>
          <a href="#showcase" className="text-[0.925rem] text-ink/80 hover:text-ink">
            Showcase
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <span className="hidden text-[0.9rem] text-ink/80 sm:block">{user.name}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[0.75rem] font-semibold text-white">
                {initials(user.name)}
              </div>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden text-[0.925rem] text-ink/80 hover:text-ink sm:block">
                Sign in
              </Link>
              <Link href="/signup" className="btn-teal">
                Get started free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
