import { useEffect, useState } from 'react'
import { db } from '@/firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

// EMPLOYEEEEEEEEEEEEEEEE
export function useMyLiveTasks(uid) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!uid) return
    const q = query(collection(db, 'tasks'), where('assignedTo', '==', uid))
    const unsub = onSnapshot(q, (snap) => {
      setTasks(snap.docs.map(doc => {
        const d = { id: doc.id, ...doc.data() }
        if (d.createdAt?.toDate) d.createdAt = d.createdAt.toDate().toISOString()
        if (d.updatedAt?.toDate) d.updatedAt = d.updatedAt.toDate().toISOString()
        return d
      }))
    }, err => console.error('[useMyLiveTasks]', err))
    return () => unsub()
  }, [uid])

  return tasks
}