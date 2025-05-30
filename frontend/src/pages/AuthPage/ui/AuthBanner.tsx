import { Stack, Typography } from '@mui/material';

const AuthBanner = () => {
    return (
        <Stack spacing={2}>
            <Typography variant="h1" fontWeight={600} component="h2">
                Будь тем, кто поднимается выше, когда остальные сомневаются!
            </Typography>
        </Stack>
    );
};

export default AuthBanner;
