import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';

// Pulse animation
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

// Fade animation
const fade = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

// Shimmer animation
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Styled components
const LoaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  width: '100%',
  height: '100%',
  minHeight: 200,
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(8px)',
}));

const DotWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const Dot = styled(Box)(({ theme, delay = 0 }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  animation: `${pulse} 1.5s ease-in-out infinite`,
  animationDelay: `${delay}ms`,
}));

const ProgressWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 200,
  height: 2,
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '30%',
    height: '100%',
    background: `linear-gradient(
      90deg,
      transparent,
      ${theme.palette.primary.main},
      transparent
    )`,
    animation: `${shimmer} 1.5s infinite`,
  },
}));

const SpinnerWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 40,
  height: 40,
  marginBottom: theme.spacing(2),
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  fontWeight: 500,
  animation: `${fade} 2s ease-in-out infinite`,
  marginTop: theme.spacing(2),
}));

// Loader variants
const variants = {
  dots: ({ text }) => (
    <LoaderWrapper>
      <DotWrapper>
        <Dot delay={0} />
        <Dot delay={200} />
        <Dot delay={400} />
      </DotWrapper>
      {text && <LoadingText variant="body2">{text}</LoadingText>}
    </LoaderWrapper>
  ),

  circular: ({ text }) => (
    <LoaderWrapper>
      <SpinnerWrapper>
        <CircularProgress
          size={40}
          thickness={4}
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
        />
      </SpinnerWrapper>
      {text && <LoadingText variant="body2">{text}</LoadingText>}
    </LoaderWrapper>
  ),

  progress: ({ text }) => (
    <LoaderWrapper>
      <ProgressWrapper />
      {text && <LoadingText variant="body2">{text}</LoadingText>}
    </LoaderWrapper>
  ),

  minimal: ({ text }) => (
    <LoaderWrapper>
      <LoadingText variant="body2">{text}</LoadingText>
    </LoaderWrapper>
  ),
};

const ElegantLoader = ({
  variant = 'circular',
  text = 'Loading...',
  fullScreen = false,
  transparent = false,
}) => {
  const LoaderVariant = variants[variant] || variants.circular;

  return (
    <Box
      sx={{
        position: fullScreen ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: transparent ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: transparent ? 'none' : 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoaderVariant text={text} />
    </Box>
  );
};

export default ElegantLoader;
