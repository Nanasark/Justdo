import axios from 'axios';
import { useEffect} from 'react';
import { checkbox } from '../modules/style';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

const TodoView = () => {
 
  const { todos, setTodos } = useContext(TodoContext);

  useEffect(() => {
    // Fetch todos or update the effect as needed
    axios.get('http://localhost:3001/')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, [setTodos]);

  const handleDone = (id) => {
    // Toggle the 'done' status for the clicked todo
    // Update the state with the modified todos
    setTodos(prevTodos => {
      return prevTodos.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
      );
    });

    // Make an API call to update the 'done' status on the server
    axios.patch(`http://localhost:3001/updateTodo/${id}`, {
  done: !todos.find((todo) => todo._id === id).done,
  })
      .then((result) => {
        console.log("Server Response:", result);
      })
      .catch((error) => console.error(error)); 
  };

  const handleDelete = (id) =>{
    axios.delete(`http://localhost:3001/deleteTodo/${id}`)
    .then((result) => {
      console.log("Server Response:", result);

      // If the deletion was successful, update the local state to remove the todo
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    })
    .catch((error) => console.error(error));
  }


  return (
    <div className="space-x-0 space-y-1 flex flex-col items-center justify-center">
      {todos.map((todo) => (
        <div key={todo.id} className="bg-white w-[450px] rounded-lg border-x-yellow-600 border-y-green-900 border-[2px] gap-2 flex space-x-2 justify-center items-center">
          <div
            key={todo.done}
            className={`${checkbox} ${todo.done ? "bg-green-600" : "bg-red-600"}`}
            onClick={() => handleDone(todo._id)}
          ></div>
          <p key={todo.title}>{todo.title}</p>
          <p key={todo.desc}>{todo.desc}</p>
          <p key={todo.ddate}>{todo.ddate}</p>
          
        <div key={todo.del} onClick={()=> handleDelete(todo._id)}>
          <DeleteForeverIcon className='hover:text-orange-600 '/>
        </div>
          
        </div>
        
      ))}


    </div>
  );
};

export default TodoView