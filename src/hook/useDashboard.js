import { useState, useEffect, useRef, useCallback } from 'react'
import { db } from '@/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { getToken } from '@/utils/getToken'
import { POLL_INTERVAL } from '../utils/constants'

//The admin — decides when to fetch and what to do with it
export function useFirestoreTasks() {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'tasks'), (snap) => {
      setTasks(snap.docs.map(doc => {
        const d = { id: doc.id, ...doc.data() }
        if (d.createdAt?.toDate) d.createdAt = d.createdAt.toDate().toISOString()
        if (d.updatedAt?.toDate) d.updatedAt = d.updatedAt.toDate().toISOString()
        return d
      }))
    }, err => console.error('[useFirestoreTasks]', err))
    return () => unsub()
  }, [])
  return tasks
}


//The manager — decides when to fetch and what to do with it
export function useFirestoreUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users'), (snap) => {
      setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }, err => console.error('[useFirestoreUsers]', err))
    return () => unsub()
  }, [])
  return users
}


//A reusable hook for polling any data with a fetcher function and interval
export function usePolledData(fetcher, interval = POLL_INTERVAL) {
  const [data, setData] = useState([])
  const timerRef = useRef(null)

  const load = useCallback(async () => {
    try {
      const token  = await getToken()
      const result = await fetcher(token)
      setData(result ?? [])
    } catch (err) {
      console.error('[usePolledData]', err.message)
    }
  }, [fetcher])

  useEffect(() => {
    load()
    timerRef.current = setInterval(load, interval)
    return () => clearInterval(timerRef.current)
  }, [load, interval])

  return data
}



