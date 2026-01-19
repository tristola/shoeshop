"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CHECKOUT_MUTATION } from "@/lib/queries";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { v4 as uuidv4 } from "uuid";

export function CheckoutForm() {
  const { cartTotal, refetch } = useCart();
  const { t } = useLanguage();
  const [checkout, { loading, error }] = useMutation(CHECKOUT_MUTATION);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    postcode: "",
    email: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isMockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

    if (isMockMode) {
        setSuccess(true);
        refetch();
        return;
    }

    try {
      const billing = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address1,
        city: formData.city,
        postcode: formData.postcode,
        email: formData.email,
        phone: formData.phone,
        country: "FI" // Defaulting to Finland for now
      };

      await checkout({
        variables: {
          billing,
          shipping: billing,
          paymentMethod: "cod",
          shipToDifferentAddress: false,
          clientMutationId: uuidv4(),
        }
      });

      setSuccess(true);
      refetch(); // Clear cart in UI
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-3xl bg-white/5 p-12 text-center backdrop-blur-xl">
        <div className="rounded-full bg-green-500/20 p-4 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-12 w-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-foreground">{t('checkout.success')}</h2>
        <p className="text-muted-foreground">Thank you for your purchase.</p>
        <a href="/" className="rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="mb-6 text-2xl font-bold">{t('checkout.billing')}</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">{t('checkout.firstName')}</label>
            <input
              name="firstName"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">{t('checkout.lastName')}</label>
            <input
              name="lastName"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">{t('checkout.address')}</label>
          <input
            name="address1"
            required
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">{t('checkout.city')}</label>
            <input
              name="city"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">{t('checkout.postcode')}</label>
            <input
              name="postcode"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">{t('checkout.email')}</label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">{t('checkout.phone')}</label>
            <input
              name="phone"
              type="tel"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between text-xl font-bold">
          <span>{t('cart.total')}</span>
          <span>{cartTotal}</span>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/20 p-4 text-sm text-red-500">
            {t('checkout.error')}: {error.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground transition-all hover:scale-[1.02] hover:bg-accent hover:shadow-lg disabled:opacity-50"
        >
          {loading ? t('checkout.processing') : t('checkout.placeOrder')}
        </button>
      </div>
    </form>
  );
}
