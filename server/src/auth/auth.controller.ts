import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './schema/user.schemas';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    // ======
    // SignUp
    // ====== 
    @Post("/signup")
    @UseInterceptors(FileInterceptor('file'))
    async SignUp(
        @Body()
        signUpDto: CreateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<{ token: string,  user: {} }> {

        // Upload image and Returning the image url in the form of object
        const profileImage = await this.authService
            .uploadImage(file)
            .then((data) => {
                return {
                    statusCode: 200,
                    data: data.secure_url,
                };
            })
            .catch((err) => {
                return {
                    statusCode: 400,
                    message: err.message,
                };
            });

            
        return this.authService.signUp(signUpDto, profileImage)
    }

    // ==========                                              
    // Login user
    // ==========                                              

    @Post("/login")
    async login(
        @Body()
        loginDto: loginDto
    ): Promise<{ token: string, user: {} }> {
        return this.authService.login(loginDto)
    }

    // =============================
    // Send Email for reset password
    // =============================
    @Post("password")
    async sendEmailForReset(@Body() body: { email: string }): Promise<{ token: string }> {
        const { email } = body
        return await this.authService.sendEmailResetPassword(email)
    }

    // ==============================
    // verify OTP and reset password
    // ===============================
    @Post("reset-password")
    @UseGuards(JwtAuthGuard)
    async resetPassword(@Body() newPassword: { password: string, opt: string }, @Req() req): Promise<User> {

        return await this.authService.forgetPassword(newPassword, req.user.opt, req.user.user)
    }


}
