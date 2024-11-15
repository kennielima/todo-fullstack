import { error } from 'console';
import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { Task } from './task-fe/src/app/lib/types';
import db from './lib/db';

const router = express.Router();

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    // body('dueDate').optional().isISO8601().withMessage('DueDate must be a valid date'),
];

router.get('/', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM tasks';
        // callback approach, but we'll go with promise based approach
        // db.query(query, (err, data) => {
        //     if (err) return res.json(err)
        //     return res.json(data)
        // })
        const [tasks] = await db.promise().query(query);
        res.json(tasks)
    } catch (error) {
        console.log('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});
router.get('/:id', async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    try {
        const query = 'SELECT * FROM tasks WHERE id = ?';
        const [task] = await db.promise().query(query, [taskId]);
        res.json(task)
    } catch (error) {
        console.log('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

router.post('/', taskValidationRules, async (req: Request, res: Response) => {
    const { title, description, status, dueDate } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("error", errors);
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const query = 'INSERT into tasks (title, description, status, dueDate) VALUES(?, ?, ?, ?)';
        const [newtask] = await db.promise().query(query, [title, description, status, dueDate]);
        res.status(200).json(newtask);
    } catch (error) {
        console.log('Error posting tasks:', error);
        res.status(500).json({ error: 'Error posting tasks' });
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const { title, description, status, dueDate } = req.body;
    try {
    const query = `UPDATE tasks 
                   SET 
                    title = COALESCE(?, title),
                    description = COALESCE(?, description), 
                    status = COALESCE(?, status), 
                    dueDate = COALESCE(?, dueDate)
                    WHERE id = ?`;
    const [updatedtask] = await db.promise().query(query, [title, description, status, dueDate, taskId])

    res.status(200).json(updatedtask);
    } catch (error){
        console.log('Error editing tasks:', error);
        res.status(500).json({ error: 'Error editing tasks' });
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const query = 'DELETE from tasks WHERE id = ?'
    try {
        const [task] = await db.promise().query(query, [taskId])
        res.status(204).send();

    } catch (error) {
        console.log('Error deleting tasks:', error);
        res.status(500).json({ error: 'Error deleting tasks' });
    }

})

export default router;