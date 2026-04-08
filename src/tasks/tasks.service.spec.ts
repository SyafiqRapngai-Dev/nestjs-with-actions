import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should start with no tasks', () => {
    expect(service.findAll()).toHaveLength(0);
  });

  it('should create a task', () => {
    const newTask = service.create('Buy Milk');
    expect(newTask.title).toBe('Buy Milk');
    expect(newTask.done).toBe(false);
    expect(newTask.id).toBeDefined();
    expect(service.findAll()).toHaveLength(1);
  });

  it('should throw an error when task is not found', () => {
    expect(() => service.findOne('invalid-id')).toThrow(NotFoundException);
  });
});
