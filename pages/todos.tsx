import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import { API_SERVER, TODO_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';

interface Todo {
  _id: string;
  name: string;
  status: string;
  date: string;
}

const TodosPage: NextPage = () => {
  const emptyTodos: Array<Todo> = [];
  const [todos, setTodos] = useState(emptyTodos);

  const { user } = useContext(AppContext);

  const fetchTodos = async () => {
    const response = await fetchAPI({
      method: 'GET',
      url: TODO_LIST_API,
      body: {},
    });
    setTodos(response);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const todosHTML = todos.map((todo) => (
    <article
      key={todo._id}
      className="shadow-lg bg-white/[30%] rounded-lg p-2 mb-2 flex justify-between"
    >
      <h2 className="text-teal-600">{todo.name}</h2>
      <span className="text-blue-600">{todo.date}</span>
    </article>
  ));

  return <section>{todosHTML}</section>;
};

export default TodosPage;
