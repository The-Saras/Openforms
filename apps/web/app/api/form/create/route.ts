import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export default async function createForm(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  
  const { title, description } = req.body;

  try {
    
    const form = await db.form.create({
        data: {
            title,
            description,
            ownerId: session.user.id,
        },
    })
    return res.status(201).json(form);
  } 
  catch (error) {
    console.error('Error creating form:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
