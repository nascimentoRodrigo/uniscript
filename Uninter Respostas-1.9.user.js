// ==UserScript==
// @name         Uninter Respostas
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  try to take over the world!
// @author       You
// @match        https://univirtus.uninter.com/ava/web/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uninter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const URLS = {
        tutoria: "https://univirtus.uninter.com/ava/web/#/ava/tutoria",
        tutoriaConversa: "https://univirtus.uninter.com/ava/web/#/ava/TutoriaConversa",
        trabalho: "https://univirtus.uninter.com/ava/web/#/ava/PacoteCorrecaoEntregaTrabalho",
        trabalhoAlt: "https://univirtus.uninter.com/ava/web/?#/ava/PacoteCorrecaoEntregaTrabalho",
        solicitacao: "https://univirtus.uninter.com/ava/web/#/ava/solicitacao",
        bancoDeQuestoes: "https://univirtus.uninter.com/ava/web/#/ava/questao",
        videos: "https://univirtus.uninter.com/ava/web/#/ava/roa/"
    };

    const PRAZO = "20/04/2026";

    const CURSOS_LPP = [
        "ENGENHARIA DE SOFTWARE",
        "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS",
        "SISTEMAS DE INFORMAÇÃO",
        "DESENVOLVIMENTO MOBILE",
        "TECNOLOGIA EM JOGOS DIGITAIS"
    ];

    const COLORS = {
        blueDark: "rgb(30, 51, 76)",
        blueNeutral: "rgb(37, 61, 89)",
        blueLight: "rgb(66, 112, 161)",
        gray: "rgb(111, 111, 111)",
        cursoEAD: "background-color:rgb(30,40,50)",
        cursoLPP: "background-color:rgb(30,50,30)",

        base: "rgb(200, 200, 200)",
        extra01: "rgb(200, 100, 100)",
        extra02: "rgb(200, 200, 100)",
        trabalho: "rgb(100, 200, 100)",
        trabalhoPrazo: "rgb(100, 200, 200)",
        trabalhoNota: "rgb(150, 250, 150)",
        prova: "rgb(100, 200, 100)"
    };

    const BUTTON = {
        width: "120px",
        height: "25px",
        heightSmall: "20px"
    };

    const TEXTS = {
        comentarioTutoriaRS: "Olá, xxxAlunoNomexxx!<br>Espero que esteja tudo bem com você.<br><br>Lamento muito pelos seus familiares e lhe desejo força para enfrentar esse momento difícil.<br><br>Sua data já foi colocada automaticamente pelo sistema para 17/07/2024, devido seu endereço cadastrado.<br><br>No que mais precisar, conte comigo.<br><br>Abraço!<br><br>Atenciosamente,<br>Prof. Me. Jadson Almeida.<br>Venha conhecer nossas redes sociais e cursos de extensão: https://lnk.bio/n-cpu",

        comecoComentarioTutoria: "Olá, xxxAlunoNomexxx!<br>Espero que esteja tudo bem com você.",
        meioComentarioTutoria: "<br><br>Disponha.<br><br>",
        fimComentarioTutoria: "Bons estudos!<br>Atenciosamente,<br>Prof. Me. Jadson Almeida.<br>Venha conhecer nossas redes sociais e cursos de extensão: https://lnk.bio/n-cpu",

        comecoComentarioTrabalho: "Olá, xxxAlunoNomexxx!<br>Espero que esteja tudo bem com você.<br><br>Parabéns pela entrega do trabalho!",
        meioComentarioTrabalho: "<br><br>",
        fimComentarioTrabalho: "Bons estudos!<br>Atenciosamente,<br>Prof. Me. Jadson Almeida.",
        comentarioTrabalhoProjetoJogosFinal: "<br><br>Vamos à avaliação:<br><br>1) O vídeo ficou bom, demonstra bem o game.<br><br>2) A programação ficou ótima também. Dado o que foi ensinado nas disciplinas, está excelente.<br><br>3) O GDD também está legal.<br><br>Com um pouco polimento vai ficar legal para portfolio!<br><br>",
        comentarioTrabalhoProjetoJogosParcial: "<br><br>Siga em frente com sua proposta.<br><br>",

        comecoComentarioSolicitacoes: "Olá, xxxRequerentexxx!<br>Espero que esteja tudo bem com você.",
        meioComentarioSolicitacoes: "<br><br>aaaaaaaaaaaaaa<br><br>",
        fimComentarioSolicitacoes: "<br>Atenciosamente,<br>Me. Jadson Almeida.<br>Professor, tutor e coordenador do programa de monitorias dos cursos de TI da Escola Politécnica.",

        meioComentarioPendencia: "<br><br>Não se preocupe, pode ignorar. Ela só vai fechar quando todos os alunos da turma finalizarem as pendências (segunda chamada ou recuperação), o que deve demorar. Você não está devendo nada.<br><br>",
        meioComentarioBomTrabalho: "<br><br>Não posso precisar a nota, porque isso só é feito pelo tutor corretor. Mas me parece muito bom. :)<br><br>",
        meioComentarioResumiuBem: "<br><br>Está ótimo. Você pode (e deve) sim deixar de forma resumida, desde que seja compreensível a proposta.\nLembrando sempre que você deve presumir que o leitor do diagrama leu primeiro os requisitos em texto.<br><br>",
        meioComentarioEstendido: `<br><br>O prazo do seu trabalho foi estendido para ${PRAZO}.<br>Todavia, esse não é o procedimento padrão e provavelmente não será adotado por outros tutores em outras disciplinas.<br><br>`,
        meioComentarioNovaTentativa: `<br><br>O prazo do seu trabalho foi estendido para ${PRAZO} com nova possibilidade de envio.<br>Todavia, esse não é o procedimento padrão e provavelmente não será adotado por outros tutores em outras disciplinas.<br><br>`,
        meioComentarioDeletado: `<br><br>Seu envio foi <b>deletado</b> e você pode reenviar até ${PRAZO}. Se o arquivo for grande você pode hospedar ele em algum drive (onedrive, googledrive etc.) e deixar público o link para download (teste em uma aba anônima do seu navegador) e anexar na entrega esse link (pode ser um arquivo txt).<br><br>Peço que tenha atenção nos próximos envios, pois essa segunda tentativa não é o procedimento padrão e provavelmente não será aceito em outras disciplinas.<br><br>`,
        meioComentarioVaiCorrigir: "<br><br>O trabalho está com o tutor corretor. A quantidade esse ciclo acabou ficando em demasia porque temos muitos alunos nessa disciplina (juntando as diferentes turmas dessa mesma disciplina).<br>Mas se houver necessidade de nota e que não houve tempo hábil para realizar a prova exame, me consulte aqui na tutoria para estendermos o prazo de qualquer prova de exame ou recuperação. <br>Confirmo que recebemos seu trabalho e não haverá prejuízo quanto às datas.<br><br>",
        meioComentarioAbaTrabalho: "<br><br>Por gentileza enviar na aba de trabalhos, pois fora dali o sistema não permite lançamento de nota.<br><br>",
        meioComentarioAjusteNota: "<br><br>Acredito que o tutor corretor não conseguiu encontrar os comandos do jogo. Reavaliei seu trabalho e solicitei o ajuste da sua nota para nota 100.<br>Deve ocorrer o ajuste nos próximos dias.<br>Obrigado pela paciência.<br><br>",
        meioComentarioEstender: "<br><br>Você pode tentar estender o prazo através do \"Atendimento Online\" no menu do AVA.<br><br>",
        meioComentarioNaoCabe: "<br><br>Apenas tente manter a resposta dentro do espaço que já está reservado no caderno.<br>Se for inevitável que algum diagrama ocupe maior espaço, você escreve no espaço \"diagrama no fim do arquivo\" e cole o diagrama no fim do arquivo.<br><br>",
        meioComentarioErroApol: "<br><br>Você deve efetuar a entrega da avaliação clicando no botão, então vai liberar as próximas tentativas.<br>Adicionei +1 tentativa para você.<br><br>",
        meioComentarioPqDaNota: "<br><br>Como toda avaliação, há critérios objetivos e subjetivos.<br>A nota 70 é a nota básica do requisitos atingidos (critério objetivo), acima de 70 são pelo polimento do projeto, que consideram atributos qualitativos (subjetivos).<br><br>",
        meioComentarioAtendimento: "<br><br>Por gentileza, entre em contato com o \"Atendimento Online\" aqui no AVA para verificar seu caso.<br><br>"
    };

    function logError(contexto, erro) {
        console.log(`${contexto}:`, erro);
    }

    function schedule(fn, delay) {
        setTimeout(fn, delay);
    }

    function startPolling(fn, interval) {
        const loop = () => {
            try {
                fn();
            } catch (erro) {
                logError(`Erro em polling de ${fn.name}`, erro);
            } finally {
                schedule(loop, interval);
            }
        };
        schedule(loop, interval);
    }

    function isCurrentUrl(...urls) {
        return urls.some(url => document.URL.startsWith(url));
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function getByClass(className, root = document) {
        return root.getElementsByClassName(className);
    }

    function query(selector, root = document) {
        return root.querySelector(selector);
    }

    function queryAll(selector, root = document) {
        return Array.from(root.querySelectorAll(selector));
    }

    function capitalizeFirst(texto) {
        if (!texto) return "";
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    function getFirstName(texto) {
        if (!texto) return "";
        const primeiroNome = texto.trim().split(/\s+/)[0].toLowerCase();
        return capitalizeFirst(primeiroNome);
    }

    function createButton({
        parent,
        id,
        text,
        onClick,
        backgroundColor,
        width = BUTTON.width,
        height = BUTTON.height
    }) {
        if (!parent) return null;

        const button = document.createElement("button");
        button.id = id;
        button.style.width = width;
        button.style.height = height;
        if (backgroundColor) {
            button.style.backgroundColor = backgroundColor;
        }
        button.innerHTML = text;
        button.addEventListener("click", onClick);
        parent.appendChild(button);
        return button;
    }

    function safeRetry(fn, delay = 1000, context = "Operação") {
        schedule(() => {
            try {
                fn();
            } catch (erro) {
                logError(`${context} falhou novamente`, erro);
            }
        }, delay);
    }

    function getEditorIframeContainer() {
        return query(".mce-edit-area.mce-container.mce-panel.mce-stack-layout-item");
    }

    function getEditorDocument() {
        const iframe = getEditorIframeContainer()?.querySelector("iframe");
        return iframe?.contentWindow?.document || iframe?.contentDocument || null;
    }

    function getEditorContentElement() {
        const doc = getEditorDocument();
        if (!doc) return null;

        return (
            doc.querySelector(".prokeys-snippet-text") ||
            doc.getElementById("tinymce") ||
            doc.body
        );
    }

    function setEditorHtml(html) {
        const editor = getEditorContentElement();
        if (!editor) return false;

        editor.innerHTML = html;
        return true;
    }

    function getEditorText() {
        const editor = getEditorContentElement();
        return editor?.innerText?.trim() || "";
    }

    function focusEditor() {
        try {
            const body = getEditorDocument()?.body;
            if (body) {
                body.focus();
                body.click();
                return;
            }

            const fallback = getEditorIframeContainer();
            if (fallback) {
                fallback.focus?.();
                fallback.click?.();
            }
        } catch (erro) {
            logError("Erro ao focar editor", erro);
        }
    }

    function setIframeHeightById(iframeId, height) {
        try {
            const iframe = getById(iframeId);
            if (iframe) {
                iframe.style.height = height;
            }
        } catch (erro) {
            logError(`Não conseguiu ajustar ${iframeId}`, erro);
        }
    }

    function setEditorContainerHeight(height) {
        try {
            const container = getEditorIframeContainer();
            const iframe = container?.children?.[0];
            if (iframe) {
                iframe.style.height = height;
            }
        } catch (erro) {
            logError("Não conseguiu o SetTextAreaSizeTrabalho", erro);
        }
    }

    function setTextAreaSizeTutoria() {
        setIframeHeightById("texto_ifr", "200px");
    }

    function setTextAreaSizeTrabalho() {
        setEditorContainerHeight("400px");
    }

    function setTextAreaSizeSolicitacoes() {
        setIframeHeightById("descricao_ifr", "300px");
    }

    function setDarkMode(elemento) {
        if (!elemento) return;
        elemento.style.color = "white";
        elemento.style.backgroundColor = COLORS.blueDark;
    }

    function setWordElementStyle(element) {
        if (!element?.children) return;
        Array.from(element.children).forEach(child => {
            child.style.color = "white";
            child.style.backgroundColor = "rgb(0, 0, 0)";
        });
    }

    function setupDarkModeTheme() {
        if (isCurrentUrl(URLS.videos)) {
            return;
        }

        try {
            const divTutoria = getById("divTutoria");
            const midContentHolder = getById("midContentHolder");
            const questoes = query(".question-choice.question-choice-active");
            const allDivs = queryAll("div");
            const allButtons = queryAll("button");

            if (divTutoria) {
                setDarkMode(divTutoria);
                allButtons.forEach(button => {
                    button.style.color = "white";
                    button.style.backgroundColor = COLORS.gray;
                });
            }

            if (midContentHolder) {
                setDarkMode(midContentHolder);
            }

            if (questoes) {
                setDarkMode(questoes);
            }

            allDivs.forEach(div => {
                div.style.color = "white";
                div.style.backgroundColor = COLORS.blueDark;
            });

            setWordElementStyle(getById("mceu_68-body"));
            setWordElementStyle(getById("mceu_69-body"));
            setWordElementStyle(getById("mceu_70-body"));
            setWordElementStyle(getById("mceu_71-body"));
        } catch (erro) {
            logError("Erro em setupDarkModeTheme", erro);
        }
    }

    function getAlunoNome() {
        const texto = getByClass("conversa-text-aluno")[0]?.textContent || "";
        return getFirstName(texto);
    }

    function getAlunoNomeTrabalho() {
        const texto = getByClass("usuarioGrupo")[0]?.innerText || "";
        return getFirstName(texto);
    }

    function getRequerenteNome() {
        const textoCompleto = getByClass("panel-heading")[1]?.children?.[0]?.textContent || "";
        const textoLimpo = textoCompleto.replace("Postado por:", "").trim();
        return getFirstName(textoLimpo);
    }

    function responderTutoria(resposta) {
        try {
            const html =
                TEXTS.comecoComentarioTutoria.replaceAll("xxxAlunoNomexxx", getAlunoNome()) +
                resposta +
                TEXTS.fimComentarioTutoria;

            setEditorHtml(html);
        } catch (erro) {
            logError("Erro em responderTutoria", erro);
        }

        setTextAreaSizeTutoria();

        try {
            getByClass("form-control inputTinyMCE")[0]?.focus();
            getById("blockContainer")?.focus();
        } catch (erro) {
            logError("Erro ao corrigir foco da tutoria", erro);
        }
    }

    function setTextoRespostaTutoria() {
        responderTutoria(TEXTS.meioComentarioTutoria);
    }

    function setTextoRespostaPendencia() {
        responderTutoria(TEXTS.meioComentarioPendencia);
    }

    function setTextoRespostaAtendimentoOnline() {
        responderTutoria(TEXTS.meioComentarioAtendimento);
    }

    function setTextoRespostaBomTrabalho() {
        responderTutoria(TEXTS.meioComentarioBomTrabalho);
    }

    function setTextoRespostaResumiuBem() {
        responderTutoria(TEXTS.meioComentarioResumiuBem);
    }

    function setTextoRespostaPrazoEstendido() {
        responderTutoria(TEXTS.meioComentarioEstendido);
    }

    function setTextoRespostaDeletadoReenviar() {
        responderTutoria(TEXTS.meioComentarioDeletado);
    }

    function setTextoRespostaNovaTentativa() {
        responderTutoria(TEXTS.meioComentarioNovaTentativa);
    }

    function setTextoRespostaVaiCorrigir() {
        responderTutoria(TEXTS.meioComentarioVaiCorrigir);
    }

    function setTextoRespostaAbaTrabalho() {
        responderTutoria(TEXTS.meioComentarioAbaTrabalho);
    }

    function setTextoRespostaEstender() {
        responderTutoria(TEXTS.meioComentarioEstender);
    }

    function setTextoRespostaNaoCabe() {
        responderTutoria(TEXTS.meioComentarioNaoCabe);
    }

    function setTextoRespostaErroApol() {
        responderTutoria(TEXTS.meioComentarioErroApol);
    }

    function setTextoRespostaPqDaNota() {
        responderTutoria(TEXTS.meioComentarioPqDaNota);
    }

    function setTextoRespostaTrabalho() {
        console.log("setTextoRespostaTrabalho chegou");

        try {
            const disciplina = getByClass("panel-heading")[1]?.innerText || "";
            const tipoDeEntrega = getByClass("table table-responsive")[0]?.innerText || "";

            let meioComentario = TEXTS.meioComentarioTrabalho;

            const ehDisciplinaJogos =
                disciplina.toLowerCase().includes("desenvolvimento de jogos") ||
                disciplina.toLowerCase().includes("projeto multidisciplinar para jogos");

            if (ehDisciplinaJogos) {
                meioComentario = tipoDeEntrega.toLowerCase().includes("entrega final")
                    ? TEXTS.comentarioTrabalhoProjetoJogosFinal
                    : TEXTS.comentarioTrabalhoProjetoJogosParcial;
            }

            const html =
                TEXTS.comecoComentarioTrabalho.replaceAll("xxxAlunoNomexxx", getAlunoNomeTrabalho()) +
                meioComentario +
                TEXTS.fimComentarioTrabalho;

            setEditorHtml(html);
        } catch (erro) {
            logError("SetTextoRespostaTrabalho deu ruim", erro);
        }

        setTextAreaSizeTrabalho();
        focusEditor();
    }

    function setTextoRespostaSolicitacoes() {
        console.log("setTextoRespostaSolicitacoes()");

        try {
            const html =
                TEXTS.comecoComentarioSolicitacoes.replaceAll("xxxRequerentexxx", getRequerenteNome()) +
                TEXTS.meioComentarioSolicitacoes +
                TEXTS.fimComentarioSolicitacoes;

            setEditorHtml(html);
        } catch (erro) {
            logError("Erro no setTextoRespostaSolicitacoes", erro);
        }

        try {
            setTextAreaSizeSolicitacoes();
        } catch (erro) {
            safeRetry(setTextAreaSizeSolicitacoes, 2000, "SetTextAreaSizeSolicitacoes");
        }

        try {
            getByClass("form-control inputTinyMCE")[0]?.focus();
            getByClass("post-box-inner liPostagem")[0]?.focus();
        } catch (erro) {
            logError("Erro ao corrigir foco das solicitações", erro);
        }
    }

    function trabalhoAnterior() {
        try {
            getByClass("btn btn-default btnNavegacao btnAcao")[0]?.click();
        } catch (erro) {
            console.log("ERRO em trabalhoAnterior. Tentando novamente...");
            safeRetry(trabalhoAnterior, 1000, "trabalhoAnterior");
        }
    }

    function trabalhoProximo() {
        try {
            getByClass("btn btn-default btnNavegacao btnAcao")[1]?.click();
        } catch (erro) {
            console.log("ERRO em trabalhoProximo. Tentando novamente...");
            safeRetry(trabalhoProximo, 1000, "trabalhoProximo");
        }
    }

    function trabalhoCopiarRU() {
        try {
            const nomeComRU = getByClass("usuarioGrupo")[0]?.children?.[0]?.innerHTML || "";
            const alunoRU = nomeComRU
                .substring(nomeComRU.indexOf("(RU:") + 4)
                .replace(":", "")
                .replace(")", "")
                .trim();

            navigator.clipboard.writeText(alunoRU);
        } catch (erro) {
            console.log("ERRO em trabalhoCopiarRU. Tentando novamente...");
            safeRetry(trabalhoCopiarRU, 1000, "trabalhoCopiarRU");
        }
    }

    function getCamposDeNota() {
        return Array.from(getByClass("form-control text-right respostaCorrecaoTrabalho"));
    }

    function trabalho100() {
        try {
            const listaCamposDeNota = getCamposDeNota();

            if (listaCamposDeNota.length > 0) {
                trabalho100SetNota(0);
            } else {
                safeRetry(trabalho100, 1000, "trabalho100");
            }
        } catch (erro) {
            console.log("ERRO em trabalho100. Tentando novamente...");
            safeRetry(trabalho100, 1000, "trabalho100");
        }
    }

    function trabalho100SetNota(indice = 0) {
        try {
            const listaCamposDeNota = getCamposDeNota();
            console.log("trabalho100SetNota, indice =", indice);

            if (!listaCamposDeNota.length) {
                safeRetry(() => trabalho100SetNota(indice), 500, "trabalho100SetNota");
                return;
            }

            if (indice >= listaCamposDeNota.length) {
                console.log("trabalho100SetNota finalizado.");
                schedule(() => trabalhoClickNoTexto(false), 1000);
                return;
            }

            const campoNota = listaCamposDeNota[indice];
            if (campoNota) {
                campoNota.value = 100;
                campoNota.focus();
                campoNota.click();
            }

            schedule(() => trabalho100SetNota(indice + 1), 500);
        } catch (erro) {
            console.log("ERRO em trabalho100SetNota. Tentando novamente...");
            safeRetry(() => trabalho100SetNota(indice), 500, "trabalho100SetNota");
        }
    }

    function getTrabalhoIndexInfo() {
        const textoQuantidades = getByClass("col-md-4 text-right")[0]?.children?.[0]?.innerText || "";
        const numeros = textoQuantidades.match(/\d+/g) || [];

        if (numeros.length < 2) {
            return null;
        }

        return {
            indexAtual: Number(numeros[0]),
            quantidadeMaxima: Number(numeros[1])
        };
    }

    function trabalhoChecarNota100(proximoX1) {
        const labelNota = getByClass("notaIndividual");

        if (labelNota?.[0]?.innerHTML === "100") {
            try {
                const info = getTrabalhoIndexInfo();
                if (!info) {
                    throw new Error("Não foi possível ler os índices do trabalho.");
                }

                if (info.indexAtual < info.quantidadeMaxima) {
                    trabalhoProximo();

                    if (!proximoX1) {
                        console.log("trabalhoChecarNota100, não é proximoX1. Next trabalho100 in 4000...");
                        schedule(trabalho100, 4000);
                    }
                }
            } catch (erro) {
                console.log("ERRO em trabalhoChecarNota100. Tentando novamente...");
                safeRetry(() => trabalhoChecarNota100(proximoX1), 1000, "trabalhoChecarNota100");
            }
        } else {
            console.log("labelNota não encontrada em trabalhoChecarNota100. Tentando novamente...");
            safeRetry(() => trabalhoChecarNota100(proximoX1), 1000, "trabalhoChecarNota100");
        }
    }

    function trabalhoClickNoTexto(so1vez) {
        try {
            const body = getEditorDocument()?.body;

            if (body) {
                body.focus();
                body.click();
            } else {
                safeRetry(() => trabalhoClickNoTexto(so1vez), 1000, "trabalhoClickNoTexto");
                return;
            }

            schedule(() => trabalhoChecarNota100(so1vez), 1000);
        } catch (erro) {
            console.log("ERRO em trabalhoClickNoTexto. Tentando novamente...");
            safeRetry(() => trabalhoClickNoTexto(so1vez), 1000, "trabalhoClickNoTexto");
        }
    }

    function trabalho100so1() {
        try {
            const campoNota = getByClass("un-input-xxs")[0]?.children?.[0];
            if (!campoNota) {
                throw new Error("Campo de nota não encontrado.");
            }

            campoNota.value = 100;
            campoNota.focus();
            campoNota.click();

            schedule(() => trabalhoClickNoTexto(true), 1000);
        } catch (erro) {
            console.log("ERRO em trabalho100so1. Tentando novamente...");
            safeRetry(trabalho100so1, 1000, "trabalho100so1");
        }
    }

    function checkSolicitacoes() {
        const solicitacoes = getById("idTotalSolicitacoes");

        if (solicitacoes?.innerHTML != null) {
            try {
                if (Number(solicitacoes.innerHTML) > 0) {
                    solicitacoes.style.color = "red";
                    solicitacoes.style.fontWeight = "bold";
                    solicitacoes.style.fontSize = "20px";
                }
            } catch (erro) {
                logError("erro em checkSolicitacoes", erro);
            }
        }
    }

    function setupTutoriaSelectionTheme() {
        if (!isCurrentUrl(URLS.tutoria)) {
            return;
        }

        try {
            const listaCursoTutorias = getByClass("gridColunaoferta col-md-2");
            Array.from(listaCursoTutorias).forEach(curso => {
                const paragraph = curso.getElementsByTagName("p")[0];
                if (!paragraph) return;

                if (curso.innerText.includes(" - EAD")) {
                    paragraph.style = COLORS.cursoEAD;
                }

                const isLPP =
                    CURSOS_LPP.some(lpp => curso.innerText.includes(lpp)) ||
                    curso.innerText.includes("Linguagem de Programação Aplicada");

                if (isLPP) {
                    paragraph.style = COLORS.cursoLPP;
                }
            });
        } catch (erro) {
            logError("erro em setupTutoriaSelectionTheme", erro);
        }
    }

    function setupResponderTutoria() {
        if (!isCurrentUrl(URLS.tutoriaConversa)) {
            return;
        }

        const divCard = getByClass("card4");
        if (!divCard?.[0]) {
            return;
        }

        if (getById("ButtonGetAlunoNomeTutoria")) {
            return;
        }

        const divResposta = document.createElement("div");
        divResposta.style.display = "flex";
        divResposta.style.flexWrap = "wrap";
        divResposta.style.width = "980px";
        divResposta.style.gap = "15px";
        divResposta.style.itemsAlign = "left";
        divCard[0].appendChild(divResposta);

        const botoes = [
            { id: "ButtonGetAlunoNomeTutoria", text: "Resposta Base", color: COLORS.base, onClick: setTextoRespostaTutoria },
            { id: "ButtonRespostaPendencia", text: "Pendencia", color: COLORS.extra01, onClick: setTextoRespostaPendencia },
            { id: "ButtonRespostaAtendimentoOnline", text: "Atendimento", color: COLORS.extra01, onClick: setTextoRespostaAtendimentoOnline },
            { id: "ButtonRespostaResumiuBem", text: "Resumiu Bem", color: COLORS.extra02, onClick: setTextoRespostaResumiuBem },
            { id: "ButtonRespostaPrazoEstendido", text: "+ Prazo", color: COLORS.trabalhoPrazo, onClick: setTextoRespostaPrazoEstendido },
            { id: "ButtonRespostaDeletadoReenviar", text: "Deletado Reenviar", color: COLORS.trabalhoPrazo, onClick: setTextoRespostaDeletadoReenviar },
            { id: "ButtonRespostaNovaTentativa", text: "+1 Tentativa", color: COLORS.trabalhoPrazo, onClick: setTextoRespostaNovaTentativa },
            { id: "ButtonRespostaBomTrabalho", text: "Bom Trabalho", color: COLORS.trabalho, onClick: setTextoRespostaBomTrabalho },
            { id: "ButtonRespostaVaiCorrigir", text: "Qdo corrigem?", color: COLORS.trabalho, onClick: setTextoRespostaVaiCorrigir },
            { id: "ButtonRespostaAbaTrabalho", text: "Aba Trabalho", color: COLORS.trabalho, onClick: setTextoRespostaAbaTrabalho },
            { id: "ButtonRespostaNaoCabe", text: "Não Cabe", color: COLORS.trabalho, onClick: setTextoRespostaNaoCabe },
            { id: "ButtonRespostaErroApol", text: "Erro Apol", color: COLORS.prova, onClick: setTextoRespostaErroApol },
            { id: "ButtonPqDaNota", text: "Pq da Nota", color: COLORS.trabalhoNota, onClick: setTextoRespostaPqDaNota },
            { id: "ButtonRespostaAjusteNota", text: "Ajustar Nota", color: COLORS.trabalhoNota, onClick: () => responderTutoria(TEXTS.meioComentarioAjusteNota) }
        ];

        botoes.forEach(config => createButton({
            parent: divResposta,
            id: config.id,
            text: config.text,
            onClick: config.onClick,
            backgroundColor: config.color
        }));

        getById("ButtonGetAlunoNomeTutoria")?.click();
    }

    function setupCorrigirTrabalho() {
        if (!isCurrentUrl(URLS.trabalho, URLS.trabalhoAlt)) {
            return;
        }

        const divResposta = getById("divEntrega");
        if (!divResposta) {
            return;
        }

        if (getById("ButtonGetAlunoNomeTrabalho")) {
            return;
        }

        createButton({
            parent: divResposta,
            id: "ButtonGetAlunoNomeTrabalho",
            text: "Resposta Base",
            onClick: setTextoRespostaTrabalho,
            width: BUTTON.width,
            height: BUTTON.heightSmall
        });

        createButton({
            parent: divResposta,
            id: "ButtonAnterior",
            text: "Anterior",
            onClick: trabalhoAnterior,
            width: BUTTON.width,
            height: BUTTON.heightSmall
        });

        createButton({
            parent: divResposta,
            id: "ButtonProximo",
            text: "Proximo",
            onClick: trabalhoProximo,
            width: BUTTON.width,
            height: BUTTON.heightSmall
        });

        createButton({
            parent: divResposta,
            id: "ButtonCopiarRU",
            text: "Copiar RU",
            onClick: trabalhoCopiarRU,
            width: BUTTON.width,
            height: BUTTON.heightSmall
        });

        createButton({
            parent: divResposta,
            id: "ButtonNota100Proximo",
            text: "Nota 100 Prox",
            onClick: trabalho100,
            width: BUTTON.width,
            height: BUTTON.heightSmall
        });

        createButton({
            parent: divResposta,
            id: "ButtonNota100Proximo1vez",
            text: "Nota 100 Prox 1x",
            onClick: trabalho100so1,
            width: BUTTON.width,
            height: BUTTON.heightSmall
        });

        try {
            if (getEditorText().length === 0) {
                getById("ButtonGetAlunoNomeTrabalho")?.click();
            } else {
                setTextAreaSizeTrabalho();
            }

            focusEditor();
        } catch (erro) {
            logError("setupCorrigirTrabalho não conseguiu testar se o texto estava empty", erro);
        }
    }

    function setupResponderSolicitacoes() {
        if (!isCurrentUrl(URLS.solicitacao)) {
            return;
        }

        const divResposta = getById("divDescricao");
        if (!divResposta) {
            return;
        }

        if (getById("ButtonGetRequerenteNome")) {
            return;
        }

        createButton({
            parent: divResposta,
            id: "ButtonGetRequerenteNome",
            text: "Resposta Base",
            onClick: setTextoRespostaSolicitacoes,
            width: BUTTON.width,
            height: BUTTON.heightSmall
        });

        getById("ButtonGetRequerenteNome")?.click();
    }

    function setupCadastrarQuestao() {
        if (!isCurrentUrl(URLS.bancoDeQuestoes)) {
            return;
        }

        const divResposta = getByClass("un-input-lg post-box-write-message");
        if (!divResposta?.[0]) {
            return;
        }

        if (!divResposta[0].innerText.includes("BANCO DE QUESTÃO") && !divResposta[0].innerText.includes("NOVA QUESTÃO")) {
            return;
        }

        if (getById("ButtonGetAlunoNomeQuestao")) {
            return;
        }

        createButton({
            parent: divResposta[0],
            id: "ButtonGetAlunoNomeQuestao",
            text: "Resposta Base",
            onClick: setTextoRespostaTrabalho,
            width: BUTTON.width,
            height: BUTTON.heightSmall
        });

        getById("ButtonGetAlunoNomeQuestao")?.click();
    }

    try {
        schedule(checkSolicitacoes, 3000);

        startPolling(setupResponderTutoria, 3000);
        startPolling(setupCorrigirTrabalho, 3000);
        startPolling(setupResponderSolicitacoes, 3000);
        startPolling(setupCadastrarQuestao, 3000);
        startPolling(setupTutoriaSelectionTheme, 1000);

        // startPolling(setupDarkModeTheme, 2000);
        startPolling(checkSolicitacoes, 10000);
    } catch (erro) {
        logError("erro no primeiro setup do codigo", erro);
    }
})();