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

type Props = {
  product: ProductItemProps;
  onClick: (food: ProductItemProps) => void;
};

// ----------------------------------------------------------------------

export function ProductItem({ product, onClick }: Props) {
  return (
    <Card
      onClick={() => onClick(product)}
      sx={{
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* IMAGE */}
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Box
          component="img"
          alt={product.name}
          src={product.imageUrl || '/placeholder.png'}
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
      <Stack spacing={1.2} sx={{ p: 2.5 }}>
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
