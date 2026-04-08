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
    const newTask = service.create({ title: 'Buy Milk' });
    expect(newTask.title).toBe('Buy Milk');
    expect(newTask.done).toBe(false);
    expect(newTask.id).toBeDefined();
    expect(service.findAll()).toHaveLength(1);
  });

  it('should create a task with done set to true', () => {
    const task = service.create({ title: 'Already done task', done: true });
    expect(task.done).toBe(true);
  });

  it('should find a task by id', () => {
    const created = service.create({ title: 'Find me' });
    const found = service.findOne(created.id);
    expect(found.title).toBe('Find me');
  });

  it('should throw an error when task is not found', () => {
    expect(() => service.findOne('invalid-id')).toThrow(NotFoundException);
  });

  it('should update a task partially', () => {
    const task = service.create({ title: 'Original title' });
    const updated = service.update(task.id, { done: true });
    expect(updated.done).toBe(true);
    expect(updated.title).toBe('Original title'); // title should be unchanged
  });

  it('should delete a task', () => {
    const task = service.create({ title: 'Delete me' });
    service.delete(task.id);
    expect(service.findAll()).toHaveLength(0);
  });
});
