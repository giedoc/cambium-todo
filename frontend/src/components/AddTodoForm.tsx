import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddTodoFormProps {
  onAddTodo: (title: string) => void;
}

const AddTodoForm = ({ onAddTodo }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-6">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 h-12 text-base border-border focus:ring-primary focus:border-primary transition-[var(--transition-smooth)]"
      />
      <Button 
        type="submit" 
        className="h-12 px-6 bg-[var(--gradient-primary)] hover:opacity-90 transition-[var(--transition-smooth)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]"
        disabled={!title.trim()}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add
      </Button>
    </form>
  );
};

export default AddTodoForm;