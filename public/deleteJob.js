import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showJobs } from "./jobs.js";

export const handleDeleteJob = () => {
  const deleteButtons = document.querySelectorAll(".deleteButton");

  deleteButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
      const jobId = event.target.dataset.id;
      try {
        const response = await fetch(`/api/v1/jobs/${jobId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if the response body is empty
        const responseText = await response.text();
        let data = {};
        if (responseText) {
          data = JSON.parse(responseText);
        }

        message.textContent = "The job entry was deleted.";
        showJobs();
      } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred.";
        showJobs();
      }
    });
  });
};

