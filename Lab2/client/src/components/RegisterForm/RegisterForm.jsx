import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router";
import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const navigate = useNavigate();
  const onRegister = useAuthStore((state) => state.register);
  const clearAuthError = useAuthStore((state) => state.clearError);
  const authError = useAuthStore((state) => state.error);
  const authLoading = useAuthStore((state) => state.isLoading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    clearAuthError();
  }, [email, password, clearAuthError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onRegister(name, email, password);
      navigate("/");
    } catch (error) {
      void error;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Реєстрація</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Ім'я:</label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Пошта:</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Пароль:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {authError && <p className={styles.error}>{authError}</p>}

        <button className={styles.button} type="submit" disabled={authLoading}>
          {authLoading ? "Завантаження..." : "Реєстрація"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
