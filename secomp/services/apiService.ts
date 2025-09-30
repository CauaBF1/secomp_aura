import { getCurrentConfig, DEFAULT_HEADERS } from '../config/api';

const config = getCurrentConfig();

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.BASE_URL;
  }

  // Método genérico para fazer requisições
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Métodos para diferentes operações
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Métodos específicos da aplicação
  async login(email: string, password?: string) {
    return this.post('/auth/login', { email, password });
  }

  async getUserProfile(userId: string) {
    return this.get(`/users/${userId}`);
  }

  async updateUserProfile(userId: string, data: any) {
    return this.put(`/users/${userId}`, data);
  }

  async getTasks(userId: string) {
    return this.get(`/users/${userId}/tasks`);
  }

  async createTask(userId: string, task: any) {
    return this.post(`/users/${userId}/tasks`, task);
  }

  async getLeaderboard() {
    return this.get('/leaderboard');
  }

  async getFocusSessions(userId: string) {
    return this.get(`/users/${userId}/focus-sessions`);
  }

  async saveFocusSession(userId: string, session: any) {
    return this.post(`/users/${userId}/focus-sessions`, session);
  }
}

export const apiService = new ApiService();
export default apiService;