const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { activity, date, chatInput, mysessionId } = req.body;

  try {
    // THIS MUST BE THE AVAILABILITY WEBHOOK
    const N8N_AVAILABILITY_URL = "https://teamsport.app.n8n.cloud/webhook/64dc8ba7-3d5b-4516-b708-9e74c8c6f08a";

    const response = await axios.post(
      N8N_AVAILABILITY_URL,
      { activity, date, chatInput, mysessionId },
      { headers: { "Content-Type": "application/json" } }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("ERROR calling n8n (availability):", error?.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to fetch availability",
      detail: error?.response?.data || error.message,
    });
  }
};
