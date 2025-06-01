import { Outlet } from 'react-router'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { useIsCurrentRoute } from '@/shared/lib/hooks/useIsCurrentRoute'
import getPagesWithFooter from '../model/selectors/getPagesWithFooter'

const AppLayout = () => {
  const isFooterShow = useIsCurrentRoute(getPagesWithFooter())
  return (
    <>
      <Header />
      <Outlet />
      {isFooterShow && <Footer />}
    </>
  )
}

export default AppLayout
