export default function NotFound() {
  return (
    <main className="c64-not-found">
      <pre className="c64-ghost-art">
{`
    ___________
   /           \\
  /   GHOST     \\
 /    404       \\
|    __       __ |
|   /  \\     /  \\|
|  |    |   |    |
|  |    |   |    |
|   \\__/     \\__/ |
 \\________________/
  |_______________|
`}
      </pre>
      <h1 className="c64-page-title">404</h1>
      <p>The ghost ate your page!</p>
      <a href="/" className="btn c64-blue-btn">&#9668; RETURN HOME</a>
    </main>
  );
}
