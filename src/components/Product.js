import { useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { DELETE_PRODUCT, GET_PRODUCTS} from "./../gql/product";

const Product = ({ product }) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT,  {
    update(cache) {
      const { getProduct } = cache.readQuery({
        query: GET_PRODUCTS,
      });
      cache.evict({ broadcast: false });
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
            getProduct: getProduct.filter(
            (productA) => productA.id !== product.id
          ),
        },
      });
    },
  });
  const history = useHistory();

  const updateProduct = (id) => {
    history.push({
      pathname: `/updateproduct/${id}`,
      query: { id },
    });
  };

  const deleteOneProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteProduct({
            variables: {
              deleteProductId: id,
            },
          });

          Swal.fire("Deleted!", data.deleteProductId, "success");
        } catch (error) {
          console.log("error", error);
        }
      }
    });
  };

  return (
    <tr>
      <td className="table__td">{product.name}</td>
      <td className="table__td">{product.price}</td>
      <td className="table__td">{product.stock}</td>

      <td>
        <button
          className="table__button"
          onClick={() => deleteOneProduct(product.id)}
        >
          Delete
        </button>
      </td>
      <td>
        <button
          className="table__button table__button--upload"
          onClick={() => updateProduct(product.id)}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default Product;
