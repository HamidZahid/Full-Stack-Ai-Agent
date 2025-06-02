import { NonRetriableError } from "inngest";
import User from "../../models/user";
import { inngest } from "../client";
import { sendMail } from "../../utils/nodemailer";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;
      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError("User No Longer Exists In DataBase");
        }
        return userObject;
      });
      await step.run("send-welcome-email", async () => {
        const subject = `Welcome To the app`;
        const message = `Hi,
        /n/n/n
        Thanks For Singing Up.... We're Glad TO Have You Here....!
        `;
        await sendMail(user.email, subject, message);
      });
      return {success: true}
    } catch (error) {
        console.error("Something Went Wrong!")
    }
  }
);
