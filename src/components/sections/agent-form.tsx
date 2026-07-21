"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { travelAgentSchema, type TravelAgentInput } from "@/lib/validations";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AgentForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TravelAgentInput>({
    resolver: zodResolver(travelAgentSchema),
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(data: TravelAgentInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/travel-agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="agencyName">Agency Name</Label>
        <Input id="agencyName" {...register("agencyName")} />
        <FieldError>{errors.agencyName?.message}</FieldError>
      </div>
      <div>
        <Label htmlFor="contactName">Contact Name</Label>
        <Input id="contactName" {...register("contactName")} />
        <FieldError>{errors.contactName?.message}</FieldError>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" {...register("country")} />
          <FieldError>{errors.country?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="yearsTrading">Years Trading</Label>
          <Input id="yearsTrading" type="number" min={0} {...register("yearsTrading")} />
        </div>
      </div>
      <div>
        <Label htmlFor="website">Website (optional)</Label>
        <Input id="website" placeholder="https://" {...register("website")} />
      </div>
      <div>
        <Label htmlFor="message">Tell us about your agency</Label>
        <Textarea id="message" rows={3} {...register("message")} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
      {status === "success" && <p className="text-sm font-medium text-green-600">Application received — we'll be in touch soon.</p>}
      {status === "error" && <p className="text-sm font-medium text-maroon-500">Something went wrong. Please try again.</p>}
    </form>
  );
}
