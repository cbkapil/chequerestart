import nodemailer from 'nodemailer'

export default  async (email, subject, number) => {
	try {
        console.log(process.env.HOST)
		const transporter = nodemailer.createTransport({
			name: "gmail.com",
			host: "smtp.gmail.com",
			service: "gmail.com",
			port: Number(587),
			secure: Boolean(true),
			auth: {
				user: "cbkapil@gmail.com",
				pass: "domlvouuciiwxhbh",
			},
		});
console.log("hello")
console.log(Number)
console.log(subject)
console.log(email)
		await transporter.sendMail({
			from: "cbkapil@gmail.com",
			to: email,
			subject: subject,
			text: number.toString(),
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};