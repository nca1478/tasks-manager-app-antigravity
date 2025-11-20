"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/application/stores/auth.store";
import { useTasks } from "@/application/hooks/use-tasks";
import { TaskFilters as TaskFiltersType } from "@/infrastructure/api/task.api";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/tasks/task-card";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";
import { TaskFilters } from "@/components/tasks/task-filters";
import { Plus, Loader2 } from "lucide-react";

export default function TasksPage() {
  const router = useRouter();
  const t = useTranslations();
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const [filters, setFilters] = useState<TaskFiltersType>({});
  const { data: tasks, isLoading } = useTasks(filters);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [_hasHydrated, isAuthenticated, router]);

  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout>
      <Header title={t("tasks.title")} />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">{t("tasks.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("dashboard.overview")}
            </p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t("tasks.newTask")}
          </Button>
        </div>

        <TaskFilters filters={filters} onFilterChange={setFilters} />

        <div className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : tasks && tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{t("tasks.noTasks")}</p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t("tasks.newTask")}
              </Button>
            </div>
          )}
        </div>

        <CreateTaskDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      </div>
    </DashboardLayout>
  );
}
