export const HTMLTemplate = (subject, body) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 600px;
          margin: auto;
        }
        .container h1 {
          color: #333333;
        }
        .container p {
          color: #777777;
          font-size: 16px;
        }
        .container a {
          color: #ffffff;
          text-decoration: none;
          background-color: #007bff;
          padding: 10px 20px;
          border-radius: 4px;
          }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 4px;
        }
        .button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${body}
      </div>
    </body>
    </html>
    `;
};

