import { useState, useEffect, useRef } from "react";
import { getData, setData } from "../Utilities";


const TodoItem = props =>{
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [swappedElement, setSwappedElement] = useState("");
  const checkTodo = useRef();
  console.log(isCompleted);
  const handleTodoCheck = event => setIsCompleted(event.target.checked);

  const handleTodoRemove = () => setIsDeleted(true);

  useEffect(() =>{
    setIsCompleted(props.checked);
  }, []);

  // Handle any completions of any todo items
  useEffect(() =>{
    const todoData = getData("todo");
    const checkTodoDatas = form =>{
      todoData.forEach(todo => {
        if (todo.id === props.index) {
          todo.completed = form;
          checkTodo.current.checked = form;
        }
      })
    }

    if (isCompleted || (props.from === "Completed" && checkTodo.current.checked)) {
      checkTodoDatas(true);
    }  if(props.checked){
      checkTodoDatas(true);
    } if(!props.checked){
      checkTodoDatas(false);
    }

    setData("todo", todoData);
    props.renderTodoList();
    
  }, [isCompleted]);

  // Handle the deletions of any todo items
  useEffect(() =>{
    if (isDeleted) {
      const todoData = getData("todo");
      const filteredData = todoData.filter(item => item.id !== props.index);
      setData("todo", filteredData);
      props.renderTodoList();
    }
  }, [isDeleted])

  // Handle the swapping of todo items in localstorage
  useEffect(() =>{
    if (swappedElement) {
      swappedElement.classList.remove("enter");
      const todoData = Array.from(getData("todo"));
      const index1 = todoData.findIndex(item => item.id === parseInt(props.currentDrag.current.dataset.id));
      const index2 = todoData.findIndex(item => item.id === parseInt(swappedElement.dataset.id));
      [todoData[index1], todoData[index2]] = [todoData[index2], todoData[index1]];
      setData("todo", todoData);
      props.renderTodoList();
      setSwappedElement("");
    }
  }, [swappedElement])

  const dragStart = event =>{
    props.currentDrag.current = event.target;
    event.target.classList.add("drag");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.innerHTML);
  }
  
  const dragEnter = event =>{
    event.target.classList.add("enter");
  }

  const dragOver = event =>{
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    return false;
  }

  const dragLeave = event =>{
    event.target.classList.remove("enter");
  }

  const dragDrop = event =>{
    if (props.currentDrag.current !== event.target) {
      setSwappedElement(event.target);
      event.target.classList.remove("enter")
    }
  }

  const dragEnd = event =>{
    event.target.classList.remove("drag");
  }

  return (
    <li className='todo__item' 
      data-id={props.index}
      draggable
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={dragDrop}
      onDragEnd={dragEnd}
    >
      <input 
        className='todo__check' 
        type="checkbox" 
        id={`todo-${props.index}`}
        onChange={handleTodoCheck}
        ref={checkTodo}
      />
      <label className='todo__label' htmlFor={`todo-${props.index}`}>
      <span className="visually-hidden">check to complete todo item</span>
        <span>{props.todo}</span>
        
      </label>
      <button 
        className='todo__remove' 
        aria-label={`remove ${props.todo} todo item`}
        onClick={handleTodoRemove} />
    </li>
  );
}


export default TodoItem;