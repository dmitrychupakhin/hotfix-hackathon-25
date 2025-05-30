import VkIcon from '@/shared/assets/icons/VK.svg?react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { initVKAuth } from '../config/vkConfig';

interface VkLoginButtonProps {
  title: string;
  handleVkLogin: () => void;
  disabled: boolean;
}

const VkLoginButton = ({ handleVkLogin, disabled, title }: VkLoginButtonProps) => {
  useEffect(() => {
    initVKAuth();
  }, []);

  return (
    <Button
      onClick={handleVkLogin}
      variant="outlined"
      color="primary"
      startIcon={<VkIcon width="24px" height="24px" />}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};
export default VkLoginButton;
