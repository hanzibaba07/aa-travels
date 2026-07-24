"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-ink-900 py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Umrah tips &amp; hotel offers, straight to your inbox
        </h2>
        <p className="mt-2 text-sm text-white/60">No spam — occasional updates on hotel offers and travel advisories.</p>
        {sent ? (
          <p className="mt-6 text-gold-400">Thank you — you're subscribed.</p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />
            <Button type="submit" variant="gold">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  );
}
