import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Headers,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateUserUseCase } from "@application/use-cases/user/create-user.use-case";
import { CreateUserDto } from "@application/dtos/user/create-user.dto";
import { LoginDto } from "@application/dtos/auth/login.dto";
import { I18nService } from "nestjs-i18n";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly i18n: I18nService
  ) {}

  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto,
    @Headers("accept-language") lang?: string
  ) {
    const user = await this.createUserUseCase.execute(createUserDto);
    const result = await this.authService.login(user);
    return {
      ...result,
      message: this.i18n.translate("messages.auth.registerSuccess", { lang }),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Request() req,
    @Body() loginDto: LoginDto,
    @Headers("accept-language") lang?: string
  ) {
    const result = await this.authService.login(req.user);
    return {
      ...result,
      message: this.i18n.translate("messages.auth.loginSuccess", { lang }),
    };
  }
}
