import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body('title') title: string): Task {
    return this.tasksService.create(title);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }
}
