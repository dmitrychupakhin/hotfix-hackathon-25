import { Stack } from '@mui/material'
import HomeAbout from './About/HomeAbout'
import HomeHero from './Hero/HomeHero'

const Home = () => {
  // const [data, setData] = useState<GanttInputItem[]>(sampleData)

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  return (
    <Stack
      spacing={8}
      pb={8}
    >
      <HomeHero />
      <HomeAbout />
      {/* <GanttChart
        data={data}
        onDataChange={setData}
      /> */}
    </Stack>
  )
}

export default Home
