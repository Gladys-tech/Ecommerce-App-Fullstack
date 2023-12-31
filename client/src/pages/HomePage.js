import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import ImageSlider from "../components/Slides/ImageSlider";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };



  // Function to get products for the current page
  const getProductsForPage = async (pageNumber) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${pageNumber}`);
      setLoading(false);
      return data.products;
    } catch (error) {
      setLoading(false);
      console.log(error);
      return [];
    }
  };

  // Function to load more products for the next page
  const loadMore = async () => {
    const nextPage = page + 1;
    const newProducts = await getProductsForPage(nextPage);
    if (newProducts.length > 0) {
      setProducts(newProducts);
      setPage(nextPage);
    }
  };

  // Function to load products for the previous page
  const loadPrevious = async () => {
    if (page > 1) {
      const previousPage = page - 1;
      const newProducts = await getProductsForPage(previousPage);
      if (newProducts.length > 0) {
        setProducts(newProducts);
        setPage(previousPage);
      }
    }
  };

  // Initial loading of products
  useEffect(() => {
    getProductsForPage(page).then((data) => setProducts(data));
    getAllCategory();
    getTotal();
  }, [page]);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);


  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"ALL Products - Best offers "}>
      {/* banner image */}
      <div>
        <ImageSlider />
      </div>

      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center" style={{ color: 'green', textDecoration: 'underline', textDecorationColor: 'green'}}>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "UGX",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  {p.stockQuantity === 0 ? (
                    <span className="text-danger">Out of Stock</span>
                  ) : null}
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        // Check if the product is already in the cart
                        const isProductInCart = cart.some((item) => item._id === p._id);

                        if (!isProductInCart) {
                          // If not in cart, add it
                          setCart([...cart, p]);
                          localStorage.setItem("cart", JSON.stringify([...cart, p]));
                          toast.success("Item Added to cart");
                        } else {
                          // If already in cart, show a message or handle it as needed
                          toast.error("Item is already in the cart");
                        }
                      }}
                    >
                      ADD TO CART
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" p-3">
            <div className="pagination-buttons">
              <button
                className="btn "
                onClick={() => loadPrevious()}
                disabled={page === 1}
                
              >
                Previous
              </button>
              <button
                className="btn "
                onClick={() => loadMore()}
                disabled={products && products.length >= total}
              >
                Loadmore <AiOutlineReload />
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default HomePage;