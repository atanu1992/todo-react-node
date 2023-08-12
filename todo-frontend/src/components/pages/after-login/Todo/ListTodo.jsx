const ListTodo = () => {
  // const todoList = [
  //   { name: 'Add todo', id: 1, completed: true },
  //   { name: 'Add todo1', id: 2 },
  //   { name: 'Add todo2', id: 3 },
  // ];
  return (
    <>
      <p>Right todo</p>
      {/* <main role="main" className="w-full px-3 pt-1 sm:w-2/3 md:w-3/4">
        <div className="flex flex-col">
          <h1 className="p-2">Todo List</h1>
          <div className="mt-3 todo-list">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr key={`todo_thead`}>
                    <th scope="col" className="px-6 py-3">
                      Todo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Completed
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todoList && todoList.length ? (
                    todoList.map((v, i) => {
                      return (
                        <tr
                          key={`todo_tr_${i}`}
                          className="bg-gray-300 border-b"
                        >
                          <td className="px-6 py-4">{v.name}</td>
                          <td className="px-6 py-4">
                            {v.completed ? 'Completed' : 'Not completed'}
                          </td>
                          <td className="px-6 py-4">Edit</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr
                      key={`todo_list_no_records`}
                      className="bg-gray-300 border-b"
                    >
                      <td className="px-6 py-4 text-center" colSpan={3}>
                        No record found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main> */}
    </>
  );
};

export default ListTodo;
