"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/hotels", label: "Hotels" },
  { href: "/transport", label: "Transport" },
  { href: "/umrah-packages", label: "Umrah Packages" },
  { href: "/services", label: "Services" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-cream/90 backdrop-blur dark:border-white/10 dark:bg-ink-900/90">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/aa-group-travels-logo.jpeg"
            alt="AA Group Travels"
            width={160}
            height={90}
            priority
            className="h-14 w-auto rounded-sm object-contain"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium text-ink-700 transition-colors hover:text-maroon-500 dark:text-white/80 dark:hover:text-maroon-300",
                pathname === l.href && "text-maroon-500 dark:text-maroon-300"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="rounded-full p-2 text-ink-700 hover:bg-ink-900/5 dark:text-white dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/login">Login</Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <a href="https://wa.me/447000000000" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </Button>
        </div>

        <button
          aria-label="Open menu"
          className="p-2 lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-900/10 bg-cream px-4 py-4 lg:hidden dark:border-white/10 dark:bg-ink-900">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700 dark:text-white/90">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link href="/admin/login">Login</Link>
              </Button>
              <Button variant="primary" size="sm" asChild className="flex-1">
                <a href="https://wa.me/447000000000" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
