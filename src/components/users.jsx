import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handDelete = (userId) => {
    setUsers((useState) => useState.filter((tag) => tag._id != userId));
  };

  const renderPhrases = (number) => {
    console.log(number);
    if (number > 0) {
      return (
        <h1 className="btn btn-primary fw-bolder m-2">
          {number} человек с тобой потусят сегодня
        </h1>
      );
    } else {
      return (
        <h1 className="btn btn-primary fw-bolder m-2">
          Никто с тобой не потусит
        </h1>
      );
    }
  };

  const classes = "badge bg-";

  if (users.length > 0) {
    // createNewRow();
    return (
      <>
        {renderPhrases(users.length)}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map((object) => {
                      return (
                        <span
                          key={object._id}
                          className={classes + object.color + " me-2"}
                        >
                          {object.name}
                        </span>
                      );
                    })}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}/5</td>
                  <td>
                    <button
                      className="badge bg-danger"
                      onClick={() => {
                        handDelete(user._id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else {
    return <>{renderPhrases(users.length)}</>;
  }
};

export default Users;
