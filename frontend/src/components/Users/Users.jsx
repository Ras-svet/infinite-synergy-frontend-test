import React, { useEffect, useState } from "react";
import "./Users.css"
import UserAccount from "../UserAccount/UserAccount";
import api from "../../utils/api";
import { FixedSizeList as List } from 'react-window';

function Users (props) {
  const [ selectedUser, setSelectedUser ] = useState('')
  const [ userList, setUserList ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const size = 10000;
        let pageNumber = 1;
        let totalPages = 100;
        const users = [];

        while (pageNumber <= totalPages) {
          const response = await api.getUsersByPackets(pageNumber, size);
          users.push(...response);
          pageNumber++;
        }

        setUserList(users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  function handleSelectUser(value) {
    setSelectedUser(value)
  }

  function handleUpdateUser(updatedUser) {
    const updatedUserIndex = userList.findIndex(user => user.userId === updatedUser.userId);
    const updatedUserList = [...userList];
    updatedUserList[updatedUserIndex] = updatedUser;
    setUserList(updatedUserList);
  }

  const Row = ({ index, style }) => (
    <div style={style} className="users__list-option" onClick={() => handleSelectUser(userList[index])} data-value={userList[index]}>
      <div>Пользователь {userList[index].userId}</div>
    </div>
  );

  return (
    <div className="users">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <List
          className="users__list"
          height={340}
          itemCount={userList.length}
          itemSize={30}
          width={310}
        >
          {Row}
        </List>
      )}
      <UserAccount user={selectedUser} onHandleUpdateUser={handleUpdateUser}/>
    </div>
  );
}

export default Users;
