import { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";
import Form from "../Form/Form";
import { getData, updateLocalData } from "../Utilities";


const Todo = () =>{
  const [option, setOption] = useState("All");
  const [allTodoData, setAllTodoData] = useState([]);
  const [clearCompleted, setClearCompleted] = useState(false);
  const [todoItemDeleted, setTodoItemDeleted] = useState("");
  const currentDragItem = useRef();
  const todoItemLiveRegion = useRef();
  const todoViewingOption = useRef();

  const handleChangeOption = event => setOption(event.target.textContent);

  const handleRemoveAllCompletedTodo = () => setClearCompleted(true);

  const getAllTodoItemsData = () =>{
    const todoDatas = getData("todo");
    if (todoDatas) {
      switch (option) {
        case "Active":
          setAllTodoData(todoDatas.filter(todo => !todo.completed));
          break;
        case "Completed":
          setAllTodoData(todoDatas.filter(todo => todo.completed));
          break;
        case "All":
          setAllTodoData(todoDatas);
          break;
        default:
      }
    }
  }

  // Handle when selection of filter changes
  useEffect(()=>{
    getAllTodoItemsData();
    todoViewingOption.current.textContent = `showing ${option} todo items`;
    const timeOut = setTimeout(() => todoViewingOption.current.textContent = "", 200);
    return () => clearTimeout(timeOut);
  }, [option]);

  // Handle when user want to clear all completed
  useEffect(() =>{
    if (clearCompleted) {
      updateLocalData(todoData => todoData.filter(todo => !todo.completed));
      getAllTodoItemsData();
      setClearCompleted(false);
    }
  },[clearCompleted])

  useEffect(() =>{
    if (todoItemDeleted) {
      todoItemLiveRegion.current.textContent = `${todoItemDeleted} successfuly removed. ${allTodoData.length-1} items remaining`;
      const timeout = setTimeout(() => todoItemLiveRegion.current.textContent = "", 200);
      return () => clearTimeout(timeout);
    }
  }, [todoItemDeleted]);
  
  const handleRemoveTodoItemLiveRegion = todoContent => setTodoItemDeleted(todoContent);
  

  const renderTodoItems = () => allTodoData.map(todo => (
    <TodoItem
      data={todo}
      key={todo.id}
      renderTodoList={getAllTodoItemsData}
      currentDrag={currentDragItem}
      from={option}
      delete={handleRemoveTodoItemLiveRegion}
    />)
  );

  return (
    <>
      <Form renderTodoList={getAllTodoItemsData} viewRef={setOption}/>
      <div className="todo">
        <div ref={todoItemLiveRegion} className="visually-hidden" aria-live='polite'></div>
        <div className="todo__container">
          <ul className="todo__items">
            {renderTodoItems()}
          </ul>
          <div className="todo__remaining">
            <span>{allTodoData.length} items left</span>
            <button onClick={handleRemoveAllCompletedTodo} aria-label='clear all completed todo item'>Clear Completed</button>
          </div>
        </div>
        <div ref={todoViewingOption} aria-live='polite' className="visually-hidden"></div>
        <ul className="todo__options">
          <li className='todo__option'>
            <span>{allTodoData.length} items left</span>
          </li>
          <li className={option === "All"? 'todo__option selected': 'todo__option'}>
            <button onClick={handleChangeOption} aria-label='Show all todo items'>All</button>
          </li>
          <li className={option === "Active"? 'todo__option selected': 'todo__option'}>
            <button onClick={handleChangeOption} aria-label='Show all active todo items'>Active</button>
          </li>
          <li className={option === "Completed"? 'todo__option selected': 'todo__option'}>
            <button onClick={handleChangeOption} aria-label='Show all completed todo items'>Completed</button>
          </li>
          <li className='todo__option'>
            <button onClick={handleRemoveAllCompletedTodo} aria-label='clear all completed todo item'>Clear Completed</button>
          </li>
        </ul>
        <div className="todo__bottom-text">Drag and drop to reorder list</div>
      </div>
    </>
  );
}


export default Todo;