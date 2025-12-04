# 🚀 Portal de Oportunidades

> **Cultura, Esporte e Cidadania**

O **Portal de Oportunidades** é uma aplicação web Front-end desenvolvida para conectar a comunidade — com foco especial em jovens e estudantes — a eventos de enriquecimento cultural, concursos artísticos, atividades esportivas e workshops educacionais.

A missão do projeto é combater o isolamento e o consumo passivo de tecnologia, centralizando oportunidades que promovam o desenvolvimento pessoal e a socialização.

---

## 📸 Visão Geral do Projeto

O sistema oferece uma experiência completa de usuário, simulando uma aplicação real através do uso inteligente de **JavaScript** e **Local Storage**. O design é moderno, responsivo e focado na usabilidade.

### 🌟 Funcionalidades Principais

* **🔐 Autenticação Completa:**
    * Login e Cadastro de novos usuários.
    * Recuperação de senha simulada.
    * Validação de formulários e proteção de rotas (redirecionamento se não estiver logado).
* **📅 Dashboard de Eventos:**
    * Listagem de oportunidades em *cards* visuais.
    * **Sistema de Filtragem:** Abas interativas para filtrar por categorias (Concursos, Palestras, Editais, Outros).
* **🔍 Detalhes da Oportunidade:**
    * Página exclusiva para cada evento com descrição completa.
    * **Calendário Interativo:** Renderização dinâmica dos dias do mês, destacando a data do evento.
    * **Sistema de Inscrição:** Botão de inscrição que muda de estado (Inscrito/Retirar Inscrição) e verifica se o prazo expirou.
* **👤 Perfil do Usuário:**
    * Edição de dados pessoais (Nome, Telefone, Localização).
    * **Upload de Foto:** Permite carregar e salvar uma foto de perfil (persistida via Base64 no Local Storage).
* **📞 Contato:**
    * Formulário de contato funcional com feedback visual de sucesso/erro.
* **📱 Design Responsivo:**
    * Layout adaptável para Desktops, Tablets e Dispositivos Móveis.
    * Menu de navegação otimizado e elementos flexíveis.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias nativas da Web, sem dependência de frameworks pesados, garantindo leveza e performance.

* **HTML5:** Estrutura semântica e acessível.
* **CSS3:**
    * Layouts modernos com **Flexbox** e **CSS Grid**.
    * Design Responsivo (`@media queries`).
    * Animações e Transições suaves (hover effects, transformações).
    * Variáveis de cores para consistência visual.
* **JavaScript (Vanilla ES6+):**
    * Manipulação do DOM.
    * Lógica de Calendarização.
    * **LocalStorage:** Utilizado para simular um Banco de Dados (salvar usuários, sessões de login, inscrições em eventos e fotos de perfil).
* **Bibliotecas de Ícones:** Font Awesome e Material Icons.

---

## 📂 Estrutura de Arquivos

```text
Portal-Oportunidades/
│
├── css/                  # Estilização modularizada por página
│   ├── conta.css
│   ├── contato.css
│   ├── dash.css
│   ├── detalhes.css
│   ├── login.css
│   ├── registro.css
│   ├── senha.css
│   ├── sobre.css
│   └── style.css         # Estilos globais/landing page
│
├── images/               # Ativos de imagem
│   ├── icons/            # Ícones de categoria (svg/png)
│   └── image/            # Logotipos e avatares padrão
│
├── js/                   # Lógica da aplicação
│   ├── conta.js          # Gerenciamento de perfil e upload de foto
│   ├── contato.js        # Lógica do formulário de contato
│   ├── dados.js          # "Banco de dados" JSON estático dos eventos
│   ├── detalhes.js       # Lógica do calendário e inscrição
│   ├── login.js          # Autenticação
│   ├── registro.js       # Criação de conta
│   ├── script.js         # Scripts gerais e filtros da dashboard
│   └── senha.js          # Redefinição de senha
│
├── conta.html            # Página de Configurações da Conta
├── contato.html          # Página de Contato
├── dash.html             # Dashboard (Área logada)
├── detalhes.html         # Detalhes do Evento
├── index.html            # Landing Page / Tela Inicial
├── login.html            # Tela de Login
├── registro.html         # Tela de Cadastro
├── senha.html            # Tela de Recuperação de Senha
├── sobre.html            # Página "Sobre Nós"
└── README.md             # Documentação do projeto
