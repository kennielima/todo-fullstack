import axios from 'axios';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/tasks`, {
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
    // res.status(500).json({ message: 'Failed to fetch tasks' });
    return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
  }
}
