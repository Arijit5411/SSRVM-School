import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { filename } = req.body;

        if (!filename) {
            return res.status(400).json({ done: 'error', message: 'Filename is required' });
        }

        const filePath = path.join(process.cwd(), '/public/uploads', filename);

        try {
            await fs.unlink(filePath);
            return res.status(200).json({ done: 'ok', message: 'File deleted successfully' });
        } catch (error) {
            console.error('Error deleting file:', error);
            return res.status(500).json({ done: 'error', message: 'Error deleting file' });
        }
    }

    return res.status(405).json({ done: 'error', message: 'Method Not Allowed' });
}
