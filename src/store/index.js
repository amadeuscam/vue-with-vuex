import {
    createStore
} from "vuex";



export default createStore({
    state: {
        tasks: [],
        task: {}
    },
    mutations: {

        delete_task(state, payload) {
            state.tasks = state.tasks.filter((task) => task.id !== payload)
        },
        add_tasks(state, payload){
            state.tasks = payload
        },
        fetch_one_task(state, payload){
            state.task = payload
        },
        toggle_task(state, payload){
            
            state.tasks = state.tasks.map((task) =>
                task.id == payload.id ? {
                    ...task,
                    reminder: payload.reminder
                } : task
            );
        },
        add_task(state, payload){
            state.tasks = [...state.tasks, payload];
        },

    },
    actions: {
        async deleteTask({
            commit,
            state
        }) {
            if (confirm("Estas seguro¿?")) {
                const res = await fetch(`api/tasks/${state.task_id}`, {
                    method: "DELETE",
                });
                res.status === 200 ? commit('delete_task', state.task_id) : alert("algo va mal");
            }
        },
        async toggleReminder({dispatch,
            commit,state
        },id) {

            await dispatch('fecthTask',id)
            const updTask = {...state.task,reminder: !state.task.reminder};
            
            //change data
            const res_put = await fetch(`api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(updTask),
            });

            const data_put = await res_put.json();
            commit('toggle_task',data_put)


        },
        async addTask({
            commit
        },task) {
           
            const res = await fetch("api/tasks", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(task),
            });

            const data = await res.json();
            commit('add_task',data)

          
        },
        async fecthTasks({
            commit
        }) {
            const res = await fetch("api/tasks");
            const data = await res.json();
            commit("add_tasks",data)
          
        },
        async fecthTask({
            commit
        },id) {
            const res = await fetch(`api/tasks/${id}`);
            const data = await res.json();
            console.log(data);
          
            commit("fetch_one_task",data)
          
        },


    },
})