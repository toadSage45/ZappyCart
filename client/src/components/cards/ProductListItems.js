import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between">
        Price
        <span className="value">₹{price}</span>
      </li>

      {category && (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Category
          <Link to={`/category/${category.slug}`} className="badge bg-secondary text-decoration-none">
            {category.name}
          </Link>
        </li>
      )}

      {subs && subs.length > 0 && (
        <li className="list-group-item d-flex justify-content-between align-items-start">
          Sub Categories
          <span className="d-flex flex-wrap justify-content-end gap-1" style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {subs.map((s) => (
              <Link key={s._id} to={`/sub/${s.slug}`} className="badge bg-secondary text-decoration-none">
                {s.name}
              </Link>
            ))}
          </span>
        </li>
      )}

      <li className="list-group-item d-flex justify-content-between">
        Shipping
        <span className="value">{shipping}</span>
      </li>

      <li className="list-group-item d-flex justify-content-between">
        Color
        <span className="value">{color}</span>
      </li>

      <li className="list-group-item d-flex justify-content-between">
        Brand
        <span className="value">{brand}</span>
      </li>

      <li className="list-group-item d-flex justify-content-between">
        Available
        <span className="value">{quantity}</span>
      </li>

      <li className="list-group-item d-flex justify-content-between">
        Sold
        <span className="value">{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
