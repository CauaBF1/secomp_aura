import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Task {
  id: number;
  title: string;
  duration: number;
  category: string;
  color: string;
}

// Tasks de teste
const mockTasks: Task[] = [
  { id: 1, title: 'Estudar React Native', duration: 25, category: 'Estudos', color: '#A685AB' },
  { id: 2, title: 'Revisar código do projeto', duration: 15, category: 'Trabalho', color: '#7E6BA8' },
  { id: 3, title: 'Ler artigo sobre UX', duration: 20, category: 'Estudos', color: '#A685AB' },
  { id: 4, title: 'Meeting com equipe', duration: 30, category: 'Trabalho', color: '#7E6BA8' },
  { id: 5, title: 'Exercícios de programação', duration: 45, category: 'Estudos', color: '#A685AB' },
  { id: 6, title: 'Planejar sprint', duration: 20, category: 'Trabalho', color: '#7E6BA8' },
];

export default function FocusScreen() {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Aqui você pode adicionar notificação de conclusão
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setTimeLeft(task.duration * 60);
    setIsRunning(false);
  };

  const handleStartStop = () => {
    if (selectedTask) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (selectedTask) {
      setTimeLeft(selectedTask.duration * 60);
    }
  };

  const calculateProgress = () => {
    if (!selectedTask) return 0;
    const totalTime = selectedTask.duration * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Focus Time</Text>
        <Text style={styles.subtitle}>Escolha uma task para começar</Text>
      </View>

      {/* Task Selection */}
      {!selectedTask ? (
        <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Suas Tasks</Text>
          {mockTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => handleTaskSelect(task)}
            >
              <View style={styles.taskCardLeft}>
                <View style={[styles.taskColorDot, { backgroundColor: task.color }]} />
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskCategory}>{task.category}</Text>
                </View>
              </View>
              <View style={styles.taskDuration}>
                <Text style={styles.taskDurationText}>{task.duration}min</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <>
          {/* Selected Task Info */}
          <View style={styles.selectedTaskContainer}>
            <View style={styles.selectedTaskHeader}>
              <View style={styles.selectedTaskInfo}>
                <Text style={styles.selectedTaskTitle}>{selectedTask.title}</Text>
                <Text style={styles.selectedTaskCategory}>{selectedTask.category} • {selectedTask.duration}min</Text>
              </View>
              <TouchableOpacity 
                style={styles.changeTaskButton}
                onPress={() => {
                  setSelectedTask(null);
                  setIsRunning(false);
                  setTimeLeft(0);
                }}
              >
                <Text style={styles.changeTaskButtonText}>Trocar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Timer Display */}
          <View style={styles.timerContainer}>
            <View style={styles.timerCircle}>
              <View style={styles.progressRing}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                <Text style={styles.timerStatus}>
                  {isRunning ? 'Em andamento...' : 'Pausado'}
                </Text>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${calculateProgress()}%` }]} />
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              style={[styles.controlButton, styles.startStopButton]}
              onPress={handleStartStop}
            >
              <Text style={styles.startStopButtonText}>
                {isRunning ? '⏸ Pausar' : '▶ Iniciar'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlButton, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>↻ Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{selectedTask.duration}</Text>
              <Text style={styles.statLabel}>Minutos</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{Math.floor(calculateProgress())}%</Text>
              <Text style={styles.statLabel}>Progresso</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{Math.floor(timeLeft / 60)}</Text>
              <Text style={styles.statLabel}>Restante</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: screenWidth > 400 ? 32 : 28,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7E6BA8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 16,
  },
  taskList: {
    flex: 1,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#2D217C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D217C',
    marginBottom: 4,
  },
  taskCategory: {
    fontSize: 12,
    color: '#7E6BA8',
  },
  taskDuration: {
    backgroundColor: 'rgba(166, 133, 171, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  taskDurationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D217C',
  },
  selectedTaskContainer: {
    backgroundColor: 'rgba(166, 133, 171, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  selectedTaskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedTaskInfo: {
    flex: 1,
  },
  selectedTaskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 4,
  },
  selectedTaskCategory: {
    fontSize: 14,
    color: '#7E6BA8',
  },
  changeTaskButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeTaskButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D217C',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerCircle: {
    width: screenWidth * 0.65,
    height: screenWidth * 0.65,
    borderRadius: screenWidth * 0.325,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2D217C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  progressRing: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: screenWidth > 400 ? 56 : 48,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 8,
  },
  timerStatus: {
    fontSize: 16,
    color: '#7E6BA8',
    fontWeight: '600',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(166, 133, 171, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#A685AB',
    borderRadius: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startStopButton: {
    backgroundColor: '#2D217C',
    shadowColor: '#2D217C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  startStopButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resetButton: {
    backgroundColor: '#F5EFD8',
    borderWidth: 2,
    borderColor: '#2D217C',
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D217C',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#2D217C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7E6BA8',
    fontWeight: '600',
  },
});