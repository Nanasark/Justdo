import { useRef, useState } from 'react'
import './App.css'
import TodoView from './components/TodoView';
import axios from 'axios'
import {formholder1,formholder2,hover1,forminput, inputdesign, addbtn,formspan} from './modules/style'
import { useContext } from 'react';
import { TodoContext } from './contexts/TodoContext';

function App() {

  const { setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ddate, setDate] = useState("");
 

  const titleRef=useRef()
  const  ddateRef=useRef()
  const descRef = useRef()

  

  const Submit = (e) => {
    e.preventDefault();
    setTitle(titleRef.current.value);
    setDesc(descRef.current.value);
    setDate(ddateRef.current.value);
    const taskData = {
      title: titleRef.current.value,
      desc: descRef.current.value,
      ddate: ddateRef.current.value,
    };
  
    axios
      .post("http://localhost:3001/createTask", taskData)
      .then((result) => {
        console.log(result);
  
        // Update the local state to include the newly added todo
        setTodos(prevTodos => [...prevTodos, result.data]);
  
        // Clear input fields
        titleRef.current.value = "";
        descRef.current.value = "";
        ddateRef.current.value = "";
      })
      .catch((error) => console.log(error));
  }

  var hover1 = "hover:md:w-[600px] hover:md:h-[400px] hover:border-[#008080] "
  return (
    
    <div className="bg-[#F4FAFF] space-x-5 justify-center items-center flex w-screen h-screen">
      <div className= {`${formholder1} ${hover1}`}>
        <h1> Create Your New Todo Here</h1>
        <div className={`flex items-center justify-center`}>
          <form onSubmit={Submit} className= {` ${forminput}`}>
            {/* <label htmlFor="Title">Title</label> */}
            <div className='flex gap-2 items-center'>
              <span className={`${formspan}`}>Title</span>
              <input className={`w-[350px] h-[40px] ${inputdesign}`}
                id="Title"
                type="text"
                ref={titleRef}
                required
              />
            </div>
           

            {/* <label htmlFor="">Body</label> */}
            <div className= "flex gap-2 items-center">
              <span className ={`${formspan}`}>Description</span>
              <textarea className={`h-[100px] w-[350px] ${inputdesign}`}
                id="desc"
                ref={descRef}
              />
            </div>

            

            {/* <label htmlFor="">Due Date</label> */}
            <div className="flex gap-2 items-center">
              <span className={`${formspan}`}>DueDate</span>
              <input className={`w-[350px] h-[40px] ${inputdesign}`}
                id="ddate"
        
                ref={ddateRef}
              />
            </div>
            

            <button 
            className={`${addbtn}`}
            type="submit"
                
            >Add</button>

          </form>
        </div>
      </div>


      <div className= {`${formholder2} scrollbar scrollbar-thumb-transparent overflow-y-auto overflow-hidden justify-center items-center ${hover1}`}>
        <TodoView title={title} ddate={ddate} desc={desc}/>
      </div>
    </div>
     
  )
}

export default App
