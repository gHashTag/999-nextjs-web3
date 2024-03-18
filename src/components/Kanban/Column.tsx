import React, { FC, useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import { BoardData } from "@/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useSupabaseBoard } from "@/hooks/useSupabaseBoard";
import { useForm, Controller } from "react-hook-form";

const Column: FC<BoardData> = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id });
  const { updateTask } = useSupabaseBoard();
  const { control, handleSubmit, getValues, setValue } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const openModal = (cardId: string) => {
    setOpenModalId(cardId);
    onOpen();
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  // const handleInputChange = async (e, fieldName) => {
  //   const fieldValue = e.target.value;
  //   const updatedFields = { [fieldName]: fieldValue };
  //   await updateTask(taskId, updatedFields);
  // };

  const onSubmit = () => {
    const formData = getValues();

    const { title, description } = formData;
    openModalId && updateTask(+openModalId, { title, description });
    closeModal();
  };
  return (
    <SortableContext id={id} items={cards || []} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          width: "300px",
          background: "transparent",
          marginRight: "10px",
          marginBottom: "80px",
        }}
      >
        <p
          style={{
            padding: "5px 40px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757",
            marginBottom: "20px",
          }}
        >
          {title}
        </p>
        {cards?.map((card) => (
          <div key={card.id}>
            <Card
              id={card.id}
              title={card.title}
              description={card.description}
              onClick={() => openModal(card.id)}
              openModal={openModal}
            />

            <Modal isOpen={openModalId === card.id} onOpenChange={closeModal}>
              <ModalContent>
                <ModalHeader>
                  <span>Edit task</span>
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={card.title}
                      render={({ field }) => (
                        <Textarea
                          label="Title"
                          variant="bordered"
                          size="sm"
                          radius="full"
                          labelPlacement="outside"
                          placeholder="Enter your title"
                          className="w-full h-15"
                          {...field}
                          onChange={(e) => {
                            setValue("title", e.target.value);
                          }}
                        />
                      )}
                    />
                    <div style={{ padding: 10 }} />
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={card.description}
                      render={({ field }) => (
                        <Textarea
                          label="Description"
                          variant="bordered"
                          radius="full"
                          labelPlacement="outside"
                          placeholder="Enter your description"
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            setValue("description", e.target.value);
                          }}
                        />
                      )}
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" variant="ghost" onClick={onSubmit}>
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    </SortableContext>
  );
};

export default Column;
