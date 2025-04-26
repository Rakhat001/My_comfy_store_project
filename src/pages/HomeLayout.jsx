import { Outlet } from "react-router-dom"
import { Headers, Navbar, Loading } from "../components"
import { useNavigation } from "react-router-dom"

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.status === 'loading';
  return (
    <>
      <Headers />
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}

    </>
  )
}

export default HomeLayout
