import React, { FC, useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import { BoardData } from "@/types";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";

import { useSupabase } from "@/hooks/useSupabase";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const CustomModalContent = styled(ModalContent)`
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
`;

const Column: FC<BoardData> = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id });
  const { updateTask, deleteTask } = useSupabase();
  const { control, handleSubmit, getValues, setValue } = useForm();
  const { onOpen } = useDisclosure();
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const { toast } = useToast();

  const openModal = (cardId: string) => {
    setOpenModalId(cardId);
    onOpen();
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  const onUpdate = () => {
    const formData = getValues();

    const { title, description } = formData;
    openModalId && updateTask(+openModalId, { title, description });
    toast({
      title: "You task has been updated:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(formData, null, 2)}
          </code>
        </pre>
      ),
    });
    closeModal();
  };

  const onDelete = () => {
    const formData = getValues();
    openModalId && deleteTask(+openModalId);
    toast({
      title: "You task has been deleted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(formData, null, 2)}
          </code>
        </pre>
      ),
    });
    closeModal();
  };

  return (
    <SortableContext id={id} items={cards || []} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          width: "280px",
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
            fontSize: "15px",
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
            />
            <Modal isOpen={openModalId === card.id} onOpenChange={closeModal}>
              <CustomModalContent>
                <ModalHeader>
                  <span>Edit task</span>
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit(onUpdate)}>
                    <Label htmlFor="text">Title</Label>
                    <div style={{ padding: 5 }} />
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={card.title}
                      render={({ field }) => (
                        <Input
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

                    <Label htmlFor="text">Description</Label>
                    <div style={{ padding: 5 }} />
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={card.description}
                      render={({ field }) => (
                        <Input
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
                  <Button color="warning" variant="ghost" onClick={onDelete}>
                    Delete
                  </Button>
                  <Button color="warning" variant="ghost" onClick={onUpdate}>
                    Save
                  </Button>
                </ModalFooter>
              </CustomModalContent>
            </Modal>
          </div>
        ))}
      </div>
    </SortableContext>
  );
};

export default Column;
