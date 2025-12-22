import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { ProductItem } from '../product-item';
import { ProductSort } from '../product-sort';
import { CartIcon } from '../product-cart-widget';
import { ProductFilters } from '../product-filters';

import type { FiltersProps } from '../product-filters';

// ----------------------------------------------------------------------

type Product = {
  _id: string;
  name: string;
  category: string;
  calories: number;
  imageUrl: string;
  description?: string;
  macronutrients?: Record<string, number>;
  micronutrients?: Record<string, number>;
  portionSize?: Record<string, number>;
};

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Cơm - Mì - Bún', label: 'Cơm - Mì - Bún' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

// ----------------------------------------------------------------------

export function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState('featured');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  // 🔥 FETCH DATA TỪ COLLECTION foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/foods');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Fetch foods failed', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) =>
      filters[key as keyof FiltersProps] !==
      defaultFilters[key as keyof FiltersProps]
  );

  return (
    <DashboardContent>
      <CartIcon totalItems={products.length} />

      <Typography variant="h4" sx={{ mb: 5 }}>
        Foods
      </Typography>

      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap-reverse',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ my: 1, gap: 1, flexShrink: 0, display: 'flex' }}>
          <ProductFilters
            canReset={canReset}
            filters={filters}
            onSetFilters={handleSetFilters}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={() => setFilters(defaultFilters)}
            options={{
              genders: GENDER_OPTIONS,
              categories: CATEGORY_OPTIONS,
              ratings: RATING_OPTIONS,
              price: PRICE_OPTIONS,
              colors: COLOR_OPTIONS,
            }}
          />

          <ProductSort
            sortBy={sortBy}
            onSort={handleSort}
            options={[
              { value: 'featured', label: 'Featured' },
              { value: 'newest', label: 'Newest' },
              { value: 'caloriesAsc', label: 'Calories: Low - High' },
              { value: 'caloriesDesc', label: 'Calories: High - Low' },
            ]}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {loading && (
          <Typography sx={{ mx: 'auto', mt: 5 }}>
            Đang tải món ăn...
          </Typography>
        )}

        {!loading &&
          products.map((product) => (
            <Grid container spacing={3}>
              {loading && (
                <Typography sx={{ mx: 'auto', mt: 5 }}>
                  Đang tải món ăn...
                </Typography>
              )}

              {loading ? (
                <Typography sx={{ mx: 'auto', mt: 5 }}>
                  Đang tải món ăn...
                </Typography>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(4, 1fr)',
                    },
                  }}
                >
                  {products.map((item) => (
                    <ProductItem key={item._id} product={item} />
                  ))}
                </Box>
              )}

            </Grid>

          ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
