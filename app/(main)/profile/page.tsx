"use client";
import React, { useState } from "react";

type ProfileProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileProps>();
  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/auth/users");
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  React.useEffect(() => {
    const loadProfile = async () => {
      const fetchedProfile = await fetchProfile();
      if (fetchedProfile) {
        setProfile(fetchedProfile);
      }
      console.log("Profile loaded:", fetchedProfile);
    };
    loadProfile();
  }, []);

  return <div>ProfilePage</div>;
};

export default ProfilePage;
