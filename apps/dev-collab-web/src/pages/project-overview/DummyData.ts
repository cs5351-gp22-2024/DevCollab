export interface ProgressData {
  id: number
  title: string
  percent: number
  fillColor: string
  borderColor: string
  timeframe: string
  options: string[]
}

export const progressCards: ProgressData[] = [
  {
    id: 1,
    title: 'TODO',
    percent: 25,
    fillColor: '#FF4136',
    borderColor: '#f0f0f0',
    timeframe: 'Daily',
    options: ['Daily', 'Weekly', 'Monthly']
  },
  {
    id: 2,
    title: 'IN PROGRESS',
    percent: 79,
    fillColor: '#2ECC40',
    borderColor: '#f0f0f0',
    timeframe: 'Weekly',
    options: ['Daily', 'Weekly', 'Monthly']
  },
  {
    id: 3,
    title: 'DONE',
    percent: 52,
    fillColor: '#FF851B',
    borderColor: '#f0f0f0',
    timeframe: 'Weekly',
    options: ['Daily', 'Weekly', 'Monthly']
  }
]

export interface Task {
  name: string
  priority: 'High' | 'Medium' | 'Low'
  deadline: string
}

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
