import { useState, useEffect } from 'react';

import api from 'src/services/api'; 

type ChartData = {
  categories: string[];
  series: number[];
};

type Summary = {
  totalMeals: number;
  totalFoods: number;
  totalCalories: number;
  totalUsers: number;
  totalCategories: number;
};

type DashboardStats = {
  summary: Summary;
  mealByCalories: ChartData;

  foodsByCategory: { label: string; value: number }[];
  userActivities: ChartData;
};

const EMPTY_CHART: ChartData = {
  categories: [],
  series: [],
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    summary: {
      totalMeals: 0,
      totalFoods: 0,
      totalCalories: 0,
      totalUsers: 0,
      totalCategories: 0,
    },
    mealByCalories: EMPTY_CHART,

    foodsByCategory: [],
    userActivities: EMPTY_CHART,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardStats>('/stats/dashboard')
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error('Dashboard stats error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    ...stats,
  };
}
