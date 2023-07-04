import styles from "./Anchor.module.css";
import { Link } from "react-router-dom";

const Anchor = (props: any) => {
  return (
    <Link to={props.path} className={`${styles["Link"]} ${props.className}`}>
      {props.children}
    </Link>
  );
};

export default Anchor;
