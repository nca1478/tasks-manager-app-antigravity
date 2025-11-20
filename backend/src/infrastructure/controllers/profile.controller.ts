import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  Headers,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import { UpdateProfileDto } from "@application/dtos/user/update-profile.dto";
import { ChangePasswordDto } from "@application/dtos/user/change-password.dto";
import { GetUserProfileUseCase } from "@application/use-cases/user/get-user-profile.use-case";
import { UpdateProfileUseCase } from "@application/use-cases/user/update-profile.use-case";
import { ChangePasswordUseCase } from "@application/use-cases/user/change-password.use-case";
import { I18nService } from "nestjs-i18n";

@Controller("profile")
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly i18n: I18nService
  ) {}

  @Get()
  async getProfile(@CurrentUser() user: any) {
    const profile = await this.getUserProfileUseCase.execute(user.userId);
    // Don't send password to client
    const { password, ...profileWithoutPassword } = profile;
    return profileWithoutPassword;
  }

  @Put()
  async updateProfile(
    @CurrentUser() user: any,
    @Body() updateProfileDto: UpdateProfileDto,
    @Headers("accept-language") lang?: string
  ) {
    const updatedProfile = await this.updateProfileUseCase.execute(
      user.userId,
      updateProfileDto
    );
    const { password, ...profileWithoutPassword } = updatedProfile;
    return {
      ...profileWithoutPassword,
      message: this.i18n.translate("messages.profile.updated", { lang }),
    };
  }

  @Post("change-password")
  async changePassword(
    @CurrentUser() user: any,
    @Body() changePasswordDto: ChangePasswordDto,
    @Headers("accept-language") lang?: string
  ) {
    await this.changePasswordUseCase.execute(user.userId, changePasswordDto);
    return {
      message: this.i18n.translate("messages.profile.passwordChanged", {
        lang,
      }),
    };
  }
}
