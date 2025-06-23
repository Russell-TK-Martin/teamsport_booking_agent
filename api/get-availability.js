const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { activity, date } = req.body;

  try {
    const response = await axios.post(
      "https://teamsport.app.n8n.cloud/webhook-test/availability",
      { activity, date },
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch availability" });
  }
};
