import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from '../product-item';


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

export function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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


  return (
    <DashboardContent>

      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Foods
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New food
        </Button>
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
