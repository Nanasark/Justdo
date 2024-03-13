import  { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
 const [todos, setTodos] = useState([]);

 return (
 <TodoContext.Provider value={{ todos, setTodos }}>
 {children}
 </TodoContext.Provider>
 );
};

TodoProvider.propTypes = {
 children: PropTypes.node,
};
