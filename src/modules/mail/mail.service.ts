import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import handlebars from 'handlebars';
import { createTransport, getTestMessageUrl } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as path from 'path';

@Injectable()
export class MailService {
  private nodemailer: Mail;

  constructor() {
    console.log(process.env.EMAIL_HOST);
    this.nodemailer = createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(data: {
    options: Mail.Options;
    template: { path: string; params?: any };
  }) {
    const emailTemplateSource = await fs.promises.readFile(
      path.join(
        __dirname,
        `../../../src/modules/mail/templates/${data.template.path}.hbs`,
      ),
      'utf8',
    );

    const template = await handlebars.compile(emailTemplateSource);
    data.options.html = template({ ...data.template.params });

    const emailInfo = await this.nodemailer.sendMail(data.options);

    return emailInfo;
  }
}
