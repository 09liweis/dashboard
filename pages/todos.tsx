import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import Icon from '../components/Icon';
import { TODO_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';

interface Todo {
  [key: string]: string;
}

const TodosPage: NextPage = () => {
  const emptyTodos: Array<Todo> = [];
  const [todos, setTodos] = useState(emptyTodos);

  const emptyTodo: Todo = { _id: '', name: '' };
  const [todo, setTodo] = useState(emptyTodo);

  const { user } = useContext(AppContext);

  const fetchTodos = async () => {
    const response = await fetchAPI({
      method: 'GET',
      url: TODO_LIST_API,
      body: {},
    });
    if (Array.isArray(response)) {
      setTodos(response);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const todosHTML = todos.map((todo) => (
    <article
      key={todo._id}
      className="relative shadow-lg bg-white/[30%] rounded-lg p-2 mb-2 flex justify-between items-center"
    >
      <div>
        <Icon name='circle-check' classNames='cursor-pointer mr-3' handleClick={() => handleTodoFinish(todo._id)} />
        <span className={`text-teal-600 ${todo.status === 'done' ? 'line-through' : ''}`}>{todo.name}</span>
      </div>
      <span className="text-blue-500">{todo.date}</span>
      {user._id && (
        <section>
          <Icon name='trash' handleClick={() => handleTodoDelete(todo._id)} classNames='cursor-pointer ml-3' />
        </section>
      )}
    </article>
  ));

  const handleTodoDelete = async (id: string) => {
    const todoResponse = await fetchAPI({
      url: `${TODO_LIST_API}/${id}`,
      method: 'DELETE',
      body: {},
    });
    fetchTodos();
  };

  const handleTodoFinish = async (id: string) => {
    const todoResponse = await fetchAPI({
      url: `${TODO_LIST_API}/${id}`,
      method: 'PUT',
      body: { status: 'done' },
    });
    fetchTodos();
  }

  const handleTodoChange = (field: string, value: string) => {
    const newTodo = { ...todo };
    newTodo[field] = value;
    setTodo(newTodo);
  };

  const handleTodoSubmit = async (e: any) => {
    e.preventDefault();
    const todoResponse = await fetchAPI({ url: TODO_LIST_API, body: todo });
    if (todoResponse) {
      fetchTodos();
      setTodo(emptyTodo);
    }
  };

  return (
    <section>
      <h1 className='text-3xl mb-2 text-pink-600 font-bold'>My Todos </h1>
      {todosHTML}
      {user._id && (
        <>

          <form onSubmit={handleTodoSubmit}>
            <input
              value={todo.name}
              onChange={(e) => handleTodoChange('name', e.target.value)}
            />
            <input
              type="date"
              value={todo.date}
              onChange={(e) => handleTodoChange('date', e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          <div className="fixed right-3 bottom-3 p-2 rounded-full font-bold text-lg shadow-lg bg-white leading-3 cursor-pointer">
            +
          </div>
        </>
      )}
    </section>
  );
};

export default TodosPage;
