document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("generate-btn").addEventListener("click", async () => {
  const description = document.getElementById("description").value.trim();
  const vibe = document.getElementById("vibe").value;
  const resultsDiv = document.getElementById("results");

  if (!description) {
    resultsDiv.innerHTML = '<p class="error">Please enter a description</p>';
    return;
  }

  resultsDiv.innerHTML = "<p>Generating your bios...</p>";

  try {
    const response = await fetch("http://localhost:3000/generate-bios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, vibe }),
    });

    const data = await response.json();

    if (data.success) {
      resultsDiv.innerHTML = `
        <h3>Your AI-Generated Bios:</h3>
        <ul>
          ${data.bios.map((bio) => `<li>${bio}</li>`).join("")}
        </ul>
        <p class="rate-limit">Requests left: ${data.rateLimit.remaining}/${
        data.rateLimit.limit
      }</p>
      `;
    } else {
      resultsDiv.innerHTML = `<p class="error">${data.error}</p>`;
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p class="error">Connection failed. Please try again.</p>`;
  }
});
