import { profileApi } from '@/entities/Profile/api/ProfileApi'
import { createSelector } from '@reduxjs/toolkit'

export const getProfileData = profileApi.endpoints.getProfile.select()
export const getProfileDataIsStaff = createSelector(
  getProfileData,
  profileResult => profileResult?.data?.isStaff,
)
export const getProfileDataIsTeam = createSelector(
  getProfileData,
  profileResult => profileResult?.data?.isTeam,
)
