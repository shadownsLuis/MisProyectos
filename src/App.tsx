import React, { Fragment, useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newtask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const tasksImput = useRef<HTMLInputElement>(null);

  const handleSumit = (e: FormElement): void => {
    e.preventDefault();
    addtask(newtask);
    setNewTask("");
    tasksImput.current?.focus();
  };

  const addtask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSumit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newtask}
                  className="from-control"
                  ref={tasksImput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">
                  Guardar
                </button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2">
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✔" : "X"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
