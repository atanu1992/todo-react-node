import AddTodo from './AddTodo';
import ListTodo from './ListTodo';

const Todos = () => {
  return (
    <>
      <div className="h-screen w-full bg-[#040406] flex justify-center">
        <div className="container mx-auto">
          <AddTodo />
          <ListTodo />
        </div>
      </div>
    </>
  );
};

export default Todos;
