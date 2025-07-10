import { todosAPI, type TTodo } from "../../../features/todos/todosAPI";
import { toast } from "sonner";

type UpdateTodoProps = {
    todo: TTodo | null;
    refetch: () => void;
};

const UpdateTodo = ({ todo, refetch }: UpdateTodoProps) => {
    const [updateTodo, { isLoading }] = todosAPI.useUpdateTodoMutation({ fixedCacheKey: "updateTodo" });

    if (!todo) return null;

    const handleStatusChange = async () => {
        try {
            const result = await updateTodo({ id: todo.id, isCompleted: !todo.isCompleted })
            console.log("Todo status updated successfully:", result);
            toast.success(`Todo marked as ${!todo.isCompleted ? "Completed" : "Pending"}!`);
            refetch(); // Refetch the todos to update the list
            (document.getElementById('update_modal') as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error updating todo status:", error);
            toast.error("Failed to update todo status. Please try again.");
        }
    };

    return (
        <dialog id="update_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg mb-4">Change Todo Status</h3>
                <p className="mb-6">
                    Are you sure you want to mark <span className="font-semibold">{todo.todoName}</span> as{" "}
                    <span className={todo.isCompleted ? "text-yellow-400" : "text-green-400"}>
                        {todo.isCompleted ? "Pending" : "Completed"}
                    </span>
                    ?
                </p>
                <div className="modal-action flex flex-col sm:flex-row gap-2">
                    <button
                        className={`btn ${todo.isCompleted ? "btn-warning" : "btn-success"} w-full sm:w-auto`}
                        onClick={handleStatusChange}
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : `Mark as ${todo.isCompleted ? "Pending" : "Completed"}`}
                    </button>
                    <button
                        className="btn w-full sm:w-auto"
                        type="button"
                        onClick={() => (document.getElementById('update_modal') as HTMLDialogElement)?.close()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default UpdateTodo;