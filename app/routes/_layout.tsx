import { Outlet } from "@remix-run/react";
import { NavBar } from "../components/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
