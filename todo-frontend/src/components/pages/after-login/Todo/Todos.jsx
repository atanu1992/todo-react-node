import AddTodo from './AddTodo';
import ListTodo from './ListTodo';
import Navbar from './Navbar';

const Todos = () => {
  return (
    <>
      <div className="w-full">
        <Navbar />
        <div className="container mx-auto px-2">
          <AddTodo />
          <ListTodo />
        </div>
      </div>
    </>
  );
};

export default Todos;
