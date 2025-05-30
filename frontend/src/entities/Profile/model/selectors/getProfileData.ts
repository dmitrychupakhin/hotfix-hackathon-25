import { profileApi } from '@/entities/Profile/api/ProfileApi';

export const getProfileData = profileApi.endpoints.getProfile.select();
