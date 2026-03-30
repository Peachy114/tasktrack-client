import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore'
import { db } from '@/firebase'

const activityService = {
    subscribe(callback) {
        const createdQuery = query(
            collection(db, 'activities'),
            where('type', '==', 'task_created'),
            orderBy('createdAt', 'desc'),
            limit(10)
        )

        const statusQuery = query(
            collection(db, 'activities'),
            where('type', '==', 'status_changed'),
            orderBy('createdAt', 'desc'),
            limit(10)
        )

        let createdEvents = []
        let statusEvents  = []

        const mapDoc = (doc) => {
            const data = doc.data()
            return {
                id: doc.id,
                type: data.type,
                taskId: data.taskId,
                taskTitle: data.taskTitle,
                userEmail: data.userEmail ?? null,
                nextStatus: data.nextStatus ?? null,
                createdAt: data.createdAt?.toDate() ?? new Date(),
            }
        }

        const merge = () => {
            const merged = [...createdEvents, ...statusEvents]
                .sort((a, b) => b.createdAt - a.createdAt)
            callback(merged)
        }

        const unsubscribe1 = onSnapshot(createdQuery, (snap) => {
            createdEvents = snap.docs.map(mapDoc)
            merge()
        })

        const unsubscribe2 = onSnapshot(statusQuery, (snap) => {
            statusEvents = snap.docs.map(mapDoc)
            merge()
        })

        return () => {
            unsubscribe1()
            unsubscribe2()
        }
    },
}

export default activityService