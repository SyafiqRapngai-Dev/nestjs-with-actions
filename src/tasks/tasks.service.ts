import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: String): Task {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) throw new NotFoundException(`Task with id ${id} is not found`);

    return task;
  }

  create(title: string): Task {
    const newTask: Task = {
      id: uuid(),
      title,
      done: false,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  delete(id: string): void {
    this.findOne(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
