import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'AppContext';
import Icon from '@/components/Icon';
import { TODO_LIST_API } from '../constants';
import { fetchAPI } from 'helpers';
import Calendar from '@/components/todo/Calendar';

interface Todo {
  _id: string;
  name: string;
  status: string;
  date: string;
  is_done: boolean;
}

const TodosPage: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const emptyTodo = {
    _id: '',
    name: '',
    status: 'pending',
    date: '',
    is_done: false,
  }
  const [todo, setTodo] = useState<Todo>(emptyTodo);

  const { isUserLoggedIn } = useContext(AppContext);

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

  const todosHTML = todos.map((todo, todoIndex) => (
    <article
      key={todo._id}
      className="relative shadow-lg bg-white/[30%] rounded-lg p-2 mb-2 flex justify-between items-center"
    >
      <div>
        {isUserLoggedIn && <Icon name={todo.is_done ? 'circle-check' : 'circle'} classNames={`transition cursor-pointer mr-3 ${todo.is_done ? 'todo-is-done' : ''}`} handleClick={() => handleTodoFinish(todo, todoIndex)} />}
        <span className={`text-teal-600 ${todo.is_done ? 'line-through' : ''}`}>{todo.name}</span>
      </div>
      <span className="text-blue-500">{todo.date}</span>
      {isUserLoggedIn && (
        <Icon name='trash' handleClick={() => handleTodoDelete(todo._id, todoIndex)} classNames='hover:scale-110 cursor-pointer ml-3' />
      )}
    </article>
  ));

  const handleTodoDelete = async (id: string, todoIndex: number) => {
    const todoResponse = await fetchAPI({
      url: `${TODO_LIST_API}/${id}`,
      method: 'DELETE',
      body: {},
    });
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  const handleTodoFinish = async (todo: Todo, todoIndex: number) => {
    const todoResponse = await fetchAPI({
      url: `${TODO_LIST_API}/${todo._id}`,
      method: 'PUT',
      body: { status: 'done' },
    });
    todo.is_done = true;
    const newTodos = [...todos];
    newTodos[todoIndex] = todo;
    setTodos(newTodos);
  }

  const handleTodoSubmit = async (e: any) => {
    e.preventDefault();
    const todoResponse = await fetchAPI({ url: TODO_LIST_API, body: todo });
    if (todoResponse) {
      fetchTodos();
      setTodo(emptyTodo);
    }
  };

  return (
    <>
      <h1 className='text-3xl mb-2 text-pink-600 font-bold'>My Todos </h1>
      <Calendar />
      {todosHTML}
      {isUserLoggedIn && (
        <>

          <form onSubmit={handleTodoSubmit}>
            <input
              value={todo.name}
              onChange={(e) => setTodo({ ...todo, 'name': e.target.value })}
            />
            <input
              type="date"
              value={todo.date}
              onChange={(e) => setTodo({ ...todo, 'date': e.target.value })}
            />
            <button type="submit">Add</button>
          </form>
          <div className="fixed right-3 bottom-3 p-2 rounded-full font-bold text-lg shadow-lg bg-white leading-3 cursor-pointer">
            +
          </div>
        </>
      )}
    </>
  );
};

export default TodosPage;
