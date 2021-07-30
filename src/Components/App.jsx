import Heading from "./Heading/Heading";
import Todo from "./Todo/Todo";


const App = () =>{
  return (
    <main>
      <h1 className='visually-hidden'>Frontendmentor todo application</h1>
      <Heading />
      <Todo />
    </main>
  );
}


export default App;