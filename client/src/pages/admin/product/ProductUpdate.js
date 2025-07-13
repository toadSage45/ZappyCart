import React, { useEffect, useRef, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Lenovo", "Microsoft", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.user);
  const { slug } = useParams();
  const navigate = useNavigate();
  const originalCategoryIdRef = useRef("");

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      setValues((prev) => ({ ...prev, ...res.data }));
      originalCategoryIdRef.current = res.data.category._id;

      getCategorySubs(res.data.category._id).then((res2) => {
        setSubOptions(res2.data);
      });

      const subIds = res.data.subs.map((s) => s._id);
      setArrayOfSubIds(subIds);
    });
  };

  const loadCategories = () => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => {
        if (err.response?.status === 400) toast.error(err.response.data);
      });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const originalCategoryId = originalCategoryIdRef.current;

    setValues((prev) => ({ ...prev, subs: [], category: selectedCategoryId }));

    getCategorySubs(selectedCategoryId).then((res) => {
      setSubOptions(res.data);
    });

    if (originalCategoryId === selectedCategoryId) {
      loadProduct();
    }

    setArrayOfSubIds([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubIds;

    updateProduct(slug, values, token)
      .then((res) => {
        setLoading(false);
        toast.success(`🎉 "${res.data.title}" updated successfully`);
        navigate("/admin/products");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response?.data?.err || "Update failed");
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h3 className="mb-4 fw-semibold text-primary">
            {loading ? (
              <span className="text-danger">
                <LoadingOutlined spin /> Updating Product...
              </span>
            ) : (
              <>🛠️ Update Product</>
            )}
          </h3>

          {/* Image Upload */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">🖼️ Upload Images</h5>
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>
          </div>

          {/* Product Update Form */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">📝 Product Details</h5>
              <ProductUpdateForm
                subOptions={subOptions}
                setValues={setValues}
                handleCategoryChange={handleCategoryChange}
                PlusCircleOutlined={<PlusCircleOutlined />}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                categories={categories}
                arrayOfSubIds={arrayOfSubIds}
                setArrayOfSubIds={setArrayOfSubIds}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
