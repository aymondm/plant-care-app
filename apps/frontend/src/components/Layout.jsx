import React from "react";
import { Outlet, Link } from "react-router-dom";

// this component displays the header and navigation for each page

function Layout() {
  return (
    <>
      <header className="site-header">
        <h1>Plant Care App</h1>
        <nav className="site-nav">
          <Link to="/">Home</Link> | <Link to="/add">Add Plant</Link>
        </nav>
      </header>
      <main>
        <Outlet /> {/* renders whichever child route is active */}
      </main>
    </>
  );
}

export default Layout;
