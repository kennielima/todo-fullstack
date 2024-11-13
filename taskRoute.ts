import { error } from 'console';
import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { Task } from './task-fe/src/types';

const router = express.Router();

let tasks: Task [] = [];

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    // body('dueDate').optional().isISO8601().withMessage('DueDate must be a valid date'),
];

router.get('/', (req: Request, res: Response) => {
    console.log(tasks)
    res.json(tasks)
});
router.get('/:id', async (req: Request, res: Response) => {

    res.json(tasks)
});

router.post('/', taskValidationRules, (req: Request, res: Response) => {
    const { title, description, status, dueDate } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        console.log("error", error)
        return;
    }
    const newTask: Task = {
        id: tasks.length + 1,
        title,
        description,
        status: status || 'pending',
        dueDate,
    };

    tasks.push(newTask);
    console.log(req)
    res.status(201).json(newTask);
})

router.put('/:id', (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const { title, description, status, dueDate } = req.body;
    const task = tasks.find(t => t.id === taskId)
    if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    res.status(200).json(task);
})

router.delete('/:id', (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.findIndex(t => t.id === taskId)
    if (task === -1) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }
    tasks.splice(task, 1);
    res.status(204).send();
})

export default router;
