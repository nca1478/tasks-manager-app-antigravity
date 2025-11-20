"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useUpdateTask } from "@/application/hooks/use-tasks";
import { Task, TaskPriority, TaskStatus } from "@/domain/entities/task.entity";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditTaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskDialog({
  task,
  open,
  onOpenChange,
}: EditTaskDialogProps) {
  const t = useTranslations();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState("");

  const updateTask = useUpdateTask();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""
      );
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task) return;

    try {
      await updateTask.mutateAsync({
        id: task.id,
        data: {
          title,
          description: description || undefined,
          status,
          priority,
          dueDate: dueDate || undefined,
        },
      });

      onOpenChange(false);
    } catch (error) {
      // Error handled by react-query
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("tasks.editTask")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">{t("tasks.taskTitle")} *</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("tasks.taskTitle")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">
              {t("tasks.taskDescription")}
            </Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("tasks.taskDescription")}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-status">{t("tasks.taskStatus")}</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as TaskStatus)}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder={t("tasks.taskStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TaskStatus.PENDING}>
                    {t("tasks.status.pending")}
                  </SelectItem>
                  <SelectItem value={TaskStatus.IN_PROGRESS}>
                    {t("tasks.status.in_progress")}
                  </SelectItem>
                  <SelectItem value={TaskStatus.COMPLETED}>
                    {t("tasks.status.completed")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-priority">{t("tasks.taskPriority")}</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as TaskPriority)}
              >
                <SelectTrigger id="edit-priority">
                  <SelectValue placeholder={t("tasks.taskPriority")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TaskPriority.LOW}>
                    {t("tasks.priority.low")}
                  </SelectItem>
                  <SelectItem value={TaskPriority.MEDIUM}>
                    {t("tasks.priority.medium")}
                  </SelectItem>
                  <SelectItem value={TaskPriority.HIGH}>
                    {t("tasks.priority.high")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-dueDate">{t("tasks.taskDueDate")}</Label>
            <Input
              id="edit-dueDate"
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
            <Button type="submit" disabled={updateTask.isPending}>
              {updateTask.isPending ? t("common.loading") : t("tasks.editTask")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
