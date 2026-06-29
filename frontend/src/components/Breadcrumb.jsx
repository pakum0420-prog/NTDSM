import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <div
      style={{
        marginBottom: "20px",
        fontSize: "14px",
        color: "#6c757d"
      }}
    >
      {items.map((item, index) => (
        <span key={index}>
          {item.path ? (
            <Link
              to={item.path}
              style={{
                textDecoration: "none",
                color: "#0d6efd"
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}

          {index !== items.length - 1 &&
            " > "}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;