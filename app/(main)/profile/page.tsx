"use client";
import { Heading, Text } from "@radix-ui/themes";
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
      <Heading as="h1">Profile Page</Heading>
      {profile ? (
        <div className="flex flex-col">
          <Text>
            Name: {profile.firstName} {profile.lastName}
          </Text>
          <Text>Email: {profile.email}</Text>
        </div>
      ) : (
        <Text as="p">Loading profile...</Text>
      )}
    </div>
  );
};

export default ProfilePage;
