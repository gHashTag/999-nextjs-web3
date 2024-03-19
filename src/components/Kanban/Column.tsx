import React, { FC, useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import { BoardData, CardInfo } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSupabaseBoard } from "@/hooks/useSupabaseBoard";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,

  // Textarea,
} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

const Column: FC<BoardData> = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id });
  const { updateTask } = useSupabaseBoard();
  const { control, handleSubmit, getValues, setValue } = useForm();
  const { onOpen } = useDisclosure();
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const openModal = (cardId: string) => {
    setOpenModalId(cardId);
    onOpen();
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

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
              <ModalContent>
                <ModalHeader>
                  <span>Edit task</span>
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="text">Title</Label>
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
