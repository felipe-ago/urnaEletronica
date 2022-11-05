//Variáveis de Controle de Interface
let seuVotoPara = document.querySelector('.divisao1-esq-1 span');
let cargo = document.querySelector('.divisao1-esq-2 span');
let descricao = document.querySelector('.divisao1-esq-4');
let aviso = document.querySelector('.divisao-2');
let mostraCandidatos = document.querySelector('.divisao1-dir');
let numeros = document.querySelector('.divisao1-esq-3');

//Variáveis de Controle de Ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

//Funções para funcionalidade da urna
function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for (i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        }
        numeroHTML += '<div class="numero"></div>';
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    mostraCandidatos.innerHTML = "";
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotsHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotsHtml += `<div class="divisao1-image pequeno"><img src="/image/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            } else {
                fotsHtml += `<div class="divisao1-image"><img src="/image/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }
        }
        mostraCandidatos.innerHTML = fotsHtml;
    } else {
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="numero-errado">NÚMERO ERRADO</div><br/><div class="voto-nulo pisca">VOTO NULO</div>';
        aviso.style.display = 'block';
    }

    console.log("candidato", candidato);

}

function clicou(n) {
    let elementoNumero = document.querySelector('.numero.pisca');

    if (elementoNumero != null) {
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementoNumero.classList.remove('pisca');
        if (elementoNumero.nextElementSibling != null) {
            elementoNumero.nextElementSibling.classList.add('pisca');
        } else {
            console.log(numero)
            atualizaInterface();
        }
    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="voto-branco pisca">VOTO EM BRANCO</div>';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
    } else {
        alert("Para votar em branco não pode ter digitado nenhum número!");
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            voto: "branco"
        });
    } else if (numero.length > etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            voto: numero
        });
    }

    if (votoConfirmado = true) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class= "fim">FIM</div>'
            console.log(votos);
        }
    }
}

comecarEtapa();