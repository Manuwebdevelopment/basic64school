"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const { user, isPremium, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.userCell}>
        <button
          className={styles.userBtn}
          onClick={() => setOpen(v => !v)}
        >
          <span className={styles.email}>{user.email}</span>
          {isPremium && <span className={styles.premiumBadge}>★ PREMIUM</span>}
          <span className={styles.arrow}>{open ? '▼' : '▶'}</span>
        </button>
      </div>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownRow}>
            <span className={styles.label}>Account:</span>
            <span className={styles.value}>{user.email}</span>
          </div>
          <div className={styles.dropdownRow}>
            <span className={styles.label}>Plan:</span>
            <span className={`${styles.value} ${isPremium ? styles.premiumValue : styles.freeValue}`}>
              {isPremium ? '★ Premium' : 'Free'}
            </span>
          </div>
          {isPremium && (
            <Link href="/syllabus" className={`${styles.dropdownBtn} ${styles.greenBtn}`} onClick={() => setOpen(false)}>
              &#9650; Continue Learning
            </Link>
          )}
          {!isPremium && (
            <Link href="/premium" className={`${styles.dropdownBtn} ${styles.greenBtn}`} onClick={() => setOpen(false)}>
              &#9650; Upgrade — $25
            </Link>
          )}
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
