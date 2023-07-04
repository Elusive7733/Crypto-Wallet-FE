import styles from "./Button.module.css";

const Button = (props: any) => {
  return (
    <button
      className={`${styles["button"]} ${styles[props.btnClass]} ${
        styles[props.size]
      } ${styles[props.className]}`}
      type={props.type || "submit"}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
