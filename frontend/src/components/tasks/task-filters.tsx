"use client";

import { TaskStatus, TaskPriority } from "@/domain/entities/task.entity";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TaskFiltersProps {
  filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };
  onFilterChange: (filters: any) => void;
}

export function TaskFilters({ filters, onFilterChange }: TaskFiltersProps) {
  const t = useTranslations();

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasFilters =
    filters.status || filters.priority || filters.sortBy || filters.sortOrder;

  return (
    <div className="flex flex-wrap gap-3 items-center bg-muted/30 p-4 rounded-lg">
      <div className="flex-1 min-w-[180px]">
        <Select
          value={filters.status || "all"}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              status: value === "all" ? undefined : (value as TaskStatus),
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t("tasks.filters.status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t("tasks.filters.allStatuses")}
            </SelectItem>
            <SelectItem value={TaskStatus.PENDING}>
              {t("tasks.status.Pending")}
            </SelectItem>
            <SelectItem value={TaskStatus.IN_PROGRESS}>
              {t("tasks.status.In Progress")}
            </SelectItem>
            <SelectItem value={TaskStatus.COMPLETED}>
              {t("tasks.status.Completed")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <Select
          value={filters.priority || "all"}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              priority: value === "all" ? undefined : (value as TaskPriority),
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t("tasks.filters.priority")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t("tasks.filters.allPriorities")}
            </SelectItem>
            <SelectItem value={TaskPriority.LOW}>
              {t("tasks.priority.Low")}
            </SelectItem>
            <SelectItem value={TaskPriority.MEDIUM}>
              {t("tasks.priority.Medium")}
            </SelectItem>
            <SelectItem value={TaskPriority.HIGH}>
              {t("tasks.priority.High")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <Select
          value={filters.sortBy || "createdAt"}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              sortBy: value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t("tasks.filters.sortBy")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">
              {t("tasks.filters.createdAt")}
            </SelectItem>
            <SelectItem value="title">{t("tasks.filters.title")}</SelectItem>
            <SelectItem value="priority">
              {t("tasks.filters.priority")}
            </SelectItem>
            <SelectItem value="status">{t("tasks.filters.status")}</SelectItem>
            <SelectItem value="dueDate">
              {t("tasks.filters.dueDate")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <Select
          value={filters.sortOrder || "desc"}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              sortOrder: value as "asc" | "desc",
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t("tasks.filters.sortOrder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">{t("tasks.filters.newest")}</SelectItem>
            <SelectItem value="asc">{t("tasks.filters.oldest")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="flex-shrink-0"
        >
          <X className="h-4 w-4 mr-1" />
          {t("tasks.filters.clear")}
        </Button>
      )}
    </div>
  );
}
