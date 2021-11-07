import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task = {
            id: v4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }
}
