// Configurações de API para diferentes ambientes
export const API_CONFIG = {
  development: {
    BASE_URL: 'http://localhost:5000', // Flask backend local
    WEB_URL: 'http://localhost:8081',  // Frontend local
  },
  production: {
    BASE_URL: 'https://sua-api-flask.herokuapp.com', // Flask backend em produção
    WEB_URL: 'https://seu-app.netlify.app',          // Frontend em produção
  },
};

// Detecta o ambiente automaticamente
const getEnvironment = () => {
  if (__DEV__) return 'development';
  return 'production';
};

export const getCurrentConfig = () => {
  const env = getEnvironment();
  return API_CONFIG[env];
};

// Headers padrão para todas as requisições
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Configurações de CORS
export const CORS_CONFIG = {
  origin: ['http://localhost:8081', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};