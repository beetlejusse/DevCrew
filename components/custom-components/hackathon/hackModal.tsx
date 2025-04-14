"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Code, ImageIcon, Link, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { HackathonData } from "@/types/hacktypes";
import {createHackSchema} from "@/lib/zod";

interface CreateHackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: HackathonData
  ) => Promise<{ success: boolean; error?: string }>;
}

export function CreateHackathonModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateHackathonModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof createHackSchema>>({
    resolver: zodResolver(createHackSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: undefined,
      endDate: undefined, 
      url: "",
      coverPhoto: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof createHackSchema>) => {
    setIsSubmitting(true);

    try {
      if (
        !(data.startDate instanceof Date) ||
        isNaN(data.startDate.getTime())
      ) {
        throw new Error("Invalid start date");
      }
      if (!(data.endDate instanceof Date) || isNaN(data.endDate.getTime())) {
        throw new Error("Invalid end date");
      }

      const formattedData = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };

      const result = await onSubmit(formattedData);

      if (result.success) {
        toast("Success!", { description: "Hackathon created successfully" });
        form.reset();
        onClose();
      } else {
        toast("Error", {
          description: result.error || "Failed to create hackathon",
          action: "destructive",
        });
      }
    } catch (error: any) {
      toast("Error", {
        description: error.message || "Something went wrong",
        action: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-violet-600 dark:bg-violet-800 h-2" />

              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-2xl font-bold flex items-center">
                  <Code className="h-5 w-5 mr-2 text-violet-600 dark:text-violet-400" />
                  Create Hackathon
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 px-6 py-4"
              >
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    placeholder="Hackathon title"
                    {...form.register("title")}
                    className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                  />
                  {form.formState.errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your hackathon"
                    {...form.register("description")}
                    className="resize-none h-24 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                  />
                  {form.formState.errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
                            !form.getValues("startDate") &&
                              "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.getValues("startDate") ? (
                            format(form.getValues("startDate"), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.getValues("startDate")}
                          onSelect={(date) => {
                            if (date) {
                              form.setValue("startDate", date, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {form.formState.errors.startDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {form.formState.errors.startDate.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
                            !form.getValues("endDate") &&
                              "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.getValues("endDate") ? (
                            format(form.getValues("endDate"), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.getValues("endDate")}
                          onSelect={(date) => {
                            if (date) {
                              form.setValue("endDate", date, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {form.formState.errors.endDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {form.formState.errors.endDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="url" className="text-sm font-medium">
                    Website URL
                  </label>
                  <div className="relative">
                    <Input
                      id="url"
                      placeholder="https://yourhackathon.com"
                      {...form.register("url")}
                      className="pl-9 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                    />
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  </div>
                  {form.formState.errors.url && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.url.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="coverPhoto" className="text-sm font-medium">
                    Cover Photo URL <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="coverPhoto"
                      placeholder="https://example.com/image.jpg"
                      {...form.register("coverPhoto")}
                      className="pl-9 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                    />
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  </div>
                  {form.formState.errors.coverPhoto && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.coverPhoto.message}
                    </p>
                  )}
                </div>

                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-zinc-200 dark:border-zinc-700"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Hackathon"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
