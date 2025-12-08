"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface MyProfileProps {
  userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // --------------------------------------
  // GET PROFILE PHOTO
  // --------------------------------------
  const profilePhoto =
    userInfo.role === "ADMIN"
      ? userInfo.Admin?.profilePhoto
      : userInfo.role === "MODERATOR"
      ? userInfo.Moderator?.profilePhoto
      : userInfo.TravelerProfile?.profilePhoto;

  // --------------------------------------
  // GET PROFILE DATA
  // --------------------------------------
  const profileData =
    userInfo.role === "ADMIN"
      ? userInfo.Admin
      : userInfo.role === "MODERATOR"
      ? userInfo.Moderator
      : userInfo.TravelerProfile;

  // --------------------------------------
  // Convert boolean → string for inputs
  // --------------------------------------
  const getActiveStatus = () => {
    const isActive =
      userInfo.Admin?.isActive ?? userInfo.Moderator?.isActive ?? null;

    if (isActive === null) return "";
    return isActive ? "Active" : "Inactive";
  };

  // --------------------------------------
  // IMAGE PREVIEW
  // --------------------------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // --------------------------------------
  // FORM SUBMIT
  // --------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (result.success) {
        setSuccess(result.message);
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* -------------------------------------- */}
          {/* PROFILE IMAGE CARD */}
          {/* -------------------------------------- */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  {previewImage || profilePhoto ? (
                    <AvatarImage
                      src={previewImage ?? profilePhoto!}
                      alt={userInfo.name}
                    />
                  ) : (
                    <AvatarFallback className="text-3xl">
                      {getInitials(userInfo.name)}
                    </AvatarFallback>
                  )}
                </Avatar>

                {/* Upload Button */}
                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                </label>

                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isPending}
                />
              </div>

              {/* User Info */}
              <div className="text-center">
                <p className="font-semibold text-lg">
                  {profileData?.name || userInfo.name}
                </p>
                <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {userInfo.role.toLowerCase()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* -------------------------------------- */}
          {/* PROFILE INFO */}
          {/* -------------------------------------- */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={profileData?.name || userInfo.name}
                    required
                    disabled={isPending}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={userInfo.email} disabled />
                </div>

                {/* Active Status (Admin / Moderator Only) */}
                {userInfo.role !== "USER" && (
                  <div className="space-y-2 md:col-span-2">
                    <Label>Status</Label>
                    <Input value={getActiveStatus()} disabled />
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
