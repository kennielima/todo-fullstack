import axios from 'axios';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { id } = params;
  try {
    const response = await axios.get(`${process.env.API_URL}/tasks/${id}`, {
      headers: {
        'Content-type': "application/json"
      }
    });
    if (!response) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
  }
}
