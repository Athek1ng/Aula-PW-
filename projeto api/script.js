let map;
let markers = [];
let infoWindow;

// Dados dos lugares (Latitude e Longitude de exemplo - São Paulo)
const locais = [
    { name: "Burger do Bairro", lat: -23.5616, lng: -46.6560, info: "<strong>Burger do Bairro</strong><br>O melhor molho artesanal!" },
    { name: "Central Burger", lat: -23.5505, lng: -46.6333, info: "<strong>Central Burger</strong><br>No coração da cidade." },
    { name: "Artisanal Shake & Burger", lat: -23.5678, lng: -46.6489, info: "<strong>Artisanal Shake & Burger</strong><br>Double cheeseburger matador." }
];

// Função obrigatória que o Google Maps chama ao carregar
function initMap() {
    // Ponto central inicial (São Paulo)
    const centroInicial = { lat: -23.555, lng: -46.645 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: centroInicial,
    });

    infoWindow = new google.maps.InfoWindow();

    // Loop para colocar os marcadores no mapa
    locais.forEach((local, index) => {
        const marker = new google.maps.Marker({
            position: { lat: local.lat, lng: local.lng },
            map: map,
            title: local.name
        });

        // Evento de clique no próprio pin do mapa
        marker.addListener("click", () => {
            abrirJanela(marker, local.info);
        });

        // Guarda o marcador na array para podermos acessá-lo via botão depois
        markers.push(marker);
    });
}

// Função chamada pelos botões do HTML
function focarLugar(index) {
    const local = locais[index];
    const marker = markers[index];

    // Move o mapa suavemente até o local
    map.panTo({ lat: local.lat, lng: local.lng });
    map.setZoom(16);

    // Abre o balão de informações
    abrirJanela(marker, local.info);
}

function abrirJanela(marker, texto) {
    infoWindow.setContent(texto);
    infoWindow.open(map, marker);
}