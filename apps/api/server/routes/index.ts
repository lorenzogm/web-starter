import { eventHandler } from "h3";

// Learn more: https://nitro.build/guide/routing
export default eventHandler((event) => {
  event.node.res.setHeader("Content-Type", "text/html");
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Composable Commerce API</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1 {
      color: #333;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
    }
    h2 {
      color: #555;
      margin-top: 30px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 10px 0;
    }
    a {
      color: #007bff;
      text-decoration: none;
      font-size: 16px;
    }
    a:hover {
      text-decoration: underline;
    }
    .method {
      display: inline-block;
      background: #28a745;
      color: white;
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 12px;
      font-weight: bold;
      margin-right: 10px;
    }
  </style>
</head>
<body>
  <h1>Composable Commerce API</h1>

  <h2>Internal Documentation</h2>
  <ul>
    <li><span class="method">GET</span><a href="/_openapi.json">/_openapi.json</a> - OpenAPI Specification</li>
    <li><span class="method">GET</span><a href="/_scalar">/_scalar</a> - Scalar API Documentation</li>
    <li><span class="method">GET</span><a href="/_swagger">/_swagger</a> - Swagger UI Documentation</li>
  </ul>
</body>
</html>
  `;
});
