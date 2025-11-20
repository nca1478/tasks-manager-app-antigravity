"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCreateTask } from "@/application/hooks/use-tasks";
import { TaskPriority } from "@/domain/entities/task.entity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTaskDialog({
  open,
  onOpenChange,
}: CreateTaskDialogProps) {
  const t = useTranslations();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState("");

  const createTask = useCreateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTask.mutateAsync({
        title,
        description: description || undefined,
        priority,
        dueDate: dueDate || undefined,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setPriority(TaskPriority.MEDIUM);
      setDueDate("");
      onOpenChange(false);
    } catch (error) {
      // Error handled by react-query
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("tasks.newTask")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("tasks.taskTitle")} *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("tasks.taskTitle")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("tasks.taskDescription")}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("tasks.taskDescription")}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">{t("tasks.taskPriority")}</Label>
            <Select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value={TaskPriority.LOW}>
                {t("tasks.priority.low")}
              </option>
              <option value={TaskPriority.MEDIUM}>
                {t("tasks.priority.medium")}
              </option>
              <option value={TaskPriority.HIGH}>
                {t("tasks.priority.high")}
              </option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">{t("tasks.taskDueDate")}</Label>
            <Input
              id="dueDate"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={createTask.isPending}>
              {createTask.isPending ? t("common.loading") : t("tasks.newTask")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
