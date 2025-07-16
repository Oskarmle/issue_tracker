"use client";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const loadProfile = async () => {
      const fetchedProfile = await fetchProfile();
      if (fetchedProfile) {
        setProfile(fetchedProfile);
      }
      console.log("Profile loaded:", fetchedProfile);
    };
    loadProfile();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <p>
            Name: {profile.firstName} {profile.lastName}
          </p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
