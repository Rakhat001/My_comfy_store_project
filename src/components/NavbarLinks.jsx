import { NavLink } from "react-router-dom";
import links from "../links/NavbarLinks";
import { useSelector } from "react-redux";

const NavbarLinks = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
    {links.map((link) =>{
      const {id,url,text} = link;
      if((url === 'checkout' || url === 'order') && !user) return null 
      return(
        <li key={id}>
          <NavLink className='capitalize' to = {url}>
            {text}
          </NavLink>
        </li>
      )
    })}
    </>
  )
}

export default NavbarLinks
