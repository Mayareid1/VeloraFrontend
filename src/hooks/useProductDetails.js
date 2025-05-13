import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const useProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetails = async () => {
    try {
      if (!id) {
        setError("No product ID provided");
        return;
      }

      setLoading(true);
      const response = await api.get(`/Products/${id}`); // Removed /api if baseURL already has it
      console.log("API Response:", response.data);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch product details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProductDetails();
  }, [id]);

  return {
    product,
    loading,
    error,
    refetch: fetchProductDetails,
  };
};

export default useProductDetails;
