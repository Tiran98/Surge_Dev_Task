import { MailerService } from "@nestjs-modules/mailer";
import { Controller,Get,Query } from "@nestjs/common";

@Controller('email')
export class EmailController {
    constructor(private mailService:MailerService){}

    //Create Email and send mail with the login credentials to the user email
    @Get('/login-mail')
    async loginTextMail(@Query('toemail') toemail, @Query('password') password, @Query('firstName') firstname) {
        const emailText = "Hello " + firstname + "<br>" + "Your password is" + password;
        await this.mailService.sendMail({
            to : toemail,
            from : 'tirandevops98@gmail.com',
            subject : 'Login Credentials for Surge intership Dev Task',
            text : emailText
        });
        return 'Success';
    }
}