import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const AddTodo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onAddTodo = (data) => {
    console.log(data);
  };
  return (
    <aside className="w-full sm:w-1/3 md:w-1/4 px-2 bg-slate-300 h-screen">
      <div className="sticky top-0 p-2 w-full">
        <div className="flex-col items-center justify-center mt-5">
          <h1>Add Todo</h1>
          <form
            className="space-y-6 md:space-y-6"
            onSubmit={handleSubmit(onAddTodo)}
          >
            <div className="mt-5">
              <label
                htmlFor="todo"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Todo <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('todo', {
                  required: {
                    value: true,
                    message: 'Todo is required',
                  },
                })}
                name="todo"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter new todo"
              />
              {errors?.todo && errors?.todo?.message && (
                <span className="text-red-500 text-sm mt-1">
                  {errors?.todo?.message}
                </span>
              )}
            </div>
            <input
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500 cursor-pointer"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </aside>
  );
};

export default AddTodo;
