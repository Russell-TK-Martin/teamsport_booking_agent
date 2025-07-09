const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { activity, date } = req.body;

  try {
    console.log("Calling n8n webhook with:", { activity, date });

    const response = await axios.post(
      "https://teamsport.app.n8n.cloud/webhook/965713ca-2fae-4c07-8532-e87865f70d3a",
      { activity, date },
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("ERROR calling n8n:", error?.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch availability",
      detail: error?.response?.data || error.message,
    });
  }
};
