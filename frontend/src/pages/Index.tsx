import { useState } from "react";
import ApiTodoForm from "@/components/ApiTodoForm";
import ApiTodoList from "@/components/ApiTodoList";
export default function Index() {
  const [nonce, setNonce] = useState(0);
  return (
    <div className="min-h-screen bg-[var(--gradient-background)]">
      <main className="container mx-auto max-w-2xl p-4">
        <div className="mt-8 bg-card rounded-xl border border-border shadow-[var(--shadow-large)] overflow-hidden p-4">
          <h1 className="text-2xl font-semibold mb-4">Cambium To-Do</h1>
          <ApiTodoForm onCreated={() => setNonce(n => n + 1)} />
          <div className="mt-4" />
          <ApiTodoList nonce={nonce} />
        </div>
      </main>
    </div>
  );
}