import styles from "./SearchBar.module.css";

const SearchBar = ({ value, onChange }) => (
  <div className={styles.searchWrapper}>
    <input
      type="text"
      placeholder="Пошук за назвою або текстом..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.searchInput}
    />
  </div>
);
export default SearchBar;
