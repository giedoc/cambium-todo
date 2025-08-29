import { type Task, listTasks, toggleTask, deleteTask } from "../api";
import { useEffect, useState } from "react";
export default function ApiTodoList({ nonce }: { nonce: number }) {
  const [items, setItems] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const refresh = async () => {
    setLoading(true); setErr(null);
    try {
      const data = await listTasks();
      setItems(data);
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, [nonce]);
  const onToggle = async (t: Task) => {
    try {
      const updated = await toggleTask(t.id, !t.completed);
      setItems(items.map(i => i.id === updated.id ? updated : i));
    } catch (e: any) { setErr(e.message); }
  };
  const onDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setItems(items.filter(i => i.id !== id));
    } catch (e: any) { setErr(e.message); }
  };
  if (loading) return <p className="text-muted-foreground">Loading tasks...</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;
  if (items.length === 0) return <p className="text-muted-foreground">No tasks yet.</p>;
  return (
    <ul className="grid gap-2">
      {items.map(t => (
        <li key={t.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={t.completed} onChange={() => onToggle(t)} />
            <span className={t.completed ? "line-through text-muted-foreground" : ""}>{t.title}</span>
          </label>
          <button onClick={() => onDelete(t.id)} className="text-sm text-red-700">Delete</button>
        </li>
      ))}
    </ul>
  );
}