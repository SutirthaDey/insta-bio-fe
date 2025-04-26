document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const resultsDiv = document.getElementById("results");
  const yearSpan = document.getElementById("year");

  // Set current year in footer
  yearSpan.textContent = new Date().getFullYear();

  generateBtn.addEventListener("click", async () => {
    const description = document.getElementById("description").value.trim();
    const vibe = document.getElementById("vibe").value;
    const type = document.getElementById("category").value;

    if (!description) {
      resultsDiv.innerHTML = `<p class="error">Please enter a description!</p>`;
      return;
    }

    resultsDiv.innerHTML = "⏳ Generating bios...";

    try {
      const response = await fetch(
        "https://api.instabiogen.com/generate-bios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description, vibe, type }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      resultsDiv.innerHTML = `
          <h3>✨ Your AI-generated bios:</h3>
          <ul>
            ${data.bios
              .map((bio) => `<li onclick="copyToClipboard(this)">${bio}</li>`)
              .join("")}
          </ul>
          <p style="font-size: 0.85rem; color: #777;">Click a bio to copy it</p>
        `;
    } catch (err) {
      resultsDiv.innerHTML = `<p class="error">❌ ${err.message}</p>`;
    }
  });
});

// Copy to clipboard
window.copyToClipboard = (el) => {
  const text = el.textContent;
  navigator.clipboard.writeText(text).then(() => {
    el.classList.add("copied");
    el.textContent = "✅ Copied!";
    setTimeout(() => {
      el.classList.remove("copied");
      el.textContent = text;
    }, 1500);
  });
};
