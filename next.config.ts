/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Habilita la exportación estática
  distDir: 'out', // Cambia el nombre de la carpeta de .next a out
  images: {
    unoptimized: true // Necesario para exportación estática
  }
  // Opcional: Configura basePath si estás desplegando en un subdirectorio
  // basePath: '/mi-app',
}

module.exports = nextConfig
