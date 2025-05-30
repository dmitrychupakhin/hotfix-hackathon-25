import getPagesWithBackgroundZoom from '@/app/layouts/AppBackgroundLayout/model/selectors/getPagesWithBackgroundZoom';
import { useIsCurrentRoute } from '@/shared/lib/hooks/useIsCurrentRoute';
import { MotionBox } from '@/shared/ui/MotionBox';
import { Box, useTheme } from '@mui/material';
import { type FC } from 'react';
import { Outlet } from 'react-router';

interface AppBackgroundLayoutProps {
  backgroundDark?: string;
  backgroundLight?: string;
}

const AppBackgroundLayout: FC<AppBackgroundLayoutProps> = ({ backgroundDark, backgroundLight }) => {
  const isZoom = useIsCurrentRoute(getPagesWithBackgroundZoom());
  const theme = useTheme();
  const zoomSize = `calc(100%)`;

  const currentBackground = theme.palette.mode === 'light' ? backgroundLight : backgroundDark;

  return (
    <Box position="relative" width="100%" overflow="hidden">
      <Box
        position="absolute"
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <MotionBox
          initial={
            !isZoom ? { width: zoomSize, height: zoomSize } : { width: '100%', height: '100%' }
          }
          animate={
            !isZoom ? { width: zoomSize, height: zoomSize } : { width: '100%', height: '100%' }
          }
          sx={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <MotionBox
            initial={isZoom ? { scale: 1, opacity: 0.2 } : { scale: 1 }}
            animate={isZoom ? { scale: 1.2, opacity: 1 } : { scale: 1 }}
            exit={{ scale: 1.2 }}
            transition={{
              scale: { duration: 1.4 },
            }}
            sx={{
              transformOrigin: 'center center',
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: -1,
              overflow: 'hidden',
              display: 'block',
            }}
          >
            <Box
              component="img"
              fetchPriority="high"
              loading="eager"
              src={currentBackground}
              alt="Background"
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                filter: 'brightness(80%)',
              }}
            />
          </MotionBox>
        </MotionBox>
      </Box>
      <Box position="relative">
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppBackgroundLayout;
