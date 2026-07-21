"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { enquirySchema, type EnquiryInput } from "@/lib/validations";
import { Input, Select, Textarea, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function QuoteForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({ resolver: zodResolver(enquirySchema) });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(data: EnquiryInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} placeholder="Your full name" />
          <FieldError>{errors.fullName?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" {...register("country")} placeholder="United Kingdom" />
          <FieldError>{errors.country?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="agencyName">Agency Name (if applicable)</Label>
          <Input id="agencyName" {...register("agencyName")} placeholder="Optional" />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input id="whatsapp" {...register("whatsapp")} placeholder="+44 7000 000000" />
          <FieldError>{errors.whatsapp?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Select id="destination" {...register("destination")}>
            <option value="">Select destination</option>
            <option value="MAKKAH">Makkah</option>
            <option value="MADINAH">Madinah</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="checkIn">Check In</Label>
          <Input id="checkIn" type="date" {...register("checkIn")} />
        </div>
        <div>
          <Label htmlFor="checkOut">Check Out</Label>
          <Input id="checkOut" type="date" {...register("checkOut")} />
        </div>
        <div>
          <Label htmlFor="hotelCategory">Hotel Category</Label>
          <Select id="hotelCategory" {...register("hotelCategory")}>
            <option value="">Select category</option>
            <option value="THREE">3-Star</option>
            <option value="FOUR">4-Star</option>
            <option value="FIVE">5-Star</option>
            <option value="LUXURY_SUITE">Luxury Suite</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="budget">Budget (per room/night)</Label>
          <Input id="budget" {...register("budget")} placeholder="e.g. £80–£120" />
        </div>
        <div>
          <Label htmlFor="adults">Adults</Label>
          <Input id="adults" type="number" min={1} defaultValue={1} {...register("adults")} />
        </div>
        <div>
          <Label htmlFor="children">Children</Label>
          <Input id="children" type="number" min={0} defaultValue={0} {...register("children")} />
        </div>
        <div>
          <Label htmlFor="rooms">Rooms</Label>
          <Input id="rooms" type="number" min={1} defaultValue={1} {...register("rooms")} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" rows={4} {...register("message")} placeholder="Tell us anything else about your trip..." />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending..." : "Request Quotation"}
      </Button>

      {status === "success" && (
        <p className="text-sm font-medium text-green-600">
          Thank you — your request has been received. Our team will send your quotation shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-maroon-500">
          Something went wrong sending your request. Please try again or contact us on WhatsApp.
        </p>
      )}
    </form>
  );
}
