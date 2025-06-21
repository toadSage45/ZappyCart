import React, { useEffect, useRef, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  DeleteFilled,
  EditFilled,
  EditOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocalSearch from "../../../components/forms/LocalSearch";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
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
  //state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(state => state.user)

  const { slug } = useParams();
  const navigate = useNavigate();

  // ref to keep original category ID
  const originalCategoryIdRef = useRef("");

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      console.log("loadProduct-> res- ", res);
      setValues({ ...values, ...res.data });
      originalCategoryIdRef.current = res.data.category._id;

      getCategorySubs(res.data.category._id).then((res2) => {
        setSubOptions(res2.data);
      });

      let arr = [];
      res.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("arr: ", arr);
      setArrayOfSubIds((prev) => arr);
    });
  };

  const loadCategories = () => {
    getCategories()
      .then((c) => {
        setCategories(c.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();

    const selectedCategoryId = e.target.value;
    const originalCategoryId = originalCategoryIdRef.current;

    setValues({ ...values, subs: [], category: selectedCategoryId });

    getCategorySubs(selectedCategoryId).then((res) => {
      setSubOptions(res.data);
    });

    console.log("originalCategoryId: ", originalCategoryId);
    console.log("selectedCategoryId: ", selectedCategoryId);

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
        toast.success(`"${res.data.title}" is updated`);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Update</h4>
          )}
          {/* {JSON.stringify(values.images)} */}
          <hr />

          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <br />

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
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
