import { useState, useEffect, useRef } from "react";
import { setData, getData } from "../Utilities";


const Form = ({viewRef, renderTodoList}) =>{
  const formLiveRegion = useRef();
  const [newTodo, setNewTodo] = useState({
    completed: false,
    todo: "",
    id: ""
  });


  useEffect(() =>{
    if (newTodo.todo) {
      const todoData = getData("todo");
      if (todoData) {
        setData("todo", [...todoData, newTodo]);
      } else {
        setData("todo", [newTodo]);
      }
      viewRef("All");
      renderTodoList();
      formLiveRegion.current.textContent = "Successfuly added todo item";
      const timeOut = setTimeout(() => formLiveRegion.current.textContent = "", 200);
      return () => clearTimeout(timeOut);
    }
  }, [newTodo]);

  const handleTodoSubmit = event =>{
    event.preventDefault();
    if (event.target.todo.value) {
      setNewTodo({
        completed: false,
        todo: event.target.todo.value,
        id: Date.now()
      });
      event.target.todo.value = "";
    }
  }

  return (
    <form className="form" onSubmit={handleTodoSubmit}>
      <div className="form__holder">
        <input 
          type="text" 
          className="form__todo"
          name='todo'
          id='todo'
          placeholder='Create a new todo...'
          aria-label="Create a new todoitem..."
          autoComplete='off' />
      </div>
      <div ref={formLiveRegion} className="visually-hidden" aria-live='polite'></div>
    </form>
  );
} 


export default Form;