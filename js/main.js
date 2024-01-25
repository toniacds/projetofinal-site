function pesq(){

    const name = document.querySelector('#name').value;

    if(name == "historia" || name == "Historia" || name =="História" ){
        location.replace("pag1.html");
    }
    else if(name == "Personagens" || name == "Personagem" || name =="personagens"){
        location.replace("pag2.html")
    }
    else if(name == "Comandos" || name == "comando" || name =="comandos"){
        location.replace("pag4.html")
    }
    else if(name == "Download" || name == "download"){
        location.replace("pag3.html")
    }
    else if(name == "Squad" || name == "squad"){
        location.replace("pag5.html")
    }
    else if(name == "catalogo" || name == "Catalogo" || name =="Catálogo" || name =="catálogo"){
        location.replace("pag6.html")
    }
    else if(name == "Documentação" || name == "documentação" || name =="documentaçao"){
        location.replace("doc/package-summary.html")
    }
}

function p1(){
    location.replace("pag1.html");
}

function cadastrarJogo() {
    const name = document.getElementById('name').value;
    const plataform = document.getElementById('plataform').value;
    let url = document.getElementById('url').value;
    let thumbnailpath = document.getElementById('thumbnailpath').value;

    // Remover o prefixo "http://"
    url = url.replace(/^https?:\/\//, '');
    thumbnailpath = thumbnailpath.replace(/^https?:\/\//, '');

    const requestBody = {
        name,
        plataform,
        url,
        thumbnailpath
    };

    fetch('http://localhost:8080/jogos/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(data => {
            alert('Jogo cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();
             location.reload();
        })
        .catch(error => {
            console.error('Erro ao cadastrar jogo:', error);
        });
}

function ListarJogos() {
    alert("1");

    fetch(`http://localhost:8080/jogos`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Lista de Jogos não encontrada');
            }
            return response.json();
        })
        .then(data => {

            const tbodyElement = document.getElementById('jogos-tabela').querySelector('tbody');
            tbodyElement.innerHTML = '';

            // Preenche a tabela com os resultados da pesquisa
            data.forEach(jogo => {
                const linhaJogo = document.createElement('tr');
                linhaJogo.innerHTML = `
                    <td>${jogo.id}</td>
                    <td>${jogo.name}</td>
                    <td>${jogo.plataform}</td>
                    <td>${jogo.url}</td>
                    <td><a href="https://${jogo.thumbnailpath}">Acesse a imagem</a></td>
                `;
                tbodyElement.appendChild(linhaJogo);
            });  
        })
        // Trata os Erros
        .catch(error => {
            console.error('Erro ao pesquisar funcionário:', error);
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = 'Jopo não encontrado.';
        });
}