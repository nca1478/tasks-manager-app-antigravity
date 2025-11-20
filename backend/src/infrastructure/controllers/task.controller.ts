import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import { CreateTaskDto } from "@application/dtos/task/create-task.dto";
import { UpdateTaskDto } from "@application/dtos/task/update-task.dto";
import { CreateTaskUseCase } from "@application/use-cases/task/create-task.use-case";
import { GetTasksByUserUseCase } from "@application/use-cases/task/get-tasks-by-user.use-case";
import { GetTaskByIdUseCase } from "@application/use-cases/task/get-task-by-id.use-case";
import { UpdateTaskUseCase } from "@application/use-cases/task/update-task.use-case";
import { DeleteTaskUseCase } from "@application/use-cases/task/delete-task.use-case";
import { I18nService } from "nestjs-i18n";

@Controller("tasks")
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksByUserUseCase: GetTasksByUserUseCase,
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly i18n: I18nService
  ) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: any,
    @Headers("accept-language") lang?: string
  ) {
    const task = await this.createTaskUseCase.execute(
      user.userId,
      createTaskDto
    );
    return {
      ...task,
      message: this.i18n.translate("messages.task.created", { lang }),
    };
  }

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.getTasksByUserUseCase.execute(user.userId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @CurrentUser() user: any) {
    return this.getTaskByIdUseCase.execute(id, user.userId);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: any,
    @Headers("accept-language") lang?: string
  ) {
    const task = await this.updateTaskUseCase.execute(
      id,
      user.userId,
      updateTaskDto
    );
    return {
      ...task,
      message: this.i18n.translate("messages.task.updated", { lang }),
    };
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string,
    @CurrentUser() user: any,
    @Headers("accept-language") lang?: string
  ) {
    await this.deleteTaskUseCase.execute(id, user.userId);
    return {
      message: this.i18n.translate("messages.task.deleted", { lang }),
    };
  }
}
