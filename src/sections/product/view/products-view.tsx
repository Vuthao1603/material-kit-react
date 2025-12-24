import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from '../product-item';
import { FoodTableToolbar } from '../product-toobar';
import { FoodDetailDialog } from '../food-detail-dialog';
import { FoodCreateDialog } from '../food-create-dialog';

// ----------------------------------------------------------------------

type Product = {
  _id: string;
  name: string;
  category: string;
  calories: number;
  imageUrl: string;
  description?: string;
  macronutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  micronutrients: {
    vitaminA: number;
    vitaminC: number;
    calcium: number;
    iron: number;
    potassium: number;
  };
  portionSize: {
    value: number;
    unit: string;
  };
};

// ----------------------------------------------------------------------

export function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Product | null>(null);

  // click món ăn
  const handleSelectFood = (food: Product) => {
    setSelectedFood(food);
    setOpenDetail(true);
  };

  const reloadFoods = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/foods');
      const data = await res.json();
      setProducts(data);
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
    reloadFoods();
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <DashboardContent>
      {/* HEADER */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Foods
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenCreateDialog(true)}
        >
          New food
        </Button>
      </Box>

      {/* TOOLBAR */}
      <FoodTableToolbar
        numSelected={table.selected.length}
        filterName={filterName}
        onFilterName={(event) => {
          setFilterName(event.target.value);
          table.onResetPage();
        }}
      />

      {/* LIST */}
      {loading ? (
        <Typography sx={{ mx: 'auto', mt: 5 }}>
          Đang tải món ăn...
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
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id}
              product={item}
              onClick={handleSelectFood}
            />
          ))}
        </Box>
      )}

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />

      {/* DETAIL DIALOG */}
      <FoodDetailDialog
        open={openDetail}
        food={selectedFood}
        onClose={() => {
          setOpenDetail(false);
          setSelectedFood(null);
        }}
        onUpdated={reloadFoods}
      />

      {/* CREATE DIALOG */}
      <FoodCreateDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onSuccess={reloadFoods}
      />
    </DashboardContent>
  );
}
