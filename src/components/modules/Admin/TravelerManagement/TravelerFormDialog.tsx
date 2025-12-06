// components/modules/Travelers/TravelersManagement/TravelerViewDetailDialog.tsx
"use client";

import InfoRow from "@/components/shared/InoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { ITravelerProfile } from "@/types/TravelerProfile.interface";
import { Calendar, Mail, Phone, User } from "lucide-react";

interface ITravelerViewDialogProps {
  open: boolean;
  onClose: () => void;
  traveler: ITravelerProfile | null;
}

const TravelerViewDetailDialog = ({ open, onClose, traveler }: ITravelerViewDialogProps) => {
  if (!traveler) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Traveler Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={traveler?.profilePhoto || ""} alt={traveler?.name} />
              <AvatarFallback className="text-2xl">{getInitials(traveler?.name || "")}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{traveler?.name}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {traveler?.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant={traveler?.isDeleted ? "destructive" : "default"} className="text-sm">
                  {traveler?.isDeleted ? "Inactive" : "Active"}
                </Badge>

                <Badge variant="secondary" className="text-sm">
                  {traveler.travelStyle || "—"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Contact & Location</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Email" value={traveler?.email || "Not provided"} />
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Location" value={`${traveler?.city || "—"}, ${traveler?.country || "—"}`} />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow label="Joined" value={formatDateTime(traveler?.createdAt || "")} />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Profile Details</h3>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <InfoRow label="Bio" value={traveler?.bio || "—"} />
                <InfoRow label="Age" value={traveler?.age ? String(traveler.age) : "—"} />
                <InfoRow label="Gender" value={traveler?.gender || "—"} />
                <InfoRow label="Interests" value={(traveler?.interests || []).join(", ") || "—"} />
                <InfoRow label="Languages" value={(traveler?.languages || []).join(", ") || "—"} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelerViewDetailDialog;
