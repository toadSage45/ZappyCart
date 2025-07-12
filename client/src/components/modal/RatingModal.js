import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RatingModal = ({ children, slug }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [modalVisible, setModalVisible] = useState(false);

    const handleModalOpen = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            navigate("/login", {
                state: { from: `/product/${slug}` },  
            });
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
                {user && user.token ? "Leave rating" : "Login to leave rating"}
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
