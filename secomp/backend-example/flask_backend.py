#!/usr/bin/env python3
"""
Backend Flask para acessar dados do frontend React Native
Secomp Aura App
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from datetime import datetime
import json

app = Flask(__name__)

# Configuração CORS para permitir acesso do frontend
CORS(app, origins=[
    "http://localhost:8081",  # Frontend desenvolvimento
    "http://127.0.0.1:8081",
    "https://seu-app.netlify.app"  # Frontend produção
], methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# Configurações
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:8081')
app.config['SECRET_KEY'] = 'secomp-secret-key'

# Armazenamento simples em memória (use banco de dados em produção)
users_data = {}
sync_history = []

class FrontendConnector:
    """Classe para conectar e buscar dados do frontend"""
    
    @staticmethod
    def ping_frontend():
        """Verifica se o frontend está acessível"""
        try:
            response = requests.get(f'{FRONTEND_URL}/ping', timeout=5)
            return response.status_code == 200
        except:
            return False
    
    @staticmethod
    def fetch_user_data():
        """Busca dados do usuário do frontend"""
        try:
            response = requests.get(f'{FRONTEND_URL}/api/user-data', timeout=10)
            if response.status_code == 200:
                return response.json()
        except Exception as e:
            print(f"Erro ao buscar dados do usuário: {e}")
        return None
    
    @staticmethod
    def fetch_all_data():
        """Busca todos os dados disponíveis do frontend"""
        try:
            # Simular busca de dados (o frontend real enviaria via API)
            mock_data = {
                'user_data': {
                    'name': 'Maria Silva',
                    'email': 'maria.silva@email.com',
                    'points': 1850,
                    'level': 12,
                    'tasks_completed': 24,
                    'streak': 6
                },
                'task_data': {
                    'focus_sessions': [
                        {
                            'task_id': 1,
                            'duration': 25,
                            'completed': True,
                            'timestamp': datetime.now().isoformat()
                        }
                    ],
                    'active_tasks': [
                        {
                            'id': 1,
                            'title': 'Estudar React Native',
                            'duration': 25,
                            'category': 'Estudos'
                        }
                    ]
                },
                'usage_data': {
                    'session_start': datetime.now().isoformat(),
                    'screens_visited': ['home', 'profile', 'leaderboard'],
                    'time_spent': 1800  # 30 minutos
                }
            }
            return mock_data
        except Exception as e:
            print(f"Erro ao buscar dados: {e}")
        return None

# ============ ROTAS PRINCIPAIS ============

@app.route('/', methods=['GET'])
def home():
    """Página inicial da API"""
    return jsonify({
        'message': 'Secomp Aura Backend API',
        'version': '1.0.0',
        'frontend_status': FrontendConnector.ping_frontend(),
        'endpoints': {
            'frontend_data': '/api/frontend-data',
            'sync': '/api/sync',
            'users': '/api/users',
            'status': '/api/status'
        }
    })

@app.route('/api/status', methods=['GET'])
def api_status():
    """Status da API e conexão com frontend"""
    frontend_connected = FrontendConnector.ping_frontend()
    
    return jsonify({
        'api_status': 'online',
        'frontend_connected': frontend_connected,
        'frontend_url': FRONTEND_URL,
        'sync_history_count': len(sync_history),
        'users_count': len(users_data),
        'timestamp': datetime.now().isoformat()
    })

# ============ ROTAS PARA ACESSAR DADOS DO FRONTEND ============

@app.route('/api/frontend-data', methods=['GET'])
def get_all_frontend_data():
    """Busca todos os dados do frontend"""
    data = FrontendConnector.fetch_all_data()
    
    if data:
        # Salvar dados recebidos
        sync_entry = {
            'timestamp': datetime.now().isoformat(),
            'data_received': True,
            'data': data
        }
        sync_history.append(sync_entry)
        
        return jsonify({
            'status': 'success',
            'data': data,
            'timestamp': datetime.now().isoformat()
        })
    
    return jsonify({
        'status': 'error',
        'message': 'Não foi possível acessar dados do frontend'
    }), 500

@app.route('/api/frontend-data/user', methods=['GET'])
def get_frontend_user_data():
    """Busca dados específicos do usuário"""
    all_data = FrontendConnector.fetch_all_data()
    
    if all_data and 'user_data' in all_data:
        return jsonify({
            'status': 'success',
            'user_data': all_data['user_data'],
            'timestamp': datetime.now().isoformat()
        })
    
    return jsonify({
        'status': 'error',
        'message': 'Dados do usuário não encontrados'
    }), 404

@app.route('/api/frontend-data/tasks', methods=['GET'])
def get_frontend_task_data():
    """Busca dados de tarefas"""
    all_data = FrontendConnector.fetch_all_data()
    
    if all_data and 'task_data' in all_data:
        return jsonify({
            'status': 'success',
            'task_data': all_data['task_data'],
            'timestamp': datetime.now().isoformat()
        })
    
    return jsonify({
        'status': 'error',
        'message': 'Dados de tarefas não encontrados'
    }), 404

# ============ ROTAS PARA SINCRONIZAÇÃO ============

@app.route('/api/sync', methods=['POST'])
def sync_frontend_data():
    """Recebe dados sincronizados do frontend"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Nenhum dado recebido'}), 400
        
        user_id = data.get('userId', 'unknown')
        timestamp = datetime.now().isoformat()
        
        # Salvar dados do usuário
        users_data[user_id] = {
            'user_data': data.get('userData'),
            'usage_data': data.get('usageData'),
            'task_data': data.get('taskData'),
            'last_sync': timestamp
        }
        
        # Adicionar ao histórico
        sync_history.append({
            'user_id': user_id,
            'timestamp': timestamp,
            'data_size': len(str(data)),
            'status': 'success'
        })
        
        print(f"✅ Dados sincronizados para usuário {user_id}")
        print(f"📊 Dados recebidos: {json.dumps(data, indent=2)}")
        
        return jsonify({
            'status': 'success',
            'message': 'Dados sincronizados com sucesso',
            'user_id': user_id,
            'timestamp': timestamp
        })
        
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Erro na sincronização: {error_msg}")
        
        return jsonify({
            'status': 'error',
            'message': error_msg,
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/sync/history', methods=['GET'])
def get_sync_history():
    """Histórico de sincronizações"""
    return jsonify({
        'status': 'success',
        'history': sync_history[-20:],  # Últimas 20 sincronizações
        'total_syncs': len(sync_history)
    })

# ============ ROTAS PARA USUÁRIOS ============

@app.route('/api/users', methods=['GET'])
def get_all_users():
    """Lista todos os usuários"""
    return jsonify({
        'status': 'success',
        'users': users_data,
        'count': len(users_data)
    })

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """Busca dados de um usuário específico"""
    if user_id in users_data:
        return jsonify({
            'status': 'success',
            'user': users_data[user_id]
        })
    
    return jsonify({
        'status': 'error',
        'message': 'Usuário não encontrado'
    }), 404

# ============ ROTAS DE AUTENTICAÇÃO ============

@app.route('/auth/login', methods=['POST'])
def login():
    """Autenticação simples"""
    data = request.get_json()
    email = data.get('email', '')
    
    # Autenticação simples (implementar JWT em produção)
    if email:
        user_id = email.split('@')[0]  # Usar parte antes do @ como ID
        
        return jsonify({
            'status': 'success',
            'message': 'Login realizado com sucesso',
            'user_id': user_id,
            'token': f'token-{user_id}',
            'timestamp': datetime.now().isoformat()
        })
    
    return jsonify({
        'status': 'error',
        'message': 'Email é obrigatório'
    }), 400

# ============ OUTRAS ROTAS ============

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    """Leaderboard dos usuários"""
    # Simular leaderboard baseado nos dados sincronizados
    leaderboard = []
    
    for user_id, user_data in users_data.items():
        if user_data.get('user_data'):
            leaderboard.append({
                'user_id': user_id,
                'name': user_data['user_data'].get('name', user_id),
                'points': user_data['user_data'].get('points', 0),
                'tasks_completed': user_data['user_data'].get('tasks_completed', 0)
            })
    
    # Ordenar por pontos
    leaderboard.sort(key=lambda x: x['points'], reverse=True)
    
    # Adicionar posições
    for i, entry in enumerate(leaderboard):
        entry['position'] = i + 1
    
    return jsonify({
        'status': 'success',
        'leaderboard': leaderboard[:10],  # Top 10
        'total_users': len(leaderboard)
    })

# ============ ERROR HANDLERS ============

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'status': 'error',
        'message': 'Endpoint não encontrado',
        'code': 404
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'status': 'error',
        'message': 'Erro interno do servidor',
        'code': 500
    }), 500

if __name__ == '__main__':
    print("🚀 Iniciando Secomp Aura Backend...")
    print(f"🌐 Frontend URL: {FRONTEND_URL}")
    print("📡 Servidor rodando em: http://localhost:5000")
    print("\n📋 Endpoints disponíveis:")
    print("   • GET  /                     - Página inicial")
    print("   • GET  /api/status          - Status da API")
    print("   • GET  /api/frontend-data   - Todos os dados do frontend")
    print("   • POST /api/sync            - Sincronizar dados")
    print("   • GET  /api/users           - Lista usuários")
    print("   • POST /auth/login          - Login")
    print("   • GET  /api/leaderboard     - Leaderboard")
    print("\n💡 Teste com: curl http://localhost:5000/api/status")
    
    app.run(
        debug=True,
        host='0.0.0.0',  # Permite acesso externo
        port=5000,
        threaded=True
    )