import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { MealPlanItem } from '../mealplan-item';


// ----------------------------------------------------------------------

type MealPlan = {
  _id: string;
  title: string;
  caloriesRange: string;
  mealsPerDay: number;
  duration: number;
  image: string;
  description?: string;
};

// ----------------------------------------------------------------------

export function MealPlansView() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  // click mealplan
  const handleSelectPlan = (plan: MealPlan) => {
    setSelectedPlan(plan);
    setOpenDetail(true);
  };

  const reloadMealPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/mealplans');
      const data = await res.json();
      setMealPlans(data);
    } finally {
      setLoading(false);
    }
  };

  // fake table cho toolbar
  const table = {
    selected: [],
    onResetPage: () => { },
  };

  useEffect(() => {
    reloadMealPlans();
  }, []);

  const filteredPlans = mealPlans.filter((item) =>
    item.title.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <DashboardContent>
      {/* HEADER */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Meal Plans
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreateDialog(true)}
        >
          New meal plan
        </Button>
      </Box>



      {/* LIST */}
      {loading ? (
        <Typography sx={{ mx: 'auto', mt: 5 }}>
          Đang tải meal plans...
        </Typography>
      ) : (
        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {filteredPlans.map((item) => (
            <MealPlanItem
              key={item._id}
              mealPlan={item}
              onClick={handleSelectPlan}
            />
          ))}
        </Box>
      )}

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />



    </DashboardContent>
  );
}
