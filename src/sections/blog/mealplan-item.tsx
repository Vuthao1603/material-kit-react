import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

type Props = {
    mealPlan: any;
    onClick: (plan: any) => void;
};

export function MealPlanItem({ mealPlan, onClick }: Props) {
    return (
        <Card onClick={() => onClick(mealPlan)} sx={{ cursor: 'pointer' }}>
            <CardMedia
                component="img"
                height="160"
                image={mealPlan.image}
                alt={mealPlan.title}
            />
            <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                    {mealPlan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {mealPlan.caloriesRange}
                </Typography>
                <Typography variant="caption">
                    {mealPlan.mealsPerDay} meals/day · {mealPlan.duration} days
                </Typography>
            </CardContent>
        </Card>
    );
}
