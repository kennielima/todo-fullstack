import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    try {
        const body = await request.json();

        const response = await axios.post(`${process.env.API_URL}/tasks`, 
            body,
            {
            headers: {
                'Content-type': "application/json",
            },
        });
        
        if (!response) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.data;
        revalidatePath("/")
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        // res.status(500).json({ message: 'Failed to fetch tasks' });
        return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
    }
}
