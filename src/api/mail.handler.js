const sendMail = (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body
    const contentHTLM = `
        <h1>User information ${firstName} ${lastName}</h1>
        <ul>
            <li><p>Mail: ${email}</p></li>
            <li><p>Phone: ${phone}</p></li>
            <li><p>Message: ${message}</p></li>
        </ul>
    `
    console.log(contentHTLM)
    res.send('received')
}

export { sendMail }