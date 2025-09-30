// Middleware para expor dados do frontend para o backend
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from './apiService';

export class FrontendDataExporter {
  
  // Expor dados do usuário
  static async exportUserData() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const userSettings = await AsyncStorage.getItem('userSettings');
      const userProgress = await AsyncStorage.getItem('userProgress');
      
      return {
        userData: userData ? JSON.parse(userData) : null,
        userSettings: userSettings ? JSON.parse(userSettings) : null,
        userProgress: userProgress ? JSON.parse(userProgress) : null,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error exporting user data:', error);
      return null;
    }
  }

  // Expor dados de navegação/uso do app
  static async exportUsageData() {
    try {
      const navigationHistory = await AsyncStorage.getItem('navigationHistory');
      const sessionData = await AsyncStorage.getItem('sessionData');
      const appUsageStats = await AsyncStorage.getItem('appUsageStats');
      
      return {
        navigationHistory: navigationHistory ? JSON.parse(navigationHistory) : [],
        sessionData: sessionData ? JSON.parse(sessionData) : null,
        appUsageStats: appUsageStats ? JSON.parse(appUsageStats) : null,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error exporting usage data:', error);
      return null;
    }
  }

  // Expor dados de tarefas e foco
  static async exportTaskData() {
    try {
      const focusSessions = await AsyncStorage.getItem('focusSessions');
      const completedTasks = await AsyncStorage.getItem('completedTasks');
      const taskHistory = await AsyncStorage.getItem('taskHistory');
      
      return {
        focusSessions: focusSessions ? JSON.parse(focusSessions) : [],
        completedTasks: completedTasks ? JSON.parse(completedTasks) : [],
        taskHistory: taskHistory ? JSON.parse(taskHistory) : [],
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error exporting task data:', error);
      return null;
    }
  }

  // Método principal para sincronizar todos os dados com o backend
  static async syncAllDataWithBackend(userId: string) {
    try {
      const userData = await this.exportUserData();
      const usageData = await this.exportUsageData();
      const taskData = await this.exportTaskData();

      const allData = {
        userId,
        userData,
        usageData,
        taskData,
        syncTimestamp: new Date().toISOString(),
      };

      // Enviar para o backend
      const response = await apiService.post('/sync/frontend-data', allData);
      
      console.log('Data synced successfully:', response);
      return response;
    } catch (error) {
      console.error('Error syncing data with backend:', error);
      throw error;
    }
  }

  // Método para permitir que o backend acesse dados em tempo real
  static setupRealtimeDataSharing(userId: string) {
    // Configurar WebSocket ou polling para dados em tempo real
    const syncInterval = setInterval(async () => {
      try {
        await this.syncAllDataWithBackend(userId);
      } catch (error) {
        console.error('Realtime sync error:', error);
      }
    }, 30000); // Sincronizar a cada 30 segundos

    return syncInterval;
  }
}

// Hook para facilitar o uso nos componentes React
export const useFrontendDataExporter = (userId: string) => {
  const exportData = async () => {
    return await FrontendDataExporter.syncAllDataWithBackend(userId);
  };

  const startRealtimeSync = () => {
    return FrontendDataExporter.setupRealtimeDataSharing(userId);
  };

  return {
    exportData,
    startRealtimeSync,
  };
};