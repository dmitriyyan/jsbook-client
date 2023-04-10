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
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          });
        </script>
      </body>
    </html>
  `;

export default previewInitialHtmlCode;
