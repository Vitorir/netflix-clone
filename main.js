// Substitua o CHAVE_DA_API com a chave gerada no site.
// enderecos de requisicao
const API_KEY = 'api_key=b4b5f9d98442f11bbdd50a5adf70f1d1';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';

// variaveis globais
let home = document.querySelector('#home');
let popularCarousel = document.querySelector('.popular');
let movieContainer = document.querySelector('.movie');
let searchContainer = document.querySelector('.search');
let searchInput = document.querySelector('#search');

// estruturas para armazenamento das respostas da API
let moviesIds = [];
let tvSeriesIds = [];

// funcao exibir barra de pesquisa
function showSearch() {
    searchContainer.style.border = '1px solid white'; // borda branca
    searchInput.style.width = '25rem'; // tamanho do input
}

function hideSearch(e) {
    searchContainer.style.border = 'none';

    searchInput.style.width = '0';
}

document.addEventListener("mouseup", hideSearch)

// funcao para resgatar filmes com base nos parametros
async function getMovies(params) {
    console.log(params);

    try {
        // armazena os dados dos filmes
        let data = [];

        for (let index = 1; index < 4; index++) {
            let response = await fetch(`${BASE_URL}movie/${params}?${API_KEY}&${language}&page=${index}`);
            response = await response.json();
            data.push(...response.results);
          }

        // retorna o array com 60 filmes obtidos da API
        return data;

    } catch (error) {
        // lança um erro em caso de falha na obtenção de filmes
        throw new Error(e.message);
    }
}


// funcao para resgatar filmes com base nos parametros
async function getTvSeries(params) {
    console.log(params);

    try {
        // armazena os dados dos filmes
        let data = [];

        for (let index = 1; index < 4; index++) {
            let response = await fetch(`${BASE_URL}tv/${params}?${API_KEY}&${language}page=`); 'https://api.themoviedb.org/3/'

            // converte em formato json
            response = await response.json();

            // separa os itens de cada elemento incluindo eles como itens individuais
            data.push(...response.results);
        }

        // retorna o array com 60 filmes obtidos da API
        return data;

    } catch (error) {
        // lança um erro em caso de falha na obtenção de filmes
        throw new Error(e.message);
    }
}

async function getMovie(id) {
    try {
        // requisicao para informacoes de um filme com base no id
        let response = await fetch(`${BASE_URL} + movie/ + id + ? + ${API_KEY}&${language}`)

        // cibversai da resposta dos dados de filme para json
        let data = response.json();

        // retorno dos dados de filme
        return data;

    } catch (error) {
        throw new Error(e.message);
    }
}

async function getTvSerie(id) {
    try {
        // requisicao para informacoes de um filme com base no id
        let response = await fetch(`${BASE_URL} + tv/ + id + ? + ${API_KEY}&${language}`)

        // cibversai da resposta dos dados de filme para json
        let data = response.json();

        // retorno dos dados de filme
        return data;

    } catch (error) {
        throw new Error(e.message);
    }
}

async function getRandomPost () {

}

async function getCarousel(params, is_tv = false) {
    let list = is_tv ? await getTvSeries(params) : await getMovies(params);

    document.querySelector(`.${is_tv ? params + "_tv" : params}`).innerHTML = ''; // Limpa o conteúdo existente

    for (let item of list) {
        document.querySelector(`.${is_tv ? params + "_tv" : params}`).innerHTML += `
        <img src="${IMG_URL + item.poster_path}" />
        <div class="information-modal">
            <img src="${IMG_URL + item.backdrop_path}" alt="${is_tv ? item.name : item.title}" />
            <div>
                <!-- Comentario -->
            </div>
        </div>`
    }
}


async function callApiFunctions () {
    // chamadas para filmes
    await getCarousel("popular")
    await getCarousel("top_rated")
    await getCarousel("upcoming")

    // chamadas para series
    await getCarousel("popular", true)
    await getCarousel("top_rated", true)
    // await getRandomPost();
}

callApiFunctions()