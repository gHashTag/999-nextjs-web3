// TaskModal.js
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";
import { useSupabaseBoard } from "@/hooks/useSupabaseBoard";

type Modal = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

function TaskModal({ isOpen, onOpen, onOpenChange }: Modal) {
  const { createTask } = useSupabaseBoard();
  const { toast } = useToast();
  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onCreate = () => {
    const formData = getValues();
    console.log("formData", formData);
    const { title, description } = formData;

    createTask({ title, description });
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
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Button onClick={onOpen}>Open Modal</Button>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <span>Create task</span>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onCreate)}>
                <Label htmlFor="text">Title</Label>
                <Controller
                  name="title"
                  control={control}
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
              <Button color="warning" variant="ghost" onClick={onCreate}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default TaskModal;
