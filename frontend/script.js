const productos = [
    {
        nombre: "Balón de Fútbol Pro X",
        descripcion: "Diseñado para un control perfecto y máximo rendimiento en la cancha.",
        imagen: "assets/images/producto1.webp"
    },
    {
        nombre: "Guantes de Boxeo Impact",
        descripcion: "Protección superior y estilo para los guerreros del ring.",
        imagen: "assets/images/producto2.jpg"
    },
    {
        nombre: "Bicicleta Mountain Blaze",
        descripcion: "Explora cualquier terreno con esta máquina de aventuras todo terreno.",
        imagen: "assets/images/producto3.webp"
    },
    {
        nombre: "Raqueta de Tenis UltraSpin",
        descripcion: "Domina la cancha con potencia, precisión y velocidad.",
        imagen: "assets/images/producto4.jpg"
    },
    {
        nombre: "Tabla de Surf Ocean Wave",
        descripcion: "Surfea las mejores olas con agilidad y estilo sin igual.",
        imagen: "assets/images/producto5.jpg"
    }
];

const productosGrid = document.getElementById('productosGrid');

productos.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
    `;
    productosGrid.appendChild(card);
});
