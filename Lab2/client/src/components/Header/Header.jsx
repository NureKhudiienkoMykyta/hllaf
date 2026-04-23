import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router";
import { useAuthStore } from "../../store/authStore";

function Header() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const onLogout = useAuthStore((state) => state.logout);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to={"/"} className={styles.title}>
            Мій Блог
          </NavLink>
        </div>

        <div className={styles.actions}>
          {isAuth ? (
            <NavLink
              to={"/"}
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={onLogout}
            >
              Вихід
            </NavLink>
          ) : (
            <>
              <NavLink
                to={"/login"}
                className={`${styles.btn} ${styles.btnGhost}`}
              >
                Увійти
              </NavLink>
              <NavLink
                to={"/register"}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Реєстрація
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
