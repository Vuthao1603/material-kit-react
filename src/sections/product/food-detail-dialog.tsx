import { useState, useEffect } from 'react';

import {
    Box,
    Dialog,
    Button,
    MenuItem,
    TextField,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

// ----------------------------------------------------------------------

export type Product = {
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

const CATEGORY_OPTIONS = [
    'Cơm - Mì - Bún',
    'Thịt - Cá - Hải sản',
    'Rau củ - Trái cây',
    'Đồ uống',
    'Đồ ăn vặt',
    'Khác',
];

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    food: Product | null;
    onClose: () => void;
    onUpdated: () => void;
};

export function FoodDetailDialog({
    open,
    food,
    onClose,
    onUpdated,
}: Props) {
    const [form, setForm] = useState<Product | null>(null);

    // 🔁 sync food → form khi click món khác
    useEffect(() => {
        if (food) {
            setForm(food);
        }
    }, [food]);

    if (!form) return null;

    // ---------------- HANDLERS ----------------

    const handleUpdate = async () => {
        await fetch(`http://localhost:3000/api/foods/${form._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        onUpdated();
        onClose();
    };

    const handleDelete = async () => {
        if (!window.confirm('Xoá món ăn này?')) return;

        await fetch(`http://localhost:3000/api/foods/${form._id}`, {
            method: 'DELETE',
        });

        onUpdated();
        onClose();
    };

    // ---------------- UI ----------------

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Chi tiết món ăn</DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        mt: 2,
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr 1fr',
                        },
                    }}
                >
                    <TextField
                        label="Tên món"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <TextField
                        select
                        label="Danh mục"
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                    >
                        {CATEGORY_OPTIONS.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Calories (kcal)"
                        type="number"
                        value={form.calories}
                        onChange={(e) =>
                            setForm({ ...form, calories: Number(e.target.value) })
                        }
                    />

                    <TextField
                        label="Image URL / Base64"
                        value={form.imageUrl}
                        onChange={(e) =>
                            setForm({ ...form, imageUrl: e.target.value })
                        }
                    />

                    <TextField
                        label="Mô tả"

                        multiline
                        rows={3}
                        value={form.description || ''}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <Typography variant="subtitle1" sx={{ mt: 4, gridColumn: 'span 2' }}>
                        Macronutrients (g)
                    </Typography>

                    {(['protein', 'carbs', 'fat', 'fiber'] as const).map((key) => (
                        <TextField
                            key={key}
                            label={key}
                            type="number"
                            value={form.macronutrients[key]}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    macronutrients: {
                                        ...form.macronutrients,
                                        [key]: Number(e.target.value),
                                    },
                                })
                            }
                        />
                    ))}

                    <Typography variant="subtitle2" sx={{ gridColumn: 'span 2', mt: 5 }}>
                        Micronutrients (g)
                    </Typography>

                    {(['vitaminA', 'vitaminC', 'calcium', 'iron', 'potassium'] as const).map((key) => (
                        <TextField
                            key={key}
                            label={key}
                            type="number"
                            value={form.micronutrients[key]}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    micronutrients: {
                                        ...form.micronutrients,
                                        [key]: Number(e.target.value),
                                    },
                                })
                            }
                        />
                    ))}

                </Box>
            </DialogContent>

            <DialogActions>
                <Button color="error" onClick={handleDelete}>
                    Xoá
                </Button>
                <Button onClick={onClose}>Đóng</Button>
                <Button variant="contained" onClick={handleUpdate}>
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    );
}
