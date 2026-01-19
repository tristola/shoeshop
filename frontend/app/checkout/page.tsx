import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground">Checkout</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}
