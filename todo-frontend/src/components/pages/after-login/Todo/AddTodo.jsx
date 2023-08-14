import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  clearCurrentTodo,
  updateTodo,
} from '../../../../api/reducers/todoSlice';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { BsPencil } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

const AddTodo = () => {
  const dispatch = useDispatch();
  const currentTodo = useSelector((state) => state.todo.currentTodo);
  const [editTodo, setEditTodo] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: formErrors },
  } = useForm();

  const onAddTodo = async (data) => {
    let result = undefined;
    if (editTodo) {
      result = await dispatch(updateTodo({ editTodo, data }));
    } else {
      result = await dispatch(addTodo(data));
    }

    if (!result.error) {
      reset();
      toast.success(
        editTodo ? 'Todo updated successfully' : 'Todo added successfully',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: 'light',
        }
      );
      if (editTodo) {
        setEditTodo(null);
      }
    }
  };

  const cancelUpdate = () => {
    dispatch(clearCurrentTodo());
    setEditTodo(null);
    reset();
  };
  useEffect(() => {
    if (currentTodo && currentTodo.length) {
      setValue('todoText', currentTodo[0].todoText);
      document.getElementById('add-todo-textarea').focus();
      setEditTodo(currentTodo[0].id);
    }
  }, [currentTodo, setValue]);
  return (
    <section className="add-todo-section my-2 px-2">
      <ToastContainer />
      <form method="post" onSubmit={handleSubmit(onAddTodo)}>
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Add Todo
        </label>
        <div className="flex">
          <textarea
            id="add-todo-textarea"
            htmlFor="4"
            name="todoText"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add todo"
            {...register('todoText', {
              required: 'Enter todo',
            })}
          ></textarea>

          {editTodo ? (
            <div className="inline-flex items-center space-x-2 px-2 text-gray-900 rounded-r-md bg-[#D63691]">
              <button type="submit">
                <BsPencil className="font-medium w-5 h-5 cursor-pointer" />
              </button>
              <MdOutlineCancel
                className="font-medium w-5 h-5 cursor-pointer"
                onClick={() => cancelUpdate()}
              />
            </div>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center cursor-pointer px-3 text-sm text-gray-900 rounded-r-md bg-[#D63691]"
            >
              <AiOutlinePlusCircle className="font-medium w-6 h-6" />
            </button>
          )}
        </div>
      </form>
      {formErrors?.todoText && formErrors?.todoText?.message && (
        <span className="text-red-500 text-sm mt-1">
          {formErrors?.todoText?.message}
        </span>
      )}
    </section>
  );
};

export default AddTodo;
