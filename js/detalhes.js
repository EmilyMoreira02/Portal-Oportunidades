// ARQUIVO DE DETALHES (detalhes.js)

const oportunidades = [
    {
        id: 1,
        titulo: "Batalha de Talentos",
        subtitulo: "Concurso de Culinária",
        tipo: "concurso",
        area: "culinaria",
        dataLimite: "2025-08-20",
        dataEvento: "2025-09-01",
        publico: "estudante",
        descricao: "Participe do nosso concurso de culinária 'Batalha de Talentos'! Mostre sua criatividade na cozinha e concorra a prêmios incríveis. Regras e inscrições no link.",
        linkExterno: "#"
    },
    {
        id: 2,
        titulo: "Futuro da IA",
        subtitulo: "Palestra sobre Inteligência Artificial",
        tipo: "palestra",
        area: "tecnologia",
        dataLimite: "2025-10-09",
        dataEvento: "2025-11-10",
        publico: "estudante",
        descricao: "Explore as últimas tendências e o futuro da Inteligência Artificial em nossa palestra exclusiva. Palestrante renomado da área. Garanta sua vaga!",
        linkExterno: "#"
    },
    {
        id: 3,
        titulo: "Bolsas de Mestrado",
        subtitulo: "Edital de Fomento à Pesquisa",
        tipo: "edital",
        area: "educacao",
        dataLimite: "2025-10-20",
        dataEvento:"2025-11-01",
        publico: "profissional",
        descricao: "Editais abertos para bolsas de mestrado em diversas áreas. Oportunidade para aprofundar seus estudos e desenvolver pesquisas inovadoras. Consulte os requisitos.",
        linkExterno: "#"
    },
    {
        id: 4,
        titulo: "Expo Jovem Artista",
        subtitulo: "Concurso de Artes Visuais",
        tipo: "concurso",
        area: "artes",
        dataLimite: "2025-10-25",
        dataEvento: "2025-11-06",
        publico: "estudante",
        descricao: "Mostre seu talento artístico no concurso 'Expo Jovem Artista'! Aberto para estudantes com trabalhos em pintura, escultura, fotografia e mais. Detalhes no link.",
        linkExterno: "#"
    },
    {
        id: 5,
        titulo: "Estratégias de Marketing",
        subtitulo: "Palestra sobre Empreendedorismo",
        tipo: "palestra",
        area: "negocios",
        dataLimite: "2025-11-20",
        dataEvento: "2025-12-05",
        publico: "geral",
        descricao: "Aprenda as melhores estratégias de marketing para impulsionar seu negócio ou carreira. Palestra focada em resultados e inovação. Vagas limitadas!",
        linkExterno: "#"
    },
    {
        id: 6,
        titulo: "Roda de Ideias Culinárias",
        subtitulo: "Concurso de Culinária",
        tipo: "concurso",
        area: "culinaria",
        dataLimite: "2025-10-30",
        dataEvento: "2025-11-08",
        publico: "geral",
        descricao: "Participe de uma 'Roda de Ideias Culinárias' e compartilhe suas receitas e técnicas. Um evento para todos os amantes da boa comida!",
        linkExterno: "#"
    },
    {
        id: 7,
        titulo: "Roda de Ideias Culinárias",
        subtitulo: "Concurso de Culinária",
        tipo: "concurso",
        area: "culinaria", 
        dataLimite: null,
        dataEvento: "2025-11-30",
        publico: "geral",
        descricao: "Participe de uma experiência gastronômica completa: concorra a prêmios no Concurso de Culinária e, em seguida, troque receitas e dicas na Roda de Ideias...",
        linkExterno: "#",
    },
    {
        id: 8,
        titulo: "Música e Dança",
        subtitulo: "Oficina de Ritmos Afro-Brasileiros",
        tipo: "oficina",
        area: "cultura e arte",
        dataLimite: null,
        dataEvento: "2025-11-30",
        publico: "geral",
        descricao: "Participe de uma imersão nos ritmos afro-brasileiros. A oficina une música e dança para explorar a história e a cultura...",
        linkExterno: "#",
    },
];

