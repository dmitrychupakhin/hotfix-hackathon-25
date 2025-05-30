import { Stack } from '@mui/material'
import HomeAbout from './About/HomeAbout'
import HomeHero from './Hero/HomeHero'

const Home = () => {
  return (
    <Stack
      spacing={8}
    >
      <HomeHero />
      <HomeAbout />
    </Stack>
  )
}

export default Home
