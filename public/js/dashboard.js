document.querySelectorAll(".post form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const postId = event.target.getAttribute("action").split("/").pop();

    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  });
});
