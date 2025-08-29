import TodoItem, { Todo } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          No tasks yet
        </h3>
        <p className="text-muted-foreground">
          Add your first task above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;