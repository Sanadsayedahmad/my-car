import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SignInPage from "../pages/SignInPage";
import SimpleRegistrationPage from "../pages/SimpleRegistrationPage";
import MyCardsPage from "../pages/MyCardsPage";
import MyFavCardsPage from "../pages/MyFavCardsPage";

import { BiHomeAlt } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { GoSignIn } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { CgCardSpades } from "react-icons/cg";

// pages tabs
export const tabs = [
  {
    name: "Home",
    href: "/",
    page: HomePage,
    displayForLoggedin: true,
    icon: <BiHomeAlt color={"white"}></BiHomeAlt>,
  },
  {
    name: "About",
    href: "/about",
    page: AboutPage,
    displayForLoggedin: true,
    icon: <FcAbout></FcAbout>,
  },
  {
    name: "Sign up",
    href: "/simple-registration",
    page: SimpleRegistrationPage,
    displayForLoggedin: false,
    icon: <IoIosAdd color={"white"}></IoIosAdd>,
  },
  {
    name: "My Cars",
    href: "/my-cards",
    page: MyCardsPage,
    displayForLoggedin: true,
    hideForLoggedout: true,
    icon: <CgCardSpades></CgCardSpades>,
  },
  {
    name: "Sign In",
    href: "/sign-in",
    page: SignInPage,
    displayForLoggedin: false,
    icon: <GoSignIn></GoSignIn>,
  },
  {
    name: "My favorite cars",
    href: "/my-fav-cards",
    page: MyFavCardsPage,
    displayForLoggedin: true,
    hideForLoggedout: true,
  },
];
