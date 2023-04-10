const previewInitialHtmlCode = `
    <html>
      <head>
        <style>
          body {
            background-color: #f5f5f5;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          });

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });
        </script>
      </body>
    </html>
  `;

export default previewInitialHtmlCode;
