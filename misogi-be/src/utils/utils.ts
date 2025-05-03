export const calculatePriorityScore = (
  dueDate: Date,
  weight: number
): number => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const urgencyFactor = diffDays <= 0 ? 100 : Math.max(0, 100 - diffDays * 5)
  const weightFactor = weight * 10

  return Math.min(100, urgencyFactor + weightFactor)
}

export const refreshAccessToken =async (refreshToken: string) => {
  try {
    oauth2Client.setCredentials({ refresh_token: refreshToken })
    const response = await oauth2Client.refreshAccessToken()
    const newAccessToken = response.credentials.access_token
    console.log('New Access Token:', newAccessToken)
    return newAccessToken
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw new Error('Unable to refresh token')
  }
}


import { google } from 'googleapis'; // Import googleapis

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',         // Replace with your Google Client ID
  'YOUR_CLIENT_SECRET',     // Replace with your Google Client Secret
  'YOUR_REDIRECT_URI'       // Replace with your Redirect URI
);

