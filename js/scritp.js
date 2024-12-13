let taskList = [];

// Renderiza as tarefas na página
function renderTasks() {
    const container = document.getElementById("taskContainer");
    if (taskList.length === 0) {
        container.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    let html = "<ul>";
    taskList.forEach((task, index) => {
        // Definir classe de status
        let taskClass = "task-pending"; // Classe padrão para tarefas pendentes
        if (task.started) {
            taskClass = "task-started"; // Classe para tarefas iniciadas
        } else if (task.completed) {
            taskClass = "task-completed"; // Classe para tarefas concluídas
        }

        html += `
            <li class="${taskClass}">
                <strong>${task.title}</strong> - ${task.priority}<br>
                ${task.description || "Sem descrição"}<br>
                Status: ${task.completed ? "Concluída" : (task.started ? "Iniciada" : "Pendente")}<br>
                <button onclick="startTask(${index})" ${task.started || task.completed ? 'disabled' : ''}>Iniciar</button>
                <button onclick="completeTask(${index})" ${task.completed ? 'disabled' : ''}>Concluir</button>
                <button onclick="removeTask(${index})">Remover</button>
            </li>
        `;
    });
    html += "</ul>";

    container.innerHTML = html;
}

// Adiciona uma nova tarefa
function addTask(title, description, priority) {
    const task = {
        title,
        description,
        priority,
        completed: false,
        started: false // Nova propriedade para indicar que a tarefa foi iniciada
    };
    taskList.push(task);
    renderTasks();
}

// Marca a tarefa como iniciada
function startTask(index) {
    taskList[index].started = true; // Marca a tarefa como iniciada
    renderTasks(); // Atualiza a lista de tarefas
}

// Marca a tarefa como concluída
function completeTask(index) {
    taskList[index].completed = true; // Marca a tarefa como concluída
    renderTasks(); // Atualiza a lista de tarefas
}

// Remove uma tarefa
function removeTask(index) {
    taskList.splice(index, 1);
    renderTasks();
}

// Switch de temas (claro ou escuro)
function switchTheme(theme) {
    const validThemes = ["light", "dark"];
    if (!validThemes.includes(theme)) {
        console.error("Tema inválido. Escolha entre 'light' ou 'dark'.");
        return;
    }

    document.body.className = ""; // Limpa classes antigas
    document.body.classList.add(theme);

    localStorage.setItem("selectedTheme", theme);
    console.log(`Tema alterado para: ${theme}`);
}

document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const priority = document.getElementById("taskPriority").value;

    addTask(title, description, priority); // Adiciona a tarefa

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
});

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("selectedTheme") || "light";
    switchTheme(savedTheme);
});

// Função para inicializar e renderizar as tarefas ao carregar a página
renderTasks();
