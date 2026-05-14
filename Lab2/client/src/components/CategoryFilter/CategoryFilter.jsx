import styles from "./CategoryFilter.module.css";

const CategoryFilter = ({ categories, selected, onSelect }) => (
  <div className={styles.filterContainer}>
    <button
      className={selected === "" ? styles.active : ""}
      onClick={() => onSelect("")}
    >
      Усі
    </button>
    {categories.map((cat) => (
      <button
        key={cat.id}
        className={selected === cat.id ? styles.active : ""}
        onClick={() => onSelect(cat.id)}
      >
        {cat.name}
      </button>
    ))}
  </div>
);
export default CategoryFilter;
