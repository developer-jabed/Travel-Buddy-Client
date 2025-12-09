"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { IAdmin } from "@/types/Admin.interface";
import { ITravelerProfile } from "@/types/TravelerProfile.interface";
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
  const [fileData, setFileData] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isTraveler = userInfo.role === "USER";

  const profilePhoto = isTraveler
    ? userInfo.TravelerProfile?.profilePhoto
    : userInfo.Admin?.profilePhoto;

  const profileData: ITravelerProfile | IAdmin | undefined = isTraveler
    ? userInfo.TravelerProfile ?? undefined
    : userInfo.Admin ?? undefined;

  // IMAGE PREVIEW
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileData(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = new FormData();

    const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
      .value;

    form.append("name", name);

    if (isTraveler) {
      const travelerProfile = profileData as ITravelerProfile;

      const fields = [
        "bio",
        "interests",
        "languages",
        "age",
        "gender",
        "travelStyle",
        "city",
        "country",
      ];

      fields.forEach((field) => {
        const input = e.currentTarget.elements.namedItem(
          field
        ) as HTMLInputElement | null;
        if (input && input.value !== "") {
          form.append(field, input.value);
        }
      });
    }

    if (fileData) {
      form.append("file", fileData);
    }

    startTransition(async () => {
      const result = await updateMyProfile(form);

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
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground text-base">
          Update your personal information and account details.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-10 lg:grid-cols-3">
          {/* PROFILE IMAGE */}
          <Card className="shadow-md border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Profile Picture
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-5">
              <div className="relative group">
                <Avatar className="h-36 w-36 ring-4 ring-primary/20 shadow-lg">
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

                <label
                  htmlFor="file"
                  className="absolute bottom-2 right-2 bg-primary text-primary-foreground 
                          rounded-full p-3 cursor-pointer shadow-md hover:scale-110 transition-all"
                >
                  <Camera className="h-5 w-5" />
                </label>

                <Input
                  id="file"
                  type="file"
                  name="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isPending}
                />
              </div>

              <div className="text-center space-y-1">
                <p className="font-semibold text-lg">
                  {profileData?.name || userInfo.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {userInfo.email}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* DETAILS */}
          <Card className="lg:col-span-2 shadow-md border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Personal Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
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

              {/* NAME + EMAIL */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <Label className="font-medium text-sm">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={profileData?.name || userInfo.name}
                    disabled={isPending}
                    className="h-11"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label className="font-medium text-sm">Email</Label>
                  <Input className="h-11" value={userInfo.email} disabled />
                </div>
              </div>

              {/* TRAVELER FIELDS */}
              {isTraveler && (
                <div className="grid gap-6 md:grid-cols-2">
                  {/* BIO */}
                  <div className="flex flex-col space-y-2 md:col-span-2">
                    <Label>Bio</Label>
                    <Textarea
                      name="bio"
                      rows={4}
                      defaultValue={
                        (profileData as ITravelerProfile)?.bio ?? ""
                      }
                      disabled={isPending}
                    />
                  </div>

                  <Input
                    name="interests"
                    defaultValue={
                      (profileData as ITravelerProfile)?.interests?.join(", ") ??
                      ""
                    }
                    disabled={isPending}
                    className="h-11"
                  />

                  <Input
                    name="languages"
                    defaultValue={
                      (profileData as ITravelerProfile)?.languages?.join(", ") ??
                      ""
                    }
                    disabled={isPending}
                    className="h-11"
                  />

                  <Input
                    name="age"
                    type="number"
                    defaultValue={
                      (profileData as ITravelerProfile)?.age ?? ""
                    }
                    disabled={isPending}
                    className="h-11"
                  />

                  <Input
                    name="gender"
                    defaultValue={
                      (profileData as ITravelerProfile)?.gender ?? ""
                    }
                    disabled={isPending}
                    className="h-11"
                  />

                  <Input
                    name="travelStyle"
                    defaultValue={
                      (profileData as ITravelerProfile)?.travelStyle ?? ""
                    }
                    disabled={isPending}
                    className="h-11"
                  />

                  <Input
                    name="city"
                    defaultValue={
                      (profileData as ITravelerProfile)?.city ?? ""
                    }
                    disabled={isPending}
                    className="h-11"
                  />

                  <Input
                    name="country"
                    defaultValue={
                      (profileData as ITravelerProfile)?.country ?? ""
                    }
                    disabled={isPending}
                    className="h-11"
                  />
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button
                  disabled={isPending}
                  className="h-11 px-6 text-base font-medium shadow-sm"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
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
