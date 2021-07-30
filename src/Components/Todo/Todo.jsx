import { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";
import Form from "../Form/Form";
import { getData, setData } from "../Utilities";


const Todo = () =>{
  const [option, setOption] = useState("All");
  const [allTodoData, setAllTodoData] = useState([]);
  const [clearCompleted, setClearCompleted] = useState(false);
  const currentDragItem = useRef();
 
  const changeOption = event => setOption(event.target.textContent);

  const getAllTodoDatas = () =>{
    const todoDatas = getData("todo");
    if (todoDatas) {
      if (option === "Active") {
        setAllTodoData(todoDatas.filter(todo => !todo.completed));
      } else if (option === "Completed") {
        setAllTodoData(todoDatas.filter(todo => todo.completed));
      } else {
        setAllTodoData(todoDatas);
      }
    }
  }

  // Handle when selection of filter changes
  useEffect(()=>{
    getAllTodoDatas();
  }, [option]);

  // Handle when user want to clear all completed
  useEffect(() =>{
    if (clearCompleted) {
      setClearCompleted(false);
      const todoData = getData("todo");
      const filteredData = todoData.filter(todo => todo.completed !== true);
      setData("todo", filteredData);
      getAllTodoDatas();
    }
  },[clearCompleted])

  const renderTodoItems = () => allTodoData.map(todo => (
    <TodoItem
      key={todo.id}
      index={todo.id} 
      todo={todo.todo}
      renderTodoList={getAllTodoDatas}
      checked={todo.completed}
      currentDrag={currentDragItem}
      from={option}
    />)
  );

  const handleRemoveCompleted = () =>{
    setClearCompleted(true);
  }

  return (
    <>
      <Form renderTodoList={getAllTodoDatas} viewRef={setOption}/>
      <div className="todo">
        <ul className="todo__items">
          {renderTodoItems()}
        </ul>
        <div className="todo__remaining">
          <span>{allTodoData.length} items left</span>
          <button onClick={handleRemoveCompleted} aria-label='clear all completed todo item'>Clear Completed</button>
        </div>
        <ul className="todo__options">
          <li className={option === "All"? 'todo__option selected': 'todo__option'}>
            <button onClick={changeOption} aria-label='Show all todo items'>All</button>
          </li>
          <li className={option === "Active"? 'todo__option selected': 'todo__option'}>
            <button onClick={changeOption} aria-label='Show all active todo items'>Active</button>
          </li>
          <li className={option === "Completed"? 'todo__option selected': 'todo__option'}>
            <button onClick={changeOption} aria-label='Show all completed todo items'>Completed</button>
          </li>
        </ul>
      </div>
    </>
  );
}


export default Todo;