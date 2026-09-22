import { getEventById, deleteEvent } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const event = await getEventById(id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      return res.status(200).json(event);
    } catch (error) {
      console.error(`API Error [GET /api/events/${id}]:`, error);
      return res.status(500).json({ error: 'Failed to fetch event details' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const event = await getEventById(id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      const result = await deleteEvent(id);
      if (!result.success) {
        return res.status(500).json({ error: 'Failed to delete event' });
      }
      return res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
      console.error(`API Error [DELETE /api/events/${id}]:`, error);
      return res.status(500).json({ error: 'Failed to delete event' });
    }
  }

  res.setHeader('Allow', ['GET', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
