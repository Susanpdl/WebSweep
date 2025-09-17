// Sweep Service for n8n integration
const NGROK_WEBHOOK_URL = "https://860ef85e140c.ngrok-free.app/webhook-test/data-sweep";

export async function sweepData(user) {
  const payload = {
    name: user.name,
    location: user.location,
    email: user.email,
    target_company: user.companyName,
    additional_context: `Account ID: ${user.id}`
  };

  try {
    const response = await fetch(NGROK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("n8n webhook returned error", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Since you currently have only webhook trigger (no explicit response body),
    // the body may be empty. You can still check status.
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = null; // empty or non-JSON response is expected for minimal setup
    }

    console.log("Sweep request sent. Response:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Failed to call n8n webhook", err);
    throw new Error("Failed to send sweep request");
  }
}

// Helper function to format user data for sweep
export function formatUserForSweep(userData) {
  return {
    name: userData.displayName || userData.name || "Unknown",
    location: userData.location || "Unknown",
    email: userData.email || userData.userEmail,
    companyName: userData.companyName || "Unknown",
    id: userData.uid || userData.userId || "Unknown"
  };
} 