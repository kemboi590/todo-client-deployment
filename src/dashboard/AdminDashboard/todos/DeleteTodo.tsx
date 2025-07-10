import { toast } from "sonner";
import { todosAPI, type TTodo } from "../../../features/todos/todosAPI";

type DeleteTodoProps = {
    todo: TTodo | null;
};

const DeleteTodo = ({ todo }: DeleteTodoProps) => {
    const [deleteTodo, { isLoading }] = todosAPI.useDeleteTodoMutation(
        { fixedCacheKey: "deleteTodo" } //used to prevent cache invalidation issues - in simple terms, it helps to keep the cache consistent
    );

    const handleDelete = async () => {
        try {
            if (!todo) {
                toast.error("No todo selected for deletion.");
                return;
            }
            await deleteTodo(todo.id);
            toast.success("Todo deleted successfully!");
            (document.getElementById('delete_modal') as HTMLDialogElement)?.close();

        } catch (error) {
            console.error("Error deleting todo:", error);
            toast.error("Failed to delete todo. Please try again.");

        }
    };

    return (
        <dialog id="delete_modal" className="modal sm:modal-middle" data-test="delete-todo-modal">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">

                <h3 className="font-bold text-lg mb-4" data-test="delete-todo-title">Delete Todo</h3>
                <p className="mb-6" data-test="delete-todo-confirmation-text">
                    Are you sure you want to delete <span className="font-semibold">{todo?.todoName}</span>?
                </p>
                <div className="modal-action flex gap-4">
                    <button
                        data-test="delete-todo-confirm-button"
                        className="btn btn-error"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-primary" /> Deleting...
                            </>
                        ) : "Yes, Delete"}
                    </button>
                    <button
                        data-test="delete-todo-cancel-button"
                        className="btn"
                        type="button"
                        onClick={() => (document.getElementById('delete_modal') as HTMLDialogElement)?.close()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteTodo;