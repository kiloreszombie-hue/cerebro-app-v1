'use strict';

class Task {
    constructor(title, ideas = []) {
        this.title = title;
        this.ideas = ideas;
        this.completed = false;
        this.createdAt = new Date();
    }

    addIdea(idea) {
        this.ideas.push(idea);
    }

    complete() {
        this.completed = true;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getTasks() {
        return this.tasks;
    }

    getPendingTasks() {
        return this.tasks.filter(task => !task.completed);
    }
}

// Example usage
const manager = new TaskManager();
const task1 = new Task('Learn JavaScript');

manager.addTask(task1);
task1.addIdea('Watch tutorials');
task1.addIdea('Practice coding');

console.log(manager.getTasks());
