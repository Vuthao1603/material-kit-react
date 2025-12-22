import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export type ProductItemProps = {
  _id: string;
  name: string;
  category: string;
  calories: number;
  imageUrl: string;
  description?: string;
};

export function ProductItem({ product }: { product: ProductItemProps }) {
  return (
    <Card>
      {/* IMAGE */}
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Box
          component="img"
          alt={product.name}
          src={product.imageUrl}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      </Box>

      {/* CONTENT */}
      <Stack spacing={1.5} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>

        <Typography variant="subtitle2">
          🔥 {product.calories} kcal
        </Typography>

        {product.description && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {product.description}
          </Typography>
        )}
      </Stack>
    </Card>
  );
}
