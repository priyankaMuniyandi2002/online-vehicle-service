const nodemailer = require('nodemailer');

const sendEmergencyEmail = async (tomail, booking) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Use environment variables for security
        }
    });

    const emailTemplate = `
        <html>
        <body>
            <h2>🚨 Emergency Booking Alert!</h2>
            <p><strong>User Email:</strong> ${booking.useremail}</p>
            <p><strong>Vehicle ID:</strong> ${booking.vehicleId}</p>
            <p><strong>Status:</strong> ${booking.status}</p>
            <p><strong>Booking Time:</strong> ${new Date(booking.createdAt).toLocaleString()}</p>
            
            <p><strong>Live Location:</strong></p>
            <p>Latitude: ${booking.latitude}, Longitude: ${booking.longitude}</p>
            
            <a href="https://www.google.com/maps?q=${booking.latitude},${booking.longitude}" target="_blank" 
                style="display:inline-block;padding:10px 15px;background:#27ae60;color:white;text-decoration:none;font-size:16px;border-radius:5px;margin-top:10px;">
                📍 View Location on Map
            </a>

            <p>🚑 Please respond to this emergency booking immediately.</p>
            <p>Thank you!</p>
        </body>
        </html>
    `;

    const mailOptions = {
        from: process.env.EMAIL,
        to: tomail,
        subject: '🚨 Emergency Booking Alert',
        html: emailTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Emergency email sent successfully!');
    } catch (error) {
        console.error('Error sending emergency email:', error);
    }
};





const sendBookingEmail = async (booking,role,tomail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Use environment variables for security
        }
    });

    const emailTemplate = `
        <html>
        <body>
            <h2>📅 Booking Confirmation - TAC Service</h2>
            <p>Dear <strong>${booking.customerFirstName} ${booking.customerLastName}</strong>,</p>
            <p>Thank you for booking your service with us. Below are your booking details:</p>

            <div style="background:#f0f0f0;padding:15px;border-radius:5px;">
                <p><strong>Booking Date:</strong> ${booking.bookingDate}</p>
                <p><strong>Service Option:</strong> ${booking.serviceOption}</p>
                <p><strong>Additional Info:</strong> ${booking.addInfo || "N/A"}</p>

                <h3>🚗 Vehicle Details</h3>
                <p><strong>Make:</strong> ${booking.vehicleMake}</p>
                <p><strong>Model:</strong> ${booking.vehicleModel}</p>
                <p><strong>Registration No:</strong> ${booking.vehicleReg}</p>

                <h3>👤 Customer Details</h3>
                <p><strong>Name:</strong> ${booking.customerFirstName} ${booking.customerLastName}</p>
                <p><strong>Contact:</strong> ${booking.customerContactNumber}</p>
                <p><strong>Email:</strong> ${booking.customerEmail}</p>

                <h3>📌 Booking Status</h3>
                <p><strong>Status:</strong> ${booking.status}</p>
            </div>

            <p>We look forward to serving you! If you have any questions, please contact us.</p>

            <p>🚗 <strong>TAC Service Booking Team</strong></p>
        </body>
        </html>
    `;

    let mailOptions;
    if (role == "customer") {
        mailOptions = {
            from: process.env.EMAIL,
            to: booking.customerEmail,
            subject: '📅 Booking Confirmation - TAC Service',
            html: emailTemplate
        };
    } else {

        mailOptions = {
            from: process.env.EMAIL,
            to: tomail, // Replace with actual admin email
            subject: '🚀 New Booking Received - TAC Service',
            html: emailTemplate
        };
    }




    try {

        await transporter.sendMail(mailOptions);
        
        console.log('Booking email sent successfully to user and admin!');
    } catch (error) {
        console.error('Error sending booking email:', error);
    }
};





module.exports = { sendEmergencyEmail, sendBookingEmail };