let currentDate = new Date();
const monthYearElement = document.getElementById("month-year");
const calendarBody = document.getElementById("calendar-body");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const tituloOportunidadeElement = document.getElementById("titulo-oportunidade");
const subtituloOportunidadeElement = document.getElementById("subtitulo-oportunidade");
const tipoOportunidadeDet = document.getElementById("tipo-oportunidade-detalhe");
const areaInteresseDet = document.getElementById("area-interesse-detalhe");
const dataOportunidadeDet = document.getElementById("data-oportunidade-detalhe");
const publicoAlvoDet = document.getElementById("publico-alvo-detalhe");
const descricaoOportunidadeElement = document.getElementById("descricao-oportunidade");
const acoesContainer = document.getElementById('acoes-container'); // Contêiner para os botões

// ----------------------------------------------------------------------
// --- FUNÇÕES DE CONTROLE (BOTÃO DE INSCRIÇÃO E CALENDÁRIO) ---
// ----------------------------------------------------------------------

// Função para formatar a data e hora no padrão Google Calendar YYYYMMDDTHHMMSS
function formatarParaCalendar(dataStr, horarioStr = '08:00') {
    if (!dataStr) return '';
    
    // Converte a data (2025-11-20) para 20251120
    const dataFormatada = dataStr.replace(/-/g, '');
    
    // Converte a hora (08:00) para 080000 (HHMMSS)
    const [horas, minutos] = horarioStr.split(':');
    const horarioFormatado = `${horas}${minutos}00`;
    
    // Retorna o formato final: YYYYMMDDTHHMMSS
    return `${dataFormatada}T${horarioFormatado}`;
}

// Função para criar o HTML do botão original (Inscreva-se Agora)
function getBotaoOriginalHTML(oportunidade) {
    // Determina o ícone com base no tipo de oportunidade
    const iconeClass = (oportunidade.dataEvento) 
        ? "fas fa-calendar-check" 
        : "fas fa-external-link-alt";
        
    const classeAcao = (oportunidade.dataEvento) 
        ? "secondary" : "primary"; // Prioriza a inscrição em link externo para datas limites

    return `
        <button id="btn-inscrever" class="btn-acao ${classeAcao}" data-link="${oportunidade.linkExterno || '#'}">
            Inscreva-se Agora <i class="${iconeClass}"></i>
        </button>
    `;
}

// Função que lida com a retirada da inscrição (volta ao botão padrão)
function handleRetirarInscricaoClick(oportunidadeId, oportunidade) {
    if (!acoesContainer) return;

    // Remove o estado de inscrição do LocalStorage
    const statusKey = `inscrito_${oportunidadeId}`;
    localStorage.removeItem(statusKey);
    
    // Substitui o status e o botão de retirada pelo botão original
    acoesContainer.innerHTML = getBotaoOriginalHTML(oportunidade);
    
    // Reatribui o evento de clique ao botão que acabou de ser criado (essencial!)
    const novoBotaoInscrever = document.getElementById('btn-inscrever');
    if (novoBotaoInscrever) {
        novoBotaoInscrever.addEventListener('click', (e) => handleInscricaoClick(e, oportunidade));
    }
}

