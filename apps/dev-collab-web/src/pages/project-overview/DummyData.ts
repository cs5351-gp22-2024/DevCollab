export interface ProgressData {
  title: string
  progress: number[]
  options: string[]
}

export interface ChartDataPoint {
  date: string
  tasks: number
}

export interface CFDDataPoint {
  date: string
  todo: number
  inProgress: number
  done: number
}

export interface Task {
  name: string
  priority: 'High' | 'Medium' | 'Low'
  deadline: string
}

export const progressCards: ProgressData[] = [
  {
    title: 'TODO',
    progress: [25, 10, 55],
    options: ['Daily', 'Weekly', 'Monthly']
  },
  {
    title: 'IN PROGRESS',
    progress: [60, 70, 30],
    options: ['Daily', 'Weekly', 'Monthly']
  },
  {
    title: 'DONE',
    progress: [15, 20, 80],
    options: ['Daily', 'Weekly', 'Monthly']
  }
]

export const chartData: CFDDataPoint[] = [
  { date: '2024-09-01', todo: 30, inProgress: 0, done: 0 },
  { date: '2024-09-08', todo: 25, inProgress: 5, done: 3 },
  { date: '2024-09-15', todo: 22, inProgress: 7, done: 8 },
  { date: '2024-09-22', todo: 20, inProgress: 8, done: 12 },
  { date: '2024-09-29', todo: 18, inProgress: 9, done: 18 },
  { date: '2024-10-06', todo: 15, inProgress: 10, done: 25 },
  { date: '2024-10-13', todo: 12, inProgress: 11, done: 32 },
  { date: '2024-10-20', todo: 10, inProgress: 10, done: 40 },
  { date: '2024-10-27', todo: 8, inProgress: 9, done: 48 },
  { date: '2024-11-03', todo: 6, inProgress: 8, done: 56 },
  { date: '2024-11-10', todo: 4, inProgress: 7, done: 64 },
  { date: '2024-11-17', todo: 2, inProgress: 6, done: 72 },
  { date: '2024-11-24', todo: 0, inProgress: 5, done: 80 },
  { date: '2024-11-30', todo: 0, inProgress: 0, done: 85 }
  // { date: '2024-12-1', todo: 0, inProgress: 0, done: 85 }
]

export const tasks: Task[] = [
  { name: 'Task1', priority: 'High', deadline: '2025-11-20' },
  { name: 'Task2', priority: 'Medium', deadline: '2025-11-21' },
  { name: 'Task3', priority: 'Low', deadline: '2025-11-22' },
  { name: 'Task4', priority: 'Low', deadline: '2025-11-23' },
  { name: 'Task5', priority: 'High', deadline: '2025-11-24' },
  { name: 'Task6', priority: 'Medium', deadline: '2025-11-25' }
]

export interface Story {
  name: string
  description: string
  status: 'Todo' | 'Progress' | 'Done'
  priority: 'High' | 'Medium' | 'Low'
  deadline: string
  expanded?: boolean
  tasks: StoryTask[]
}

export interface StoryTask {
  name: string
  description: string
  deadline: string
  expanded: Boolean
  details: StoryTaskDetail[]
}

export interface StoryTaskDetail {
  name: string
  description: string
  deadline: string
}

export const story: Story[] = [
  {
    name: 'Store 1',
    description: 'Main store project',
    status: 'Todo',
    priority: 'High',
    deadline: '30/11/2025',
    expanded: false,
    tasks: [
      {
        name: 'Task 1',
        description: 'Description 1',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 2',
        description: 'Description 2',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      }
    ]
  },
  {
    name: 'Store 2',
    description: 'Secondary store project',
    status: 'Progress',
    priority: 'Medium',
    deadline: '30/11/2025',
    expanded: false,
    tasks: [
      {
        name: 'Task 1',
        description: 'Description 1',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 2',
        description: 'Description 2',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 3',
        description: 'Description 3',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 4',
        description: 'Description 4',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 5',
        description: 'Description 5',
        deadline: '30/11/2025',
        expanded: false,
        details: [
          {
            name: 'Detail 1',
            description: 'Detail Description 1',
            deadline: '30/11/2025'
          },
          {
            name: 'Detail 2',
            description: 'Detail Description 2',
            deadline: '30/11/2025'
          }
        ]
      }
    ]
  },
  {
    name: 'Store 3',
    description: 'Secondary store project',
    status: 'Progress',
    priority: 'Medium',
    deadline: '30/11/2025',
    expanded: false,
    tasks: [
      {
        name: 'Task 1',
        description: 'Description 1',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 2',
        description: 'Description 2',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 3',
        description: 'Description 3',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 4',
        description: 'Description 4',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 5',
        description: 'Description 5',
        deadline: '30/11/2025',
        expanded: false,
        details: [
          {
            name: 'Detail 1',
            description: 'Detail Description 1',
            deadline: '30/11/2025'
          },
          {
            name: 'Detail 2',
            description: 'Detail Description 2',
            deadline: '30/11/2025'
          }
        ]
      }
    ]
  },
  {
    name: 'Store 4',
    description: 'Secondary store project',
    status: 'Progress',
    priority: 'Medium',
    deadline: '30/11/2025',
    expanded: false,
    tasks: [
      {
        name: 'Task 1',
        description: 'Description 1',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 2',
        description: 'Description 2',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 3',
        description: 'Description 3',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 4',
        description: 'Description 4',
        deadline: '30/11/2025',
        expanded: false,
        details: []
      },
      {
        name: 'Task 5',
        description: 'Description 5',
        deadline: '30/11/2025',
        expanded: false,
        details: [
          {
            name: 'Detail 1',
            description: 'Detail Description 1',
            deadline: '30/11/2025'
          },
          {
            name: 'Detail 2',
            description: 'Detail Description 2',
            deadline: '30/11/2025'
          }
        ]
      }
    ]
  }
]
