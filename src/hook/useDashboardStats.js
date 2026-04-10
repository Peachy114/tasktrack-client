import { useMemo } from 'react';

const RING_RADIUS = 52;


// StatCard.jsx + UseDashboardStats
// Task bar chart + UseDashboardStats
// Calculates and formats all stats for the dashboard based on the polled summary data.
export function useDashboardStats(polledSummary) {
  const stats = useMemo(() => {
    const total          = polledSummary?.total          ?? 0;
    const doneTasks      = polledSummary?.completed      ?? 0;
    const activeTasks    = polledSummary?.inProgress     ?? 0;
    const pendingTasks   = polledSummary?.pending        ?? 0;
    const completionRate = polledSummary?.completionRate ?? 0;
    const circ           = 2 * Math.PI * RING_RADIUS;

    return {
      total,
      doneTasks,
      activeTasks,
      pendingTasks,
      completionRate,
      r:              RING_RADIUS,
      circ,
      doneOffset:     circ - (doneTasks / (total || 1)) * circ,
      progressOffset: circ - ((doneTasks + activeTasks) / (total || 1)) * circ,
    };
  }, [polledSummary]);

  return { stats };
}