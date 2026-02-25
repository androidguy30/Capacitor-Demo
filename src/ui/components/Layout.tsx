import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">Game Hub</h1>
      </header>
      <main className="app-main">{children}</main>
      <nav className="app-bottom-nav">
        <NavLink to="/" end className="app-nav-link">
          Home
        </NavLink>
        <NavLink to="/games" className="app-nav-link">
          Games
        </NavLink>
        <NavLink to="/settings" className="app-nav-link">
          Settings
        </NavLink>
      </nav>
    </div>
  );
}

