import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";

const RatingModal = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [modalVisible, setModalVisible] = useState(false);

  console.log(modalVisible);
  return (
    <div>
      {currentUser ? (
        <p onClick={() => setModalVisible(true)}>Oceń produkt</p>
      ) : (
        "zaloguj się"
      )}
      <Modal
        visible={modalVisible}
        centered
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </div>
  );
};

export default RatingModal;
