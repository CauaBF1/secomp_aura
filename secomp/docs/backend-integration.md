# API Documentation - Frontend Data Access

## Como o Backend pode acessar dados do Frontend

### 1. Configuração de CORS
O frontend está configurado para aceitar requisições de qualquer origem. Configure seu backend com:

```javascript
// Express.js example
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

### 2. Endpoints disponíveis no Frontend

#### Base URL Development: `http://localhost:8081`
#### Base URL Production: `https://seu-app.netlify.app`

### 3. Dados disponíveis via API

#### A. Dados do Usuário
- **Endpoint**: `/api/user-data`
- **Método**: GET
- **Response**:
```json
{
  "userData": {
    "name": "string",
    "email": "string",
    "level": "number",
    "points": "number"
  },
  "userSettings": {
    "notifications": "boolean",
    "theme": "string"
  },
  "userProgress": {
    "tasksCompleted": "number",
    "focusTime": "number",
    "streak": "number"
  }
}
```

#### B. Dados de Tarefas
- **Endpoint**: `/api/task-data`
- **Método**: GET
- **Response**:
```json
{
  "focusSessions": [
    {
      "taskId": "string",
      "duration": "number",
      "startTime": "string",
      "endTime": "string",
      "completed": "boolean"
    }
  ],
  "completedTasks": [],
  "taskHistory": []
}
```

#### C. Dados de Uso do App
- **Endpoint**: `/api/usage-data`
- **Método**: GET
- **Response**:
```json
{
  "navigationHistory": [
    {
      "screen": "string",
      "timestamp": "string",
      "timeSpent": "number"
    }
  ],
  "sessionData": {
    "sessionStart": "string",
    "sessionEnd": "string",
    "totalTime": "number"
  }
}
```

### 4. Sincronização em Tempo Real

#### WebSocket Connection
- **URL**: `ws://localhost:8081/ws`
- **Events**:
  - `user-action`: Enviado quando usuário interage com o app
  - `data-update`: Enviado quando dados são atualizados
  - `sync-request`: Backend pode solicitar sincronização

### 5. Exemplo de uso no Backend

```javascript
// Node.js/Express exemplo
const express = require('express');
const axios = require('axios');

const app = express();

// Buscar dados do frontend
app.get('/frontend-data/:userId', async (req, res) => {
  try {
    const frontendUrl = 'http://localhost:8081';
    
    // Buscar diferentes tipos de dados
    const userData = await axios.get(`${frontendUrl}/api/user-data`);
    const taskData = await axios.get(`${frontendUrl}/api/task-data`);
    const usageData = await axios.get(`${frontendUrl}/api/usage-data`);
    
    const combinedData = {
      user: userData.data,
      tasks: taskData.data,
      usage: usageData.data,
      timestamp: new Date().toISOString()
    };
    
    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Backend listening on port 3000');
});
```

### 6. Scripts para Deploy

```bash
# Desenvolvimento
npm run start          # Inicia o servidor de desenvolvimento
npm run web            # Inicia apenas a versão web
npm run tunnel         # Expõe o app via tunnel (acessível externamente)

# Produção
npm run build-web      # Gera build para produção
npm run serve          # Serve o build localmente
```

### 7. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_WEB_URL=http://localhost:8081
EXPO_PUBLIC_ENVIRONMENT=development
```

### 8. Segurança

- Implemente autenticação JWT
- Use HTTPS em produção
- Valide todas as requisições
- Implemente rate limiting
- Use CORS específico em produção

### 9. Monitoramento

- Logs de acesso do backend
- Métricas de performance
- Alertas de erro
- Dashboard de uso da API