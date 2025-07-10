import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { todosAPI } from "../../../features/todos/todosAPI";
import { toast } from "sonner";

type CreateTodoInputs = {
    todoName: string;
    description: string;
    userId: number;
    dueDate: string;
    isCompleted: boolean;
};

const schema = yup.object({
    todoName: yup.string().max(75, "Max 75 characters").required("Todo name is required"),
    description: yup.string().max(255, "Max 255 characters").required("Description is required"),
    userId: yup.number().required("User ID is required").positive("User ID must be a positive number").integer("User ID must be an integer"),
    isCompleted: yup.boolean().default(false),
    dueDate: yup.string().required("Due date is required"),
});

const CreateTodos = () => {
    const [createTodo, { isLoading }] = todosAPI.useCreateTodoMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateTodoInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateTodoInputs> = async (data) => {
        try {
            await createTodo(data).unwrap();
            // console.log("Todo created successfully:", response);
            toast.success("Todo created successfully!");
            reset(); // Clear the form after successful submission
            (document.getElementById('my_modal_5') as HTMLDialogElement)?.close();

        } catch (error) {
            console.error("Error creating todo:", error);
            toast.error("Failed to create todo. Please try again.");

        }
    };

    return (
        <dialog id="my_modal_5" className="modal sm:modal-middle" data-test="create-todo-modal">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">

                <h3 className="font-bold text-lg mb-4">Create New Todo</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        data-test="todo-name-input"
                        type="text"
                        {...register("todoName")}
                        placeholder="Todo Name"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"

                    />
                    {errors.todoName && (
                        <span className="text-sm text-red-700">{errors.todoName.message}</span>
                    )}

                    <textarea
                        data-test="todo-description-input"
                        {...register("description")}
                        placeholder="Description"
                        className="textarea textarea-bordered w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.description && (
                        <span className="text-sm text-red-700">{errors.description.message}</span>
                    )}

                    <input
                        data-test="todo-userid-input"
                        type="number"
                        {...register("userId")}
                        placeholder="User ID"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />

                    {errors.userId && (
                        <span className="text-sm text-red-700">{errors.userId.message}</span>
                    )}

                    <input
                        data-test="todo-date-input"
                        type="date"
                        {...register("dueDate")}
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.dueDate && (
                        <span className="text-sm text-red-700">{errors.dueDate.message}</span>
                    )}

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-4 text-white">Status</span>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        data-test="todo-status-completed"
                                        type="radio"
                                        value="true"
                                        {...register("isCompleted")}
                                        className="radio radio-primary text-green-400"
                                    />
                                    Completed
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        data-test="todo-status-pending"
                                        type="radio"
                                        value="false"
                                        {...register("isCompleted")}
                                        className="radio radio-primary  text-yellow-400"
                                        defaultChecked
                                    />
                                    Pending
                                </label>
                            </div>
                        </label>
                    </div>
                    {errors.isCompleted && (
                        <span className="text-sm text-red-700">{errors.isCompleted.message}</span>
                    )}

                    <div className="modal-action">
                        <button
                            data-test="createtodo-submit-button"
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner text-primary" /> Creating...
                                </>
                            ) : "Create"}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                (document.getElementById('my_modal_5') as HTMLDialogElement)?.close();
                            }}
                        >
                            Close
                        </button>

                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default CreateTodos;