import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RatingModal = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [modalVisible, setModalVisible] = useState(false);

    const handleModalOpen = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            toast.error("Please login to leave a rating.");
            navigate('/login');
        }
    };

    const handleOk = () => {
        setModalVisible(false);
        toast.success("Thanks for your review. It will appear soon.");
    };

    return (
        <>
            <div onClick={handleModalOpen} style={{ cursor: "pointer" }}>
                <StarOutlined className="text-danger" />
                <br />
                {user ? "Leave rating" : "Login to leave rating"}
            </div>

            <Modal
                title="Leave your rating"
                centered
                open={modalVisible}
                onOk={handleOk}
                onCancel={() => setModalVisible(false)}
                okText="Submit"
            >
                {children}
            </Modal>
        </>
    );
};

export default RatingModal;
