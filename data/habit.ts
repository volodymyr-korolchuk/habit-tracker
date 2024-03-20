export const createHabit = async (title: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/habits/create`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create habit");
    }

    const data = await response.json();
    return data.habit; // Assuming the habit object is returned in the response
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
