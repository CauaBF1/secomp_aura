// Metro configuration para permitir acesso externo
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configurações para permitir acesso do backend
config.server = {
  ...config.server,
  enableVisualizer: false,
  host: '0.0.0.0', // Permite acesso de qualquer IP
  port: 8081,
};

// Configurações de CORS para desenvolvimento
config.resolver = {
  ...config.resolver,
  alias: {
    ...config.resolver.alias,
  },
};

module.exports = config;