import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useProductDetails from "../hooks/useProductDetails.js";

const ProductDetails = () => {
  const { product, loading, error } = useProductDetails();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Basic implementation - just showing a console log
    console.log(`Product ${product.id} added to cart`);
    alert(`${product.name} added to cart!`); // Simple feedback
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
          <div className="mt-3">
            <Button variant="primary" onClick={() => navigate(-1)}>
              Back to Products
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          Product not found
          <div className="mt-3">
            <Button variant="primary" onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Back to Products
      </Button>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <div className="ratio ratio-1x1">
              <img
                src={product.pictureUrl}
                alt={product.name}
                className="img-fluid p-3"
                style={{ objectFit: "contain" }}
              />
            </div>
          </Card>
        </Col>

        <Col lg={6}>
          <div className="d-flex flex-column h-100">
            <div className="mb-3">
              {product.isBestSeller && (
                <Badge bg="warning" className="me-2">
                  Bestseller
                </Badge>
              )}
              <Badge bg="secondary">{product.productCategory}</Badge>
            </div>

            <h1 className="mb-3">{product.name}</h1>
            <h3 className="text-primary mb-4">
              {product.price.toFixed(2)} EGP
            </h3>

            <div className="d-flex align-items-center mb-3">
              <div className="text-warning me-2">
                {[...Array(5)].map((_, i) =>
                  product.salesCount > i * 100 ? (
                    <FaStar key={i} />
                  ) : (
                    <FaRegStar key={i} />
                  )
                )}
              </div>
              <span className="text-muted">({product.salesCount} sales)</span>
            </div>

            <div className="mb-4">
              <p className="lead">{product.description}</p>
            </div>

            <div className="mb-4">
              <h5 className="mb-3">Product Details</h5>
              <Row>
                <Col md={6}>
                  <p>
                    <strong>Brand:</strong> {product.productBrand}
                  </p>
                  <p>
                    <strong>Skin Type:</strong>{" "}
                    <Badge bg="light" text="dark">
                      {product.skinType}
                    </Badge>
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Concern:</strong>{" "}
                    <Badge bg="light" text="dark">
                      {product.concern}
                    </Badge>
                  </p>
                  <p>
                    <strong>Added:</strong>{" "}
                    <Badge bg="light" text="dark">
                      <FaCalendarAlt className="me-1" />
                      {format(new Date(product.createdAt), "MMM d, yyyy")}
                    </Badge>
                  </p>
                </Col>
              </Row>
            </div>

            <div className="mt-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-100 py-3"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
