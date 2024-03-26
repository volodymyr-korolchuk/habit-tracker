import { useState } from "react";

export const useModal = () => {
  const [isOpened, setOpened] = useState(false);

  const openModal = () => {
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
  };

  const toggleModal = () => {
    setOpened((prev) => !prev);
  };

  return { openModal, closeModal, toggleModal, isOpened };
};
