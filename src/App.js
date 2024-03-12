import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="darkMode">
      <Header />
      <div className="todo_list">
        <div className="container">
          <div className="todo_wrapper">
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
