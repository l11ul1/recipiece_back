const nodemailer = require("nodemailer");

async function main(){
let testAccount =  await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
var smtpConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // use SSL
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

exports.send = function (from, to, subject, html)
{
	// send mail with defined transport object
	// visit https://nodemailer.com/ for more options
	return transporter.sendMail({
		from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
		to: to, // list of receivers e.g. bar@example.com, baz@example.com
		subject: subject, // Subject line e.g. 'Hello ✔'
		//text: text, // plain text body e.g. Hello world?
		html: html // html body e.g. '<b>Hello world?</b>'
	});
};

}

main().catch(console.error);