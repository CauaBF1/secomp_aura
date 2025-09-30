# Flask Backend Integration - Frontend Data Access

## Configuração do Backend Flask

### 1. Estrutura básica do projeto Flask

```
flask-backend/
├── app.py
├── requirements.txt
├── config.py
├── models/
│   ├── __init__.py
│   ├── user.py
│   └── task.py
├── routes/
│   ├── __init__.py
│   ├── auth.py
│   ├── users.py
│   └── frontend_data.py
└── utils/
    ├── __init__.py
    └── cors_config.py
```

### 2. requirements.txt

```txt
Flask==2.3.3
Flask-CORS==4.0.0
Flask-SQLAlchemy==3.0.5
Flask-Migrate==4.0.5
Flask-JWT-Extended==4.5.2
requests==2.31.0
python-dotenv==1.0.0
```

### 3. Configuração principal (app.py)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import requests
import os
from datetime import datetime

app = Flask(__name__)

# Configurações
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///secomp.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'

# Extensões
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Configuração CORS
CORS(app, origins=[
    "http://localhost:8081",  # Frontend development
    "https://seu-app.netlify.app"  # Frontend production
], methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# URL do frontend
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:8081')

class FrontendDataService:
    """Serviço para acessar dados do frontend"""
    
    @staticmethod
    def get_user_data():
        """Busca dados do usuário no frontend"""
        try:
            response = requests.get(f'{FRONTEND_URL}/api/user-data')
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            print(f"Erro ao buscar dados do usuário: {e}")
            return None
    
    @staticmethod
    def get_task_data():
        """Busca dados de tarefas no frontend"""
        try:
            response = requests.get(f'{FRONTEND_URL}/api/task-data')
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            print(f"Erro ao buscar dados de tarefas: {e}")
            return None
    
    @staticmethod
    def get_usage_data():
        """Busca dados de uso do app no frontend"""
        try:
            response = requests.get(f'{FRONTEND_URL}/api/usage-data')
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            print(f"Erro ao buscar dados de uso: {e}")
            return None

# Rotas para acessar dados do frontend
@app.route('/api/frontend-data/user', methods=['GET'])
def get_frontend_user_data():
    """Endpoint para buscar dados do usuário do frontend"""
    data = FrontendDataService.get_user_data()
    if data:
        return jsonify(data)
    return jsonify({'error': 'Não foi possível acessar dados do frontend'}), 500

@app.route('/api/frontend-data/tasks', methods=['GET'])
def get_frontend_task_data():
    """Endpoint para buscar dados de tarefas do frontend"""
    data = FrontendDataService.get_task_data()
    if data:
        return jsonify(data)
    return jsonify({'error': 'Não foi possível acessar dados de tarefas'}), 500

@app.route('/api/frontend-data/usage', methods=['GET'])
def get_frontend_usage_data():
    """Endpoint para buscar dados de uso do frontend"""
    data = FrontendDataService.get_usage_data()
    if data:
        return jsonify(data)
    return jsonify({'error': 'Não foi possível acessar dados de uso'}), 500

@app.route('/api/frontend-data/all', methods=['GET'])
def get_all_frontend_data():
    """Endpoint para buscar todos os dados do frontend"""
    user_data = FrontendDataService.get_user_data()
    task_data = FrontendDataService.get_task_data()
    usage_data = FrontendDataService.get_usage_data()
    
    return jsonify({
        'user_data': user_data,
        'task_data': task_data,
        'usage_data': usage_data,
        'timestamp': datetime.now().isoformat()
    })

# Rota para receber dados sincronizados do frontend
@app.route('/sync/frontend-data', methods=['POST'])
def receive_frontend_data():
    """Recebe dados sincronizados do frontend"""
    try:
        data = request.get_json()
        
        # Processar dados recebidos
        user_id = data.get('userId')
        user_data = data.get('userData')
        usage_data = data.get('usageData')
        task_data = data.get('taskData')
        
        # Aqui você pode salvar os dados no banco de dados
        # Exemplo: salvar no banco
        # save_user_data_to_db(user_id, user_data)
        # save_usage_data_to_db(user_id, usage_data)
        # save_task_data_to_db(user_id, task_data)
        
        print(f"Dados recebidos do frontend para usuário {user_id}")
        print(f"User Data: {user_data}")
        print(f"Usage Data: {usage_data}")
        print(f"Task Data: {task_data}")
        
        return jsonify({
            'status': 'success',
            'message': 'Dados sincronizados com sucesso',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# Rotas de autenticação
@app.route('/auth/login', methods=['POST'])
def login():
    """Login do usuário"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Aqui você implementaria a lógica de autenticação
    # Por enquanto, apenas retorna sucesso
    return jsonify({
        'status': 'success',
        'user_id': 'user123',
        'token': 'jwt-token-example'
    })

# Rotas para usuários
@app.route('/users/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    """Busca perfil do usuário"""
    return jsonify({
        'id': user_id,
        'name': 'Maria Silva',
        'email': 'maria.silva@email.com',
        'points': 1850,
        'level': 12
    })

@app.route('/users/<user_id>', methods=['PUT'])
def update_user_profile(user_id):
    """Atualiza perfil do usuário"""
    data = request.get_json()
    # Implementar lógica de atualização
    return jsonify({'status': 'updated'})

# Rotas para tarefas
@app.route('/users/<user_id>/tasks', methods=['GET'])
def get_user_tasks(user_id):
    """Busca tarefas do usuário"""
    return jsonify([
        {
            'id': 1,
            'title': 'Estudar React Native',
            'duration': 25,
            'category': 'Estudos',
            'completed': False
        }
    ])

@app.route('/users/<user_id>/tasks', methods=['POST'])
def create_user_task(user_id):
    """Cria nova tarefa"""
    data = request.get_json()
    # Implementar lógica de criação
    return jsonify({'status': 'created', 'task_id': 123})

# Rota para leaderboard
@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """Busca leaderboard"""
    return jsonify([
        {'name': 'Ana Silva', 'points': 2450, 'position': 1},
        {'name': 'João Pedro', 'points': 2380, 'position': 2},
        {'name': 'Maria Costa', 'points': 2250, 'position': 3}
    ])

# Rotas para sessões de foco
@app.route('/users/<user_id>/focus-sessions', methods=['GET'])
def get_focus_sessions(user_id):
    """Busca sessões de foco do usuário"""
    return jsonify([])

@app.route('/users/<user_id>/focus-sessions', methods=['POST'])
def save_focus_session(user_id):
    """Salva sessão de foco"""
    data = request.get_json()
    # Implementar lógica de salvamento
    return jsonify({'status': 'saved'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
```

### 4. Como executar

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar o servidor Flask
python app.py

# Ou usando flask run
export FLASK_APP=app.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
```

### 5. Testando a integração

```bash
# Testar se o backend consegue acessar dados do frontend
curl http://localhost:5000/api/frontend-data/all

# Testar autenticação
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Testar sincronização de dados
curl -X POST http://localhost:5000/sync/frontend-data \
  -H "Content-Type: application/json" \
  -d '{"userId": "123", "userData": {"name": "Test"}}'
```

### 6. Variáveis de ambiente (.env)

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=jwt-secret-string
DATABASE_URL=sqlite:///secomp.db
FRONTEND_URL=http://localhost:8081
```

### 7. Deploy no Heroku

```bash
# Criar Procfile
echo "web: python app.py" > Procfile

# Criar runtime.txt
echo "python-3.11.0" > runtime.txt

# Deploy
git add .
git commit -m "Flask backend setup"
heroku create sua-api-flask
git push heroku main
```

### 8. Modelos de dados (models/user.py)

```python
from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    points = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class FocusSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    ended_at = db.Column(db.DateTime)
```

### 9. URLs importantes

- **Backend Flask**: `http://localhost:5000`
- **Frontend React Native**: `http://localhost:8081`
- **API Docs**: Acesse `http://localhost:5000/api/frontend-data/all` para ver todos os dados

Agora seu backend Flask pode acessar todos os dados do frontend React Native!