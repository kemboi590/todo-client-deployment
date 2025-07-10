import { todosAPI, type TTodo } from "../../../features/todos/todosAPI"
import { type RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import UpdateTodo from "./UpdateTodo";



const UserTodos = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const userId = user?.user_id; // Get the user ID from the user state

    const { data: todosData, isLoading: todosLoading, error: todoError, refetch: refetchTodos } = todosAPI.useGetTodosByUserIdQuery(
        userId ?? 0, // Use the user ID or 0 if not available
        {
            skip: !userId, // Skip the query if userId is not available
            refetchOnMountOrArgChange: true, // Refetch when the component mounts or when the query arguments change 
        }
    )

    // State for the todo to update status
    const [selectedTodo, setSelectedTodo] = useState<TTodo | null>(null);


    console.log("Todos Data:", todosData);
    return (
        <div>
            {/* Update Status Modal */}
            <UpdateTodo todo={selectedTodo} refetch={refetchTodos} />

            {/* Display Todos */}
            {todosLoading && <p>Loading todos...</p>}
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
                                    <td className="px-4 py-2">
                                        <button
                                            className="btn btn-sm text-white bg-blue-500 hover:bg-blue-600"
                                            onClick={() => {
                                                setSelectedTodo(todo);
                                                (document.getElementById('update_modal') as HTMLDialogElement)?.showModal();
                                            }}
                                        >
                                            {todo.isCompleted ? "Mark as Pending" : "Mark as Completed"}
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

export default UserTodos
