const nodemialer = require('nodemailer');

class MailService {

  constructor() {
    this.transporter = nodemialer.createTransport({
      host: process.env.HOSTGM,
        port:process.env.PORTGM,
        auth:{
          user: process.env.USER_GMAIL,
          pass:process.env.USER_PASS
        }
    })
  }

  async sendActivationMail(to,link) {
    await this.transporter.sendMail({
      from: `"Ararat-It" <${process.env.USER_GMAIL}>`,
      to,
      subject: '®️🖥✅ Account activation' + process.env.API_URL,
      text: '',
      html:
        `
      <div>
      <h1>To activate, follow the link</h1>
      <a href="${link}">${link}</a>
      </div>
        `
    })
  }

  async sendTaskReminder(to, taskTitle) {
    try {
      await this.transporter.sendMail({
        from: `"Ararat-It" <${process.env.USER_GMAIL}>`,
        to,
        subject: 'Task Reminder',
        text: `Your task "${taskTitle}" is due in 1 hour. Don't forget!`,
        html: `
        <div>
          <h1>Task Reminder</h1>
          <p>Your task "${taskTitle}" is due in 1 hour.</p>
        </div>
      `,
      });
    } catch (error) {
      console.error('Error sending task reminder email:', error);
    }
  }
}

module.exports = new MailService();