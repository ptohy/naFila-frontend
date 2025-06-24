document.addEventListener("DOMContentLoaded", () => {
    const apiBaseUrl = "http://127.0.0.1:5000/api";
    const addItemForm = document.getElementById("addItemForm");
    const itemList = document.getElementById("itemList");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    
    // Modal
    const modal = document.getElementById("addItemModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeButton = document.getElementsByClassName("close-button")[0];

    let draggedItem = null;

    openModalBtn.onclick = () => modal.style.display = "block";
    closeButton.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    };

    const fetchItems = async (searchQuery = "") => {
        try {
            // Se houver busca, chama a rota /pesquisar, senão, a /listar
            const url = searchQuery ? `${apiBaseUrl}/pesquisar?q=${searchQuery}` : `${apiBaseUrl}/listar`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro ao buscar itens");
            const items = await response.json();
            
            itemList.innerHTML = "";
            items.forEach(item => {
                const card = document.createElement("div");
                card.className = "item-card";
                card.setAttribute("draggable", "true");
                card.dataset.id = item.id;

                if (item.status === "Concluído") card.classList.add("concluido");
                
                card.innerHTML = `
                    <div>
                        <strong>${item.titulo}</strong>
                        <p><a href="${item.link}" target="_blank">${item.link || ''}</a></p>
                        <small>Tipo: ${item.tipo} | Status: ${item.status}</small>
                    </div>
                    <div class="item-card-actions">
                        ${item.status !== "Concluído" ? `<button class="complete-btn" data-id="${item.id}">Concluir</button>` : ""}
                        <button class="delete-btn" data-id="${item.id}">Excluir</button>
                    </div>
                `;
                itemList.appendChild(card);
            });
            addDragDropListeners();
        } catch (error) {
            console.error("Falha na requisição:", error);
            itemList.innerHTML = "<p>Não foi possível carregar os itens.</p>";
        }
    };

    // --- Drag and Drop (arrastar e soltar) ---
    function addDragDropListeners() {
        document.querySelectorAll(".item-card").forEach(card => {
            card.addEventListener("dragstart", (e) => {
                draggedItem = e.currentTarget;
                setTimeout(() => e.currentTarget.classList.add("dragging"), 0);
            });
            card.addEventListener("dragend", () => {
                draggedItem.classList.remove("dragging");
            });
            card.addEventListener("dragover", (e) => e.preventDefault());
            card.addEventListener("drop", async (e) => {
                e.preventDefault();
                if (draggedItem !== e.currentTarget) {
                    const allItems = [...itemList.children];
                    const draggedIndex = allItems.indexOf(draggedItem);
                    const targetIndex = allItems.indexOf(e.currentTarget);
                    if (draggedIndex < targetIndex) {
                        itemList.insertBefore(draggedItem, e.currentTarget.nextSibling);
                    } else {
                        itemList.insertBefore(draggedItem, e.currentTarget);
                    }
                    const newOrder = [...itemList.children].map(card => card.dataset.id);
                    try {
                        await fetch(`${apiBaseUrl}/reordenar`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ order: newOrder }),
                        });
                    } catch (error) { console.error("Falha ao salvar a ordem:", error); }
                }
            });
        });
    }

    // --- Event Listeners ---
    addItemForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const novoItem = {
            titulo: document.getElementById("titulo").value,
            link: document.getElementById("link").value,
            tipo: document.getElementById("tipo").value,
        };
        try {
            const response = await fetch(`${apiBaseUrl}/cadastrar`, { // ROTA CORRETA
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoItem),
            });
            if (response.ok) {
                addItemForm.reset();
                modal.style.display = "none";
                fetchItems();
            }
        } catch (error) { console.error("Falha na requisição:", error); }
    });

    itemList.addEventListener("click", async (event) => {
        const target = event.target;
        const id = target.dataset.id;
        if (target.classList.contains("delete-btn")) {
            try {
                const response = await fetch(`${apiBaseUrl}/deletar/${id}`, { method: "DELETE" }); // ROTA CORRETA
                if (response.ok) fetchItems();
            } catch (error) { console.error("Falha ao deletar:", error); }
        }
        if (target.classList.contains("complete-btn")) {
            try {
                const response = await fetch(`${apiBaseUrl}/atualizar_status/${id}`, { // ROTA CORRETA
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "Concluído" }),
                });
                if (response.ok) fetchItems();
            } catch (error) { console.error("Falha ao atualizar:", error); }
        }
    });

    searchBtn.addEventListener("click", () => fetchItems(searchInput.value));
    
    fetchItems(); // Carga inicial
});