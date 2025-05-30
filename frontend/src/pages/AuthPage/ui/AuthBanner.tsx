import { Stack, Typography } from '@mui/material';

const AuthBanner = () => {
    return (
        <Stack spacing={2}>
            <Typography variant="h1" fontWeight={600} component="h2" sx={(theme) => ({
                color: theme.palette.invertedSecondary.dark,
            })}>
                Здесь начинается путь от идеи к рабочему решению.
            </Typography>
        </Stack>
    );
};

export default AuthBanner;
