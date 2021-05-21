const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
		type: "OAuth2",
		user: "recipieceinfo@gmail.com",
        pass: 'Gustavo2021',
		clientId: "778989688285-qbo9pj381764ldepdocjhukiaa0b64g5.apps.googleusercontent.com",
		clientSecret: "KgI4TccDuFT6zjfXR_PmLSyE",
		refreshToken: "1//04tOoB14hXbBmCgYIARAAGAQSNwF-L9Irtyt641-2-09qP53iMoYOh_C4gXY2BLjc-4BFvrFPD-bx1__JMcK1kLRYm7XB4Zt3AmQ",
    }
});

exports.send = async function (from, to, subject, html)
{
	// send mail with defined transport object
	// visit https://nodemailer.com/ for more options
	return await transporter.sendMail({
		from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
		to: to, // list of receivers e.g. bar@example.com, baz@example.com
		subject: subject, // Subject line e.g. 'Hello ✔'
		//text: text, // plain text body e.g. Hello world?
		html: html // html body e.g. '<b>Hello world?</b>'
	});
};

