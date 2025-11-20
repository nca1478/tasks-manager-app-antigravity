"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Task, TaskStatus, TaskPriority } from "@/domain/entities/task.entity";
import { useDeleteTask } from "@/application/hooks/use-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { EditTaskDialog } from "./edit-task-dialog";

interface TaskCardProps {
  task: Task;
}

const statusColors = {
  [TaskStatus.PENDING]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  [TaskStatus.IN_PROGRESS]:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  [TaskStatus.COMPLETED]:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const priorityColors = {
  [TaskPriority.LOW]:
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  [TaskPriority.MEDIUM]:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  [TaskPriority.HIGH]:
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function TaskCard({ task }: TaskCardProps) {
  const t = useTranslations();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const deleteTask = useDeleteTask();

  const handleDelete = async () => {
    if (confirm(t("tasks.deleteConfirm"))) {
      await deleteTask.mutateAsync(task.id);
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditOpen(true)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDelete}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                statusColors[task.status]
              }`}
            >
              {t(`tasks.status.${task.status}`)}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                priorityColors[task.priority]
              }`}
            >
              {t(`tasks.priority.${task.priority}`)}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {task.description && (
            <p className="text-sm text-muted-foreground mb-3">
              {task.description}
            </p>
          )}
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Due: {format(new Date(task.dueDate), "PPp")}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Created: {format(new Date(task.createdAt), "PP")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        task={task}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
