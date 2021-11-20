import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT, GET_CLIENT_BY_SELLER } from "./../gql/client";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const Client = ({ client }) => {
  const history = useHistory();

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { getClientBySeller } = cache.readQuery({
        query: GET_CLIENT_BY_SELLER,
      });
      cache.evict({ broadcast: false });
      cache.writeQuery({
        query: GET_CLIENT_BY_SELLER,
        data: {
          getClientBySeller: getClientBySeller.filter(
            (clientA) => clientA.id !== client.id
          ),
        },
      });
    },
  });

  const deleteOneClient = (id) => {
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
          const { data } = await deleteClient({
            variables: {
              deleteClientId: id,
            },
          });

          Swal.fire("Deleted!", data.deleteClient, "success");
        } catch (error) {
          console.log("error", error);
        }
      }
    });
  };

  const updateClient = (id) => {
    history.push({
      pathname: `/updateclient/${id}`,
      query: {id}
    });
  };

  return (
    <tr>
      <td className="table__td">
        {client.name} {client.surName}
      </td>
      <td className="table__td">{client.email}</td>
      <td className="table__td">{client.company}</td>
      <td className="table__td">{client.phone}</td>
      <td>
        <button
          className="table__button"
          onClick={() => deleteOneClient(client.id)}
        >
          Delete
        </button>
      </td>
      <td>
        <button
          className="table__button table__button--upload"
          onClick={() => updateClient(client.id)}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default Client;
