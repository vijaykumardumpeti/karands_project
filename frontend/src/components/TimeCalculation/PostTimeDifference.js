import React, { useState, useEffect } from "react";

const PostTimeDifference = ({ postDateFromMongoDB }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Function to format the date from MongoDB to a human-readable format
    const formatDateFromMongoDB = () => {
      const postDateTime = new Date(postDateFromMongoDB);
      const currentTime = new Date();
      const timeDiffInMillis = currentTime.getTime() - postDateTime.getTime();
      const minutes = Math.floor(timeDiffInMillis / (1000 * 60));
      const hours = Math.floor(timeDiffInMillis / (1000 * 60 * 60));
      const days = Math.floor(timeDiffInMillis / (1000 * 60 * 60 * 24));

      // Format the time difference string
      let timeDiffString = "";

      if (minutes <= 59) {
        timeDiffString = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else if (hours < 24) {
        timeDiffString = `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else if (days === 1) {
        timeDiffString = "1 day ago";
      } else {
        timeDiffString = `${days} days ago`;
      }

      // Update the state with the formatted date
      setFormattedDate(timeDiffString);
    };

    formatDateFromMongoDB();

    // Cleanup function
    return () => {
      // Any cleanup code, if needed
    };
  }, [postDateFromMongoDB]);

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default PostTimeDifference;
