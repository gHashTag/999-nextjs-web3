import React, { FC, useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import { BoardData, CardInfo } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  const [cardInfo, setCardInfo] = useState<CardInfo>({
    title: "",
    id: "",
    description: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: cardInfo.title || "",
      description: cardInfo.description || "",
    },
  });
  console.log(form, "form");
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("click");
    const formData = form.getValues();

    const { title, description } = formData;
    cardInfo.id && updateTask(+cardInfo.id, { title, description });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    // <SortableContext id={id} items={cards || []} strategy={rectSortingStrategy}>
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
          <Dialog>
            <DialogTrigger asChild>
              <Card
                id={card.id}
                title={card.title}
                description={card.description}
                onClick={() => {
                  form.setValue("title", card.title ?? "");
                  form.setValue("description", card.description ?? "");
                  setCardInfo({
                    ...card,
                    title: card.title ?? "",
                    description: card.description ?? "",
                  });
                }}
              />
            </DialogTrigger>
            <DialogContent>
              <div className="mx-auto w-full max-w-sm">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="justify-center items-center"
                  >
                    <Label htmlFor="text">Title</Label>

                    <FormField
                      name="title"
                      control={form.control}
                      render={({ field }) => (
                        <Input
                          placeholder="Enter your title"
                          className="h-15"
                          {...field}
                          onChange={(e) => {
                            form.setValue("title", e.target.value);
                          }}
                        />
                      )}
                    />

                    <div style={{ padding: 10 }} />
                    <Label htmlFor="text">Description</Label>
                    <FormField
                      name="description"
                      control={form.control}
                      defaultValue={card.description}
                      render={({ field }) => (
                        <Input
                          placeholder="Enter your description"
                          className="h-30"
                          {...field}
                          onChange={(e) => {
                            form.setValue("description", e.target.value);
                          }}
                        />
                      )}
                    />
                    <div style={{ padding: 10 }} />
                    <DialogFooter>
                      <Button type="submit">Submit</Button>

                      <Button variant="outline">Cancel</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
    // </SortableContext>
  );
};

export default Column;
