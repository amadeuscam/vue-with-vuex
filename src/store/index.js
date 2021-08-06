import {
    createStore
} from "vuex";



export default createStore({
    state: {
        task_id: null,
        tasks: [],
        task: {}
    },
    mutations: {
        async deleteTask(state) {
            if (confirm("Estas seguro¿?")) {
                const res = await fetch(`api/tasks/${state.task_id}`, {
                    method: "DELETE",
                });

                res.status === 200 ?
                    (state.tasks = this.state.tasks.filter((task) => task.id !== state.task_id)) :
                    alert("algo va mal");
            }
        },
        async toggleReminder(state) {

            //get data 
            const res = await fetch(`api/tasks/${state.task_id}`, {
                method: "GET",
            });

            const data = await res.json();
          
            const updTask = {
                ...data,
                reminder: !data.reminder
            };


            //change data
            const res_put = await fetch(`api/tasks/${state.task_id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(updTask),
            });

            const data_put = await res_put.json();

            state.tasks = state.tasks.map((task) =>
                task.id == state.task_id ? {
                    ...task,
                    reminder: data_put.reminder
                } : task
            );

        },
        async addTask(state) {
            let task = state.task
            const res = await fetch("api/tasks", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(task),
            });

            const data = await res.json();

            this.state.tasks = [...this.state.tasks, data];
        },
        async fecthTasks(state) {
            const res = await fetch("api/tasks");
            const data = await res.json();
            state.tasks = data
        },

    },
    actions: {
        get_data_backend(context) {
            context.commit('fecthTasks')
        },
        delete_task(context) {
            context.commit('deleteTask')
        },
        toggle_reminder(context) {
            context.commit('toggleReminder')
        },
        add_tasks(context) {
            context.commit('addTask')
        }

    },
    getters: {

    }
})