// .env'deki VITE_API_URL varsa onu kullan; yoksa dev proxy (/api)
export const API_URL = import.meta.env.VITE_API_URL || "/api";

export type Task = { id: number; title: string; completed: boolean };

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function listTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  return handle<Task[]>(res);
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return handle<Task>(res);
}

export async function toggleTask(id: number, completed: boolean): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return handle<Task>(res);
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
}
