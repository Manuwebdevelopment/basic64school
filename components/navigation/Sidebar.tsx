"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import C64Logo from "@/components/design/C64Logo";
import UserMenu from "@/components/auth/UserMenu";
import LoginModal from "@/components/auth/LoginModal";
import { useAuth } from "@/lib/auth-context";
import styles from "./Sidebar.module.css";

const links = [
  { label: "Home", href: "/" },
  { label: "Syllabus", href: "/syllabus" },
  { label: "Games", href: "/game" },
  { label: "Premium", href: "/premium" },
  { label: "About", href: "/about" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className={styles.mobileBtn}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        &#9776;
      </button>
      <nav className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarInner}>
          <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
            <C64Logo />
            <span>BASIC<span className={styles.logoHighlight}>64</span></span>
          </Link>

          <div className={styles.ready}>READY</div>

          <ul className={styles.sidebarLinks}>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${pathname === l.href ? styles.activeLink : styles.link}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth area */}
          <div className={styles.authArea}>
            {!isLoading && (
              user ? (
                <UserMenu />
              ) : (
                <button
                  className={styles.loginBtn}
                  onClick={() => setShowLogin(true)}
                >
                  &#x2795; Login
                </button>
              )
            )}
          </div>

          <div className={styles.footer}>
            <Link href="https://github.com/basic64school" target="_blank" className={styles.githubLink}>
              GitHub &#8618;
            </Link>
            <p className={styles.copy}>&copy; 2026 Basic64 School</p>
          </div>
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </>
  );
}
