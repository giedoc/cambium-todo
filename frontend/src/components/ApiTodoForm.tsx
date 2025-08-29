import { useState } from "react";
import { createTask } from "../api";
export default function ApiTodoForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true); setErr(null);
    try {
      await createTask(title.trim());
      setTitle("");
      onCreated();
    } catch (e: any) {
      setErr(e.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        className="flex-1 px-3 py-2 rounded-md border border-border bg-card"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <button className="px-4 py-2 rounded-md bg-black text-white" disabled={loading} type="submit">
        {loading ? "Adding..." : "Add"}
      </button>
      {err && <span className="text-red-600 text-sm">{err}</span>}
    </form>
  );
}