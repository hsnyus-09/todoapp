import { useState, useEffect } from 'react';

type Todo = {
  id: number;
  text: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => todo.id === editId ? { ...todo, text: editText } : todo));
    setEditId(null);
    setEditText('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Todo List</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="할 일 입력" />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: 10 }}>
            {editId === todo.id ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={saveEdit}>저장</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => startEdit(todo.id, todo.text)}>수정</button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
