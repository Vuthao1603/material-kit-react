import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useDashboardStats } from 'src/routes/hooks/useDashboardStats';

import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';


export function OverviewAnalyticsView() {
  const {
    loading,
    summary,
    mealByCalories,
    foodsByCategory,
  } = useDashboardStats();



  if (loading) {
    return (
      <DashboardContent
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}
      >
        <CircularProgress />
      </DashboardContent>
    );
  }

  // ✅ MAP CHART DATA ĐÚNG FORMAT
  const mealByCaloriesPie =
    mealByCalories.categories?.map((label, index) => ({
      label,
      value: mealByCalories.series?.[index] ?? 0,
    })) ?? [];



  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* SUMMARY */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Meals"
            total={summary.totalMeals}
            percent={0}
            icon={<img src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Users"
            total={summary.totalUsers}
            percent={0}
            color="secondary"
            icon={<img src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Foods"
            total={summary.totalFoods}
            percent={0}
            color="warning"
            icon={<img src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Calories"
            total={summary.totalCalories}
            percent={0}
            color="error"
            icon={<img src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: [],
              series: [],
            }}
          />
        </Grid>

        {/* PIE – MEAL BY CALORIES */}
        <Grid size={{ xs: 12, md: 6 }}>
          <AnalyticsCurrentVisits
            title="Meals by Calories"
            chart={{
              series: mealByCaloriesPie,
            }}
          />
        </Grid>

        {/* LINE – USER ACTIVITIES */}
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <AnalyticsWebsiteVisits
            title="User Activities"
            subheader="Active users over time"
            chart={{
              categories: userActivities?.categories ?? [],
              series: userActivityLine,
            }}
          />
        </Grid> */}



        {/* PIE – FOOD CATEGORY */}
        <Grid size={{ xs: 12, md: 6 }}>
          <AnalyticsCurrentVisits
            title="Foods by Category"
            chart={{
              series: foodsByCategory ?? [],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
