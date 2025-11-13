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
const acoesContainer = document.getElementById('acoes-container');

// ----------------------------------------------------------------------
// --- FUNÇÕES DE CONTROLE (BOTÃO DE INSCRIÇÃO E CALENDÁRIO) ---
// ----------------------------------------------------------------------

function formatarParaCalendar(dataStr, horarioStr = '08:00') {
    if (!dataStr) return '';
    const dataFormatada = dataStr.replace(/-/g, '');
    const [horas, minutos] = horarioStr.split(':');
    const horarioFormatado = `${horas}${minutos}00`;
    return `${dataFormatada}T${horarioFormatado}`;
}

function getBotaoOriginalHTML(oportunidade) {
    const iconeClass = (oportunidade.dataEvento) 
        ? "fas fa-calendar-check" 
        : "fas fa-external-link-alt";
    const classeAcao = (oportunidade.dataEvento) 
        ? "secondary" : "primary";
    return `
        <button id="btn-inscrever" class="btn-acao ${classeAcao}" data-link="${oportunidade.linkExterno || '#'}">
            Inscreva-se Agora <i class="${iconeClass}"></i>
        </button>
    `;
}

function handleRetirarInscricaoClick(oportunidadeId, oportunidade) {
    if (!acoesContainer) return;
    const statusKey = `inscrito_${oportunidadeId}`;
    localStorage.removeItem(statusKey);
    acoesContainer.innerHTML = getBotaoOriginalHTML(oportunidade);
    const novoBotaoInscrever = document.getElementById('btn-inscrever');
    if (novoBotaoInscrever) {
        novoBotaoInscrever.addEventListener('click', (e) => handleInscricaoClick(e, oportunidade));
    }
}

function handleInscricaoClick(event, oportunidade) {
    event.preventDefault();
    const statusKey = `inscrito_${oportunidade.id}`;
    
    if (oportunidade.dataEvento) {
        const horario = oportunidade.horarioEvento || '08:00';
        const dataHoraInicio = formatarParaCalendar(oportunidade.dataEvento, horario);
        const datesParameter = `${dataHoraInicio}/${dataHoraInicio}`; 
        const tituloEvento = `Lembrete: ${oportunidade.titulo}`;
        const detalhesEvento = `Você se inscreveu em "${oportunidade.titulo}". Descrição: ${oportunidade.descricao}`;
        const URL_CALENDARIO = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(tituloEvento)}&dates=${datesParameter}&details=${encodeURIComponent(detalhesEvento)}&sf=true&output=xml`;
        localStorage.setItem(statusKey, 'true');
        window.open(URL_CALENDARIO, '_blank');
    } else {
        const link = event.currentTarget.dataset.link || '#';
        if (link && link !== '#') {
            window.open(link, '_blank');
        } else {
             alert(`Inscrição para ${oportunidade.titulo} confirmada! (Link Externo não disponível)`);
        }
        localStorage.setItem(statusKey, 'true');
    }
    
    const novoConteudoHTML = `
        <div class="status-inscricao">
            <span>Inscrito!</span>
            <button id="btn-retirar-inscricao" class="btn-retirar-acao">Retirar Inscrição</button>
        </div>
    `;

    if (acoesContainer) {
        acoesContainer.innerHTML = novoConteudoHTML;
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

        const oportEsp = oportunidades.find((op) => {
            return (op.dataEvento && op.dataEvento === cell.dataset.date) || 
                   (op.dataLimite && op.dataLimite === cell.dataset.date);
        });

        const selectedId = localStorage.getItem("oportunidadeId");

        if (oportEsp) {
            cell.classList.add("event-day");
            cell.title = `${oportEsp.titulo} - ${oportEsp.subtitulo}`;

            if (oportEsp.id == selectedId) {
                cell.classList.add("selected-day");
            }

            // 🔄 Corrigido: muda detalhes e destaca dia SEM recarregar a página
            cell.addEventListener("click", () => {
                localStorage.setItem("oportunidadeId", oportEsp.id);
                renderCalendar(year, month); // Atualiza o destaque no calendário
                loadDetalhesOportunidade();  // Atualiza os detalhes
            });
        }

        row.appendChild(cell);

        if (new Date(year, month, date).getDay() === 6) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
        date++;
    }

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
        if (tituloOportunidadeElement) tituloOportunidadeElement.textContent = "Oportunidade não encontrada";
        if (descricaoOportunidadeElement) descricaoOportunidadeElement.textContent =
            "Desculpe, não conseguimos encontrar os detalhes para esta oportunidade.";
        return;
    }

    if (tituloOportunidadeElement) tituloOportunidadeElement.textContent = oportunidade.titulo;
    if (subtituloOportunidadeElement) subtituloOportunidadeElement.textContent = oportunidade.subtitulo;
    if (tipoOportunidadeDet) tipoOportunidadeDet.textContent =
        oportunidade.tipo.charAt(0).toUpperCase() + oportunidade.tipo.slice(1);
    if (areaInteresseDet) areaInteresseDet.textContent =
        oportunidade.area.charAt(0).toUpperCase() + oportunidade.area.slice(1);

    let displayDate = "";
    let dateLabel = "";
    if (oportunidade.dataEvento) {
        displayDate = oportunidade.dataEvento.split("-").reverse().join("/");
        dateLabel = "Data do Evento:";
    } else if (oportunidade.dataLimite) {
        displayDate = oportunidade.dataLimite.split("-").reverse().join("/");
        dateLabel = "Data Limite:";
    } else {
        displayDate = "Indefinida";
        dateLabel = "Data:";
    }

    if (dataOportunidadeDet) {
        dataOportunidadeDet.textContent = displayDate;
        const labelElement = dataOportunidadeDet.previousElementSibling;
        if (labelElement) labelElement.textContent = `${dateLabel} `;
    }

    if (publicoAlvoDet) publicoAlvoDet.textContent =
        oportunidade.publico.charAt(0).toUpperCase() + oportunidade.publico.slice(1);
    if (descricaoOportunidadeElement) descricaoOportunidadeElement.textContent = oportunidade.descricao;

    const statusKey = `inscrito_${oportunidade.id}`;
    const jaInscrito = localStorage.getItem(statusKey) === 'true';

    if (!acoesContainer) return;

    if (jaInscrito) {
        acoesContainer.innerHTML = `
            <div class="status-inscricao">
                <span>Inscrito!</span>
                <button id="btn-retirar-inscricao" class="btn-retirar-acao">Retirar Inscrição</button>
            </div>
        `;
        const btnRetirar = document.getElementById('btn-retirar-inscricao');
        if (btnRetirar) {
            btnRetirar.addEventListener('click', () => handleRetirarInscricaoClick(oportunidade.id, oportunidade));
        }
    } else {
        acoesContainer.innerHTML = getBotaoOriginalHTML(oportunidade);
        const novoBotaoInscrever = document.getElementById('btn-inscrever');
        if (novoBotaoInscrever) {
            novoBotaoInscrever.addEventListener('click', (e) => handleInscricaoClick(e, oportunidade));
        }
    }
}

// --- INICIALIZAÇÃO ---

document.addEventListener("DOMContentLoaded", () => {
    if (tituloOportunidadeElement) loadDetalhesOportunidade();
    if (monthYearElement) {
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
        if (prevMonthBtn) prevMonthBtn.addEventListener("click", goToPrevMonth);
        if (nextMonthBtn) nextMonthBtn.addEventListener("click", goToNextMonth);
    }
});
