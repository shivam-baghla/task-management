import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskByFilter } from './dto/search-task-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }
    getTaskWithFilters(searchTaskByFilter: SearchTaskByFilter): Task[]{
        let filteredTasks = this.getAllTasks();
        const {status, search} = searchTaskByFilter;
        
        if(status){
            filteredTasks = filteredTasks.filter(task => task.status === status)
        }

        if(search){
            filteredTasks = filteredTasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return filteredTasks;
    }
    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task = {
            id: v4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateStatus(id: string, status: TaskStatus): Task {
        this.tasks.forEach(task => {
            if (task.id === id) {
                task.status = status;
            }
        });
        return this.tasks.find(task => task.id === id);
    }
}
