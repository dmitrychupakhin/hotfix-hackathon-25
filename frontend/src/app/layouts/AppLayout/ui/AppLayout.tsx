import { Outlet } from 'react-router'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer sx={{ mt: 8 }} />
    </>
  )
}

export default AppLayout
