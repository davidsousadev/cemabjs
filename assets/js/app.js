let editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "javascript",
    theme: "material-darker",
    lineNumbers: true,
    inputStyle: "contenteditable",
    viewportMargin: Infinity
});

// auto fechar
editor.on("keydown", (cm, e) => {
    const pairs = { "(": ")", "{": "}", "[": "]" };
    if (pairs[e.key]) {
        e.preventDefault();
        let c = cm.getCursor();
        cm.replaceRange(e.key + pairs[e.key], c);
        cm.setCursor({ line: c.line, ch: c.ch + 1 });
    }
});

let saida = document.getElementById("saida");
let fakeInput = document.getElementById("fakeInput");

let resolverInput = null;
let buffer = "";
let historico = [];
let posHistorico = -1;

// 🔥 estado real do terminal
let terminalTexto = "";

// ===== CURSOR =====
function renderCursor() {
    saida.innerHTML = "";

    const texto = document.createTextNode(terminalTexto);
    const cursor = document.createElement("span");

    cursor.className = "cursor";

    saida.appendChild(texto);
    saida.appendChild(cursor);

    saida.scrollTop = saida.scrollHeight;
}

// ===== PRINT =====
function print(txt) {
    terminalTexto += txt + "\n";
    renderCursor();
}

// ===== INPUT =====
function input(msg = "") {
    return new Promise(resolve => {
        terminalTexto += msg;
        renderCursor();

        buffer = "";
        resolverInput = resolve;

        fakeInput.focus();
    });
}

// substituir prompt
const promptNativo = window.prompt;
window.prompt = async (msg) => await input(msg);

// ===== INPUT CAPTURA =====
fakeInput.addEventListener("input", () => {
    if (!resolverInput) return;

    buffer += fakeInput.value;
    fakeInput.value = "";

    terminalTexto += buffer.slice(-1);
    renderCursor();
});

fakeInput.addEventListener("keydown", (e) => {
    if (!resolverInput) return;

    if (e.key === "Backspace") {
        e.preventDefault();
        buffer = buffer.slice(0, -1);
        terminalTexto = terminalTexto.slice(0, -1);
    }

    else if (e.key === "Enter") {
        e.preventDefault();

        terminalTexto += "\n";

        historico.push(buffer);
        posHistorico = historico.length;

        resolverInput(buffer);
        resolverInput = null;
        buffer = "";
    }

    else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (posHistorico > 0) {
            posHistorico--;
            buffer = historico[posHistorico];

            // limpa linha atual
            let linhas = terminalTexto.split("\n");
            linhas[linhas.length - 1] = "> " + buffer;
            terminalTexto = linhas.join("\n");
        }
    }

    else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (posHistorico < historico.length - 1) {
            posHistorico++;
            buffer = historico[posHistorico];
        } else {
            buffer = "";
        }
    }

    renderCursor();
});

// clicar ativa teclado (mobile incluso)
saida.addEventListener("click", () => fakeInput.focus());
saida.addEventListener("touchstart", () => fakeInput.focus(), { passive: true });
saida.addEventListener("touchstart", () => fakeInput.focus());

// ===== EXECUTAR =====
async function executar() {
    terminalTexto = "";
    buffer = "";
    resolverInput = null;
    renderCursor();

    console.log = (...msg) => {
        print(msg.join(" "));
    };

    try {
        await eval(`(async () => { ${editor.getValue()} })()`);
    } catch (e) {
        print("Erro: " + e);
    }
}

// ===== LIMPAR =====
function limpar() {
    terminalTexto = "";
    renderCursor();
}

// ===== SALVAR =====
function salvar() {
    let nome = promptNativo("Nome do arquivo:", "");
    if (nome === null) return;
    nome = nome.trim();
    if (!nome) return;
    if (!nome.toLowerCase().endsWith(".js")) {
        alert("O nome do arquivo deve terminar com .js");
        return;
    }
    let blob = new Blob([editor.getValue()], { type: "text/javascript" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nome;
    link.click();
    URL.revokeObjectURL(link.href);
}


// iniciar

// refresh editor on mobile keyboard / resize
function refreshEditor() {
    setTimeout(function() { try { editor.refresh(); } catch (e) {} }, 150);
}
window.addEventListener("resize", refreshEditor);
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", refreshEditor);
}

renderCursor();
