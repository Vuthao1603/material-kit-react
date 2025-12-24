import { useState } from 'react';

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

const CATEGORY_OPTIONS = [
    'Cơm - Mì - Bún',
    'Thịt - Cá - Hải sản',
    'Rau củ - Trái cây',
    'Đồ uống',
    'Đồ ăn vặt',
    'Khác',
];

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

export function FoodCreateDialog({ open, onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        name: '',
        category: 'Khác',
        calories: '',
        imageUrl: '',
        description: '',
        macronutrients: { protein: 0, carbs: 0, fat: 0, fiber: 0 },
        micronutrients: {
            vitaminA: 0,
            vitaminC: 0,
            calcium: 0,
            iron: 0,
            potassium: 0,
        },
        portionSize: { value: 100, unit: 'g' },
    });
    type FoodForm = {
        name: string;
        category: string;
        calories: string;
        imageUrl: string;
        description: string;

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


    type MacroKey = keyof FoodForm['macronutrients'];
    type MicroKey = keyof FoodForm['micronutrients'];
    type PortionKey = keyof FoodForm['portionSize'];

    function update(
        group: 'macronutrients' | 'micronutrients' | 'portionSize',
        key: MacroKey | MicroKey | PortionKey,
        value: string | number
    ) {
        setForm((prev) => ({
            ...prev,
            [group]: {
                ...prev[group],
                [key]: typeof value === 'string' ? Number(value) : value,
            },
        }));
    }

    const handleSubmit = async () => {
        await fetch('http://localhost:3000/api/foods', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                calories: Number(form.calories),
            }),
        });

        onSuccess(); // ✅ reload list
        onClose();   // ✅ đóng dialog
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Thêm món ăn</DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        mt: 1,
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                    }}
                >
                    {/* BASIC INFO */}
                    <TextField
                        label="Tên món"
                        fullWidth
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <TextField
                        select
                        label="Danh mục"
                        fullWidth
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                        fullWidth
                        onChange={(e) => setForm({ ...form, calories: e.target.value })}
                    />

                    <TextField
                        label="Khẩu phần"
                        type="number"
                        fullWidth
                        value={form.portionSize.value}
                        onChange={(e) => update('portionSize', 'value', e.target.value)}
                    />

                    <TextField
                        label="Đơn vị"
                        fullWidth
                        value={form.portionSize.unit}
                        onChange={(e) => update('portionSize', 'unit', e.target.value)}
                    />

                    <TextField
                        label="Image URL / Base64"
                        fullWidth
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    />

                    <TextField
                        label="Mô tả"
                        multiline
                        rows={2}
                        fullWidth
                        sx={{ gridColumn: '1 / -1' }}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />

                    {/* MACRO */}
                    <Typography variant="subtitle2" sx={{ gridColumn: '1 / -1' }}>
                        Macronutrients (g)
                    </Typography>

                    {(['protein', 'carbs', 'fat', 'fiber'] as const).map((k) => (
                        <TextField
                            key={k}
                            label={k}
                            type="number"
                            fullWidth
                            onChange={(e) => update('macronutrients', k, e.target.value)}
                        />
                    ))}

                    {/* MICRO */}
                    <Typography variant="subtitle2" sx={{ gridColumn: '1 / -1' }}>
                        Micronutrients
                    </Typography>

                    {(
                        ['vitaminA', 'vitaminC', 'calcium', 'iron', 'potassium'] as const
                    ).map((k) => (
                        <TextField
                            key={k}
                            label={k}
                            type="number"
                            fullWidth
                            onChange={(e) => update('micronutrients', k, e.target.value)}
                        />
                    ))}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Huỷ</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}
