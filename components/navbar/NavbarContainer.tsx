import React from 'react';
import { Suspense } from "react";
import { NavbarLoading } from "./NavbarLoading";
import Navbar from "./Navbar";

const NavbarContainer = React.memo(() => {
    // Any async operations can go here
    // await new Promise((r) => setTimeout(r, 5000));
    return (
      <Suspense fallback={<NavbarLoading />}>
        <Navbar />
      </Suspense>
    );
  });

export default NavbarContainer;