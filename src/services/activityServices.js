import { db } from '@/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const activityService = {
    subscribe(callback) {
        const q = query(
            collection(db, 'activities'),
            orderBy('createdAt', 'desc') // ✅ newest first
        );

        const unsubscribe = onSnapshot(q, (snap) => {
            const events = snap.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    type: data.type,
                    taskId: data.taskId,
                    taskTitle: data.taskTitle,
                    userEmail: data.userEmail ?? null,
                    nextStatus: data.nextStatus ?? null,
                    createdAt: data.createdAt?.toDate() ?? new Date(),
                };
            });

            callback(events);
        });

        return unsubscribe;
    },
};

export default activityService;