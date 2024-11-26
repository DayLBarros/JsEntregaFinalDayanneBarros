const MAX_TASKS = 10; 
let taskList = []; 

class Task {
    constructor(title, description, priority) {
        if (!title || typeof title !== "string") {
            throw new Error("O título da tarefa deve ser uma string não vazia.");
        }
        if (!["Alta", "Média", "Baixa"].includes(priority)) {
            throw new Error("A prioridade deve ser 'Alta', 'Média' ou 'Baixa'.");
        }

        this.title = title;
        this.description = description || "Sem descrição"; 
        this.priority = priority;
        this.completed = false; 
    }

    markAsCompleted() {
        this.completed = true;
    }

    displayTask() {
        console.log(`Título: ${this.title}`);
        console.log(`Descrição: ${this.description}`);
        console.log(`Prioridade: ${this.priority}`);
        console.log(`Status: ${this.completed ? "Concluída" : "Pendente"}`);
    }
}

function addTask(title, description, priority) {
    if (taskList.length >= MAX_TASKS) {
        console.warn("Número máximo de tarefas atingido. Não é possível adicionar mais tarefas.");
        return;
    }

    try {
        const newTask = new Task(title, description, priority);
        taskList.push(newTask);
        console.log(`Tarefa "${title}" adicionada com sucesso!`);
    } catch (error) {
        console.error(`Erro ao adicionar tarefa: ${error.message}`);
    }
}

function removeTask(title) {
    const initialLength = taskList.length;
    taskList = taskList.filter(task => task.title !== title);

    if (taskList.length === initialLength) {
        console.warn(`Nenhuma tarefa encontrada com o título "${title}".`);
    } else {
        console.log(`Tarefa "${title}" removida com sucesso.`);
    }
}

function listTasks() {
    if (taskList.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("Lista de Tarefas:");
    taskList.forEach((task, index) => {
        console.log(`\nTarefa ${index + 1}:`);
        task.displayTask();
    });
}

function completeTask(title) {
    const task = taskList.find(task => task.title === title);

    if (!task) {
        console.warn(`Nenhuma tarefa encontrada com o título "${title}".`);
        return;
    }

    task.markAsCompleted();
    console.log(`Tarefa "${title}" marcada como concluída.`);
}

addTask("Estudar JavaScript", "Revisar conceitos de ES6", "Alta");
addTask("Comprar mantimentos", "Frutas, legumes e pão", "Média");
addTask("Limpar o quarto", null, "Baixa");

listTasks();

completeTask("Estudar JavaScript");

removeTask("Tarefa inexistente");

removeTask("Comprar mantimentos");

listTasks();

for (let i = 1; i <= 11; i++) {
    addTask(`Tarefa Extra ${i}`, `Descrição da tarefa extra ${i}`, "Baixa");
}