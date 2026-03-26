import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const activityService = {
    subscribe(callback) {
        const unsubscribe = onSnapshot(collection(db, 'tasks'), (snap) => {
            const events = [];

            snap.docs.forEach((doc) => {
                const task = { id: doc.id, ...doc.data() };

                // Event 1: task was created
                if (task.createdAt) {
                    events.push({
                        id: `${task.id}_created`,
                        type: 'task_created',
                        taskId: task.id,
                        taskTitle: task.title,
                        userEmail: null, // admin created it — no user email stored yet
                        createdAt: task.createdAt.toDate(),
                    });
                }

                // Event 2: status was changed by an employee
                if (task.updatedAt && task.status !== 'backlog') {
                    events.push({
                        id: `${task.id}_status`,
                        type: 'status_changed',
                        taskId: task.id,
                        taskTitle: task.title,
                        userEmail: task.assignedEmail ?? null,
                        nextStatus: task.status,
                        createdAt: task.updatedAt.toDate(),
                    });
                }
            });

            // Sort newest first
            events.sort((a, b) => b.createdAt - a.createdAt);

            callback(events);
        });

        return unsubscribe;
    },
};

export default activityService;