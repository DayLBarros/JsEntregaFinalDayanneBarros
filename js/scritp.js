// Lista de tarefas (carregada do localStorage)
let taskList = [];

// Renderiza as tarefas na página
function renderTasks() {
    const container = document.getElementById("taskContainer");
    if (!container) {
        displayMessage("Erro: Contêiner de tarefas não encontrado.", "error");
        return;
    }

    if (taskList.length === 0) {
        container.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    container.innerHTML = `
        <ul>
            ${taskList.map((task, index) => `
                <li class="${task.completed ? 'task-completed' : task.started ? 'task-started' : 'task-pending'}">
                    <strong>${task.title}</strong> - ${task.priority}<br>
                    ${task.description || "Sem descrição"}<br>
                    Status: ${task.completed ? "Concluída" : task.started ? "Iniciada" : "Pendente"}<br>
                    <button onclick="startTask(${index})" ${task.started || task.completed ? 'disabled' : ''}>Iniciar</button>
                    <button onclick="completeTask(${index})" ${task.completed ? 'disabled' : ''}>Concluir</button>
                    <button onclick="removeTask(${index})">Remover</button>
                </li>
            `).join("")}
        </ul>
    `;
}

// Adiciona uma nova tarefa
function addTask(title, description, priority) {
    if (!title || !priority) {
        displayMessage("Erro: Título e prioridade são obrigatórios.", "error");
        return;
    }

    const task = {
        title,
        description,
        priority,
        completed: false,
        started: false
    };

    taskList.push(task);  // Adiciona a tarefa à lista
    saveTasks();  // Salva as tarefas no localStorage
    renderTasks();  // Atualiza a renderização das tarefas
    displayMessage("Tarefa adicionada com sucesso!", "success");
}

// Marca a tarefa como iniciada
function startTask(index) {
    if (index < 0 || index >= taskList.length) {
        displayMessage("Erro: Índice inválido.", "error");
        return;
    }

    taskList[index].started = true;
    saveTasks();
    renderTasks();
}

// Marca a tarefa como concluída
function completeTask(index) {
    if (index < 0 || index >= taskList.length) {
        displayMessage("Erro: Índice inválido.", "error");
        return;
    }

    taskList[index].completed = true;
    saveTasks();
    renderTasks();
}

// Remove uma tarefa
function removeTask(index) {
    if (index < 0 || index >= taskList.length) {
        displayMessage("Erro: Índice inválido.", "error");
        return;
    }

    taskList.splice(index, 1);  // Remove a tarefa do array
    saveTasks();  // Atualiza o localStorage
    renderTasks();  // Atualiza a renderização da página
    displayMessage("Tarefa removida com sucesso!", "success");
}

// Salva as tarefas no localStorage
function saveTasks() {
    try {
        localStorage.setItem("taskList", JSON.stringify(taskList));  // Salva as tarefas no localStorage
    } catch (error) {
        displayMessage("Erro ao salvar as tarefas.", "error");
    }
}

// Carrega as tarefas do localStorage
function loadTasks() {
    try {
        const savedTasks = localStorage.getItem("taskList");
        taskList = savedTasks ? JSON.parse(savedTasks) : [];  // Se houver tarefas salvas, carrega elas
        renderTasks();  // Renderiza as tarefas na página
    } catch (error) {
        displayMessage("Erro ao carregar as tarefas.", "error");
    }
}

// Exibe mensagens na página
function displayMessage(message, type) {
    const container = document.getElementById("messageContainer");
    if (!container) return;

    container.innerHTML = `<p class="${type}">${message}</p>`;
    setTimeout(() => container.innerHTML = "", 3000);
}

// Inicializa o tema
function initTheme() {
    const savedTheme = localStorage.getItem("selectedTheme") || "light";
    switchTheme(savedTheme);
}

// Alterna entre temas
function switchTheme(theme) {
    const validThemes = ["light", "dark"];
    if (!validThemes.includes(theme)) {
        displayMessage("Erro: Tema inválido.", "error");
        return;
    }

    document.body.className = "";
    document.body.classList.add(theme);
    localStorage.setItem("selectedTheme", theme);
}

// Eventos e inicialização
document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const priority = document.getElementById("taskPriority").value;

    addTask(title, description, priority);

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
});

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadTasks();  // Carrega as tarefas salvas ao carregar a página
});