// A função principal que lida com a inscrição
function handleInscricaoClick(event, oportunidade) {
    event.preventDefault();
    
    const statusKey = `inscrito_${oportunidade.id}`;
    
    if (oportunidade.dataEvento) {
        // Se tem data de evento, abre o Google Calendar
        const horario = oportunidade.horarioEvento || '08:00';
        const dataHoraInicio = formatarParaCalendar(oportunidade.dataEvento, horario);
        
        // Assume duração de 1 hora para o evento: (dataInicio/dataFim)
        const datesParameter = `${dataHoraInicio}/${dataHoraInicio}`; 
        
        const tituloEvento = `Lembrete: ${oportunidade.titulo}`;
        const detalhesEvento = `Você se inscreveu em "${oportunidade.titulo}". Descrição: ${oportunidade.descricao}`;
        
        const URL_CALENDARIO = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(tituloEvento)}&dates=${datesParameter}&details=${encodeURIComponent(detalhesEvento)}&sf=true&output=xml`;

        // Salva o estado de inscrição e abre o calendário em nova aba
        localStorage.setItem(statusKey, 'true');
        window.open(URL_CALENDARIO, '_blank');
    } else {
        // Se não tem data de evento (ex: Edital, Concurso com data limite), redireciona para o link externo
        const link = event.currentTarget.dataset.link || '#';
        if (link && link !== '#') {
            window.open(link, '_blank');
        } else {
             // Apenas confirma a inscrição se não houver link/data de evento
             alert(`Inscrição para ${oportunidade.titulo} confirmada! (Link Externo não disponível)`);
        }
        // Salva o estado de inscrição (mesmo que seja um edital/concurso)
        localStorage.setItem(statusKey, 'true');
    }
    
    // 5. TROCA DE BOTÕES
    const novoConteudoHTML = `
        <div class="status-inscricao">
            <span>Inscrito!</span>
            <button id="btn-retirar-inscricao" class="btn-retirar-acao">Retirar Inscrição</button>
        </div>
    `;

    if (acoesContainer) {
        acoesContainer.innerHTML = novoConteudoHTML;

        // 6. Adiciona o evento de clique ao novo botão "Retirar Inscrição"
        const btnRetirar = document.getElementById('btn-retirar-inscricao');
        if (btnRetirar) {
            btnRetirar.addEventListener('click', () => handleRetirarInscricaoClick(oportunidade.id, oportunidade));
        }
    }
}


// ----------------------------------------------------------------------
// --- FUNÇÕES DE CALENDÁRIO ---
// ----------------------------------------------------------------------

function renderCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
    ];
    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    calendarBody.innerHTML = "";

    let date = 1;
    let row = document.createElement("tr");

    // Preenche os dias vazios no início do mês
    for (let i = 0; i < startingDayOfWeek; i++) {
        const cell = document.createElement("td");
        cell.classList.add("other-month");
        row.appendChild(cell);
    }

    while (date <= daysInMonth) {
        const cell = document.createElement("td");
        cell.textContent = date;
        cell.dataset.date = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

        const today = new Date();
        if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            date === today.getDate()
        ) {
            cell.classList.add("today");
        }

        // Verifica se há uma oportunidade com data de evento OU data limite neste dia
        const oportEsp = oportunidades.find((op) => {
            // Verifica dataEvento (para palestras, workshops, etc.) OU dataLimite (para concursos, editais)
            const opDateEvent = op.dataEvento;
            const opDateLimit = op.dataLimite;
            return (opDateEvent && opDateEvent === cell.dataset.date) || (opDateLimit && opDateLimit === cell.dataset.date);
        });

        if (oportEsp) {
            cell.classList.add("event-day");
            cell.title = `${oportEsp.titulo} - ${oportEsp.subtitulo}`;
            
            // *** AQUI É O AJUSTE PARA O CLIQUE NO CALENDÁRIO ***
            cell.addEventListener("click", () => {
                const eventId = oportEsp.id;
                localStorage.setItem("oportunidadeId", eventId); // Salva o ID
                window.location.href = "detalhes.html"; // Redireciona para recarregar com o novo ID
            });
        }

        row.appendChild(cell);

        if (new Date(year, month, date).getDay() === 6) { // 6 é Sábado
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
        date++;
    }
    
    // Preenche os dias vazios no final do mês
    while (row.cells.length < 7) {
        const cell = document.createElement("td");
        cell.classList.add("other-month");
        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}

function goToPrevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function goToNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
}


// ----------------------------------------------------------------------
// --- FUNÇÃO DE CARREGAMENTO DE DETALHES ---
// ----------------------------------------------------------------------

function loadDetalhesOportunidade() {
    const oportId = localStorage.getItem("oportunidadeId");
    const oportunidade = oportunidades.find((op) => op.id == oportId);

    if (!oportunidade) {
        // ... (Mensagem de erro) ...
        if (tituloOportunidadeElement) tituloOportunidadeElement.textContent = "Oportunidade não encontrada";
        if (descricaoOportunidadeElement) descricaoOportunidadeElement.textContent =
            "Desculpe, não conseguimos encontrar os detalhes para esta oportunidade. Verifique se o link está correto ou volte para a página principal.";
        return;
    }

    // --- CÓDIGO DE PREENCHIMENTO DE DETALHES ---
    if (tituloOportunidadeElement) tituloOportunidadeElement.textContent = oportunidade.titulo;
    if (subtituloOportunidadeElement) subtituloOportunidadeElement.textContent = oportunidade.subtitulo;
    if (tipoOportunidadeDet) tipoOportunidadeDet.textContent =
        oportunidade.tipo.charAt(0).toUpperCase() + oportunidade.tipo.slice(1);
    if (areaInteresseDet) areaInteresseDet.textContent =
        oportunidade.area.charAt(0).toUpperCase() + oportunidade.area.slice(1);

    let displayDate = "";
    let dateLabel = "";
    if (oportunidade.dataEvento) {
        displayDate = oportunidade.dataEvento
            ? oportunidade.dataEvento.split("-").reverse().join("/")
            : "Data Indisponível";
        dateLabel = "Data do Evento:";
    } else if (oportunidade.dataLimite) {
        displayDate = oportunidade.dataLimite
            ? oportunidade.dataLimite.split("-").reverse().join("/")
            : "Data Limite:";
        dateLabel = "Data Limite:";
    } else {
        displayDate = "Indefinida";
        dateLabel = "Data:";
    }

    if (dataOportunidadeDet) {
        dataOportunidadeDet.textContent = displayDate;
        const labelElement = dataOportunidadeDet.previousElementSibling;
        if (labelElement) {
            labelElement.textContent = `${dateLabel} `;
        }
    }

    if (publicoAlvoDet) publicoAlvoDet.textContent =
        oportunidade.publico.charAt(0).toUpperCase() +
        oportunidade.publico.slice(1);
    if (descricaoOportunidadeElement) descricaoOportunidadeElement.textContent = oportunidade.descricao;
    

    // --- LÓGICA DO BOTÃO DE INSCRIÇÃO ---
    const statusKey = `inscrito_${oportunidade.id}`;
    const jaInscrito = localStorage.getItem(statusKey) === 'true';

    if (!acoesContainer) {
        console.error("Erro: O contêiner de ações ('acoes-container') não foi encontrado.");
        return;
    }

    if (jaInscrito) {
        // Renderiza o botão "Inscrito" com o botão de retirada
        const novoConteudoHTML = `
            <div class="status-inscricao">
                <span>Inscrito!</span>
                <button id="btn-retirar-inscricao" class="btn-retirar-acao">Retirar Inscrição</button>
            </div>
        `;
        acoesContainer.innerHTML = novoConteudoHTML;

        const btnRetirar = document.getElementById('btn-retirar-inscricao');
        if (btnRetirar) {
            btnRetirar.addEventListener('click', () => handleRetirarInscricaoClick(oportunidade.id, oportunidade));
        }

    } else {
        // Renderiza o botão "Inscreva-se Agora"
        acoesContainer.innerHTML = getBotaoOriginalHTML(oportunidade);

        const novoBotaoInscrever = document.getElementById('btn-inscrever');
        if (novoBotaoInscrever) {
            // Anexa a função de clique
            novoBotaoInscrever.addEventListener('click', (e) => handleInscricaoClick(e, oportunidade));
        }
    }

    // Remove o evento antigo do botão que não será mais usado
    const adicionarCalendarioBtn = document.getElementById("adicionar-calendario");
    if (adicionarCalendarioBtn) {
        adicionarCalendarioBtn.style.display = 'none'; // Esconde ou remove
    }
}

// --- INICIALIZAÇÃO ---

document.addEventListener("DOMContentLoaded", () => {
    // 1. Carrega os detalhes da oportunidade e configura a lógica do botão
    if (tituloOportunidadeElement) {
        loadDetalhesOportunidade();
    }
    
    // 2. Carrega o calendário se os elementos existirem
    if (monthYearElement) {
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
        if (prevMonthBtn) prevMonthBtn.addEventListener("click", goToPrevMonth);
        if (nextMonthBtn) nextMonthBtn.addEventListener("click", goToNextMonth);
    }
});