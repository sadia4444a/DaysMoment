const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const ACTIVITIES_FILE = path.join(__dirname, '../data/activities.json');

// Ensure activities file exists
const ensureActivitiesFile = async () => {
  try {
    await fs.access(ACTIVITIES_FILE);
  } catch {
    await fs.writeFile(ACTIVITIES_FILE, JSON.stringify([], null, 2));
  }
};

// Get all activities for today
router.get('/today', async (req, res) => {
  try {
    await ensureActivitiesFile();
    const data = await fs.readFile(ACTIVITIES_FILE, 'utf-8');
    const activities = JSON.parse(data);

    const today = new Date().toISOString().split('T')[0];
    const todayActivities = activities.filter((activity) => {
      const activityDate = new Date(activity.date).toISOString().split('T')[0];
      return activityDate === today;
    });

    res.json(todayActivities);
  } catch (error) {
    console.error('Error fetching today activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activities by date
router.get('/date/:date', async (req, res) => {
  try {
    await ensureActivitiesFile();
    const { date } = req.params;
    const data = await fs.readFile(ACTIVITIES_FILE, 'utf-8');
    const activities = JSON.parse(data);

    const searchDate = new Date(date).toISOString().split('T')[0];
    const dateActivities = activities.filter((activity) => {
      const activityDate = new Date(activity.date).toISOString().split('T')[0];
      return activityDate === searchDate;
    });

    res.json(dateActivities);
  } catch (error) {
    console.error('Error fetching activities by date:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Log a new activity
router.post('/', async (req, res) => {
  try {
    await ensureActivitiesFile();
    const { taskName, timeSpent, completed, date } = req.body;

    if (!taskName || timeSpent === undefined) {
      return res
        .status(400)
        .json({ error: 'Task name and time spent are required' });
    }

    const data = await fs.readFile(ACTIVITIES_FILE, 'utf-8');
    const activities = JSON.parse(data);

    const newActivity = {
      id: Date.now().toString(),
      taskName,
      timeSpent: parseInt(timeSpent),
      completed: completed || false,
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    activities.push(newActivity);
    await fs.writeFile(ACTIVITIES_FILE, JSON.stringify(activities, null, 2));

    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ error: 'Failed to log activity' });
  }
});

// Get activity statistics
router.get('/stats', async (req, res) => {
  try {
    await ensureActivitiesFile();
    const data = await fs.readFile(ACTIVITIES_FILE, 'utf-8');
    const activities = JSON.parse(data);

    const today = new Date().toISOString().split('T')[0];
    const todayActivities = activities.filter((activity) => {
      const activityDate = new Date(activity.date).toISOString().split('T')[0];
      return activityDate === today;
    });

    const totalTime = todayActivities.reduce(
      (sum, activity) => sum + activity.timeSpent,
      0,
    );
    const completedTasks = todayActivities.filter((a) => a.completed).length;
    const totalTasks = todayActivities.length;

    res.json({
      totalTime,
      completedTasks,
      totalTasks,
      activities: todayActivities,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
  try {
    await ensureActivitiesFile();
    const { id } = req.params;
    const data = await fs.readFile(ACTIVITIES_FILE, 'utf-8');
    const activities = JSON.parse(data);

    const updatedActivities = activities.filter(
      (activity) => activity.id !== id,
    );

    if (updatedActivities.length === activities.length) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    await fs.writeFile(
      ACTIVITIES_FILE,
      JSON.stringify(updatedActivities, null, 2),
    );
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

module.exports = router;
