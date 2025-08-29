import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="group flex items-center gap-4 p-4 bg-card border border-border rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)] animate-slide-in">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="data-[state=checked]:bg-success data-[state=checked]:border-success"
      />
      <span 
        className={`flex-1 text-base transition-[var(--transition-smooth)] ${
          todo.completed 
            ? 'text-muted-foreground line-through' 
            : 'text-foreground'
        }`}
      >
        {todo.title}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10 transition-[var(--transition-smooth)]"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TodoItem;