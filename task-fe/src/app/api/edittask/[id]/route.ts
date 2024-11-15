import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    if (!id) {
        return NextResponse.json( {message: 'failed to get id'} )
    }
    try {
        const body = await request.json();

        const response = await axios.put(`${process.env.API_URL}/tasks/${id}`, 
            body,
            {
            headers: {
                'Content-type': "application/json",
            },
        });
        
        if (!response) {
            throw new Error('Failed to edit task');
        }
        const data = await response.data;
        revalidatePath("/")
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
    }
}
