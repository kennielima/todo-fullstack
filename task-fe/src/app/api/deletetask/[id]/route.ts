import axios from 'axios';
import { NextResponse } from 'next/server';

export const DELETE = async (request: Request, props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params;
    try {
        if (!id) {
            return NextResponse.json(
                { error: 'Task ID is required' },
                { status: 400 }
            );
        }
        const response = await axios.delete(`${process.env.API_URL}/tasks/${id}`, {
            headers: {
                'Content-type': "application/json"
            },
        });
        if (!response) {
            throw new Error('Failed to delete task');
        }
        return NextResponse.json({ message: "task deleted successfully" });
    } catch (error) {
        console.error('Failed to delete:', error);
        return NextResponse.json({ message: 'Failed to process delete task' }, { status: 500 });
    }
}