import { todosAPI, type TTodo } from "../../../features/todos/todosAPI"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CreateTodos from "./CreateTodos";
import { useState } from "react";
import UpdateTodo from "./UpdateTodo";
import DeleteTodo from "./DeleteTodo";

const Todos = () => {
    const { data: todosData, isLoading: todosLoading, error: todoError } = todosAPI.useGetTodosQuery(
        undefined, // No parameters needed for fetching todos
        {
            refetchOnMountOrArgChange: true, // Refetch when the component mounts or when the query arguments change 
            pollingInterval: 60000, // Poll every 60 seconds to keep data fresh - the todos will be refetched every 60 seconds to keep the data fresh
        }
    )

    // state for the todo to update
    const [selectedTodo, setSelectedTodo] = useState<TTodo | null>(null);

    // state for the todo to delete
    const [todoToDelete, setTodoToDelete] = useState<TTodo | null>(null);

    const handleEdit = (todo: TTodo) => {
        setSelectedTodo(todo);
        (document.getElementById('update_modal') as HTMLDialogElement)?.showModal();

    }
    console.log("Todos Data:", todosData);
    return (
        <div>
            {/* Create Todo Button */}
            <div className="flex justify-center mb-3 mt-3">
                <button
                    className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2 text-lg"
                    data-test="create-todo-button"
                    onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement)?.showModal()}
                >
                    Create Todo
                </button>
            </div>

            {/* Modal and form */}
            <CreateTodos />
            <UpdateTodo todo={selectedTodo} />
            <DeleteTodo todo={todoToDelete} />


            {/* Display Todos */}
            {todosLoading && <p data-test="loading-spinner">Loading todos...</p>}
            {todoError && <p className="text-red-500">Error fetching todos</p>}
            {todosData && todosData.data && todosData.data.length > 0 ? (
                <div className="md:overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr className=" bg-gray-600 text-white text-md lg:text-lg">
                                <th className="px-4 py-2">Todo Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Due Date</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {todosData.data.map((todo: TTodo) => (
                                <tr key={todo.id} className="hover:bg-gray-300 border-b border-gray-400 ">
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base  ">{todo.todoName}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{todo.description}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{new Date(todo.dueDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                                        <span className={`badge ${todo.isCompleted ? "badge-success" : "badge-warning"}`}>
                                            {todo.isCompleted ? (
                                                <span className="text-green-700 lg:text-base">Completed</span>
                                            ) : (
                                                <span className="text-yellow-700 lg:text-base">Pending</span>
                                            )}
                                        </span>
                                    </td>
                                    {/* Actions to delete and Edit */}
                                    <td className="px-4 py-2 flex">
                                        <button
                                            className="btn btn-sm btn-primary mr-4 text-blue-500"
                                            data-test="edit-todo-button"
                                            onClick={() => handleEdit(todo)}
                                        >
                                            <FaEdit size={20} />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger text-red-500"
                                            data-test="delete-todo-button"
                                            onClick={() => {
                                                setTodoToDelete(todo);
                                                (document.getElementById('delete_modal') as HTMLDialogElement)?.showModal();
                                            }}
                                        >

                                            <MdDeleteForever size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No todos found.</p>
            )}
        </div>
    )
}

export default Todos
