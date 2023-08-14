import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  todosList,
  toggleTodoCompleteStatus,
  removeTodo,
  getCurrentTodo,
} from '../../../../api/reducers/todoSlice';
import { toast, ToastContainer } from 'react-toastify';
import { CgRemove } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';

const ListTodo = () => {
  const dispatch = useDispatch();
  const [allTodos, setAllTodos] = useState([]);
  const { todos: todoList, error } = useSelector((state) => state.todo);

  const removeTodoHandler = async (todoId) => {
    let result = await dispatch(removeTodo(todoId));
    if (!result.error) {
      toast.success('Todo removed successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const toggleTodoCompleteStatusHandler = async (todoId, status) => {
    let data = {
      todoId: todoId,
      status: status,
    };
    let result = await dispatch(toggleTodoCompleteStatus(data));
    if (!result.error) {
      toast.success('Todo status update successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const editTodoHandler = (todoId) => {
    dispatch(getCurrentTodo(todoId));
  };

  useEffect(() => {
    return () => {
      dispatch(todosList());
    };
  }, []);

  useEffect(() => {
    if (todoList && todoList.length) {
      setAllTodos(todoList);
    }
  }, [todoList]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return (
    <>
      <section id="todo-list">
        <ToastContainer />
        {allTodos && allTodos.length ? (
          allTodos.map((value, index) => {
            return (
              <div
                key={`todo_list_` + index}
                className="bg-gray-900	w-full flex flex-col justify-between m-2 p-5 font-sans rounded-md text-yellow-50"
              >
                <p className="py-3">{value?.todoText}</p>
                <div className="float-right p-2 flex justify-between items-center space-x-2">
                  {value.completed == 'Y' ? (
                    <button
                      className=" bg-green-500 text-sm p-1 rounded-md"
                      onClick={() =>
                        toggleTodoCompleteStatusHandler(value.id, 'N')
                      }
                    >
                      Completed
                    </button>
                  ) : (
                    <button
                      className="bg-[#B32C6C] text-sm p-1 rounded-md"
                      onClick={() =>
                        toggleTodoCompleteStatusHandler(value.id, 'Y')
                      }
                    >
                      Incomplete
                    </button>
                  )}
                  <div className="inline-flex items-center space-x-2">
                    <CgRemove
                      className="text-[#F84C6F] w-5 h-5 mt-1 cursor-pointer"
                      onClick={() => removeTodoHandler(value.id)}
                      title="Remove Todo"
                    />
                    <FiEdit
                      className="text-[#77308E] w-5 h-5 mt-1 cursor-pointer"
                      onClick={() => editTodoHandler(value.id)}
                      title="Edit Todo"
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            key={`todo_list_no_remove`}
            className="bg-gray-900 w-full flex flex-col justify-between m-2 p-5 font-sans rounded-md text-yellow-50 text-center"
          >
            No todo added yet
          </div>
        )}
      </section>
    </>
  );
};

export default ListTodo;
