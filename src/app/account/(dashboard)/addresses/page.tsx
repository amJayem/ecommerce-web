"use client";

import { useState, useEffect } from "react";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/api/user";
import { UserAddress } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MapPin,
  MoreVertical,
  Trash2,
  Edit2,
  CheckCircle2,
  Loader2,
  MoreHorizontal,
  Home,
  Briefcase,
  Building,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const ADDRESS_TYPES = [
  { id: "Home" as const, icon: Home, label: "Home" },
  { id: "Office" as const, icon: Briefcase, label: "Office" },
  { id: "Other" as const, icon: Building, label: "Other" },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(
    null
  );

  const [formData, setFormData] = useState<Partial<UserAddress>>({
    addressName: "",
    addressType: "Home",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      toast.error("Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleOpenModal = (address?: UserAddress) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        addressName: address.addressName || "",
        addressType: address.addressType || "Home",
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        isDefault: address.isDefault,
      });
    } else {
      setEditingAddress(null);
      setFormData({
        addressName: "",
        addressType: "Home",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        isDefault: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, formData);
        toast.success("Address updated successfully");
      } else {
        await createAddress(formData);
        toast.success("New address added");
      }
      setIsModalOpen(false);
      fetchAddresses();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    // We could use a confirmation dialog here, but for brevity using toast-confirm or simple dialog
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      await deleteAddress(id);
      toast.success("Address deleted");
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddress(id);
      toast.success("Default address updated");
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to set default address");
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight">
            Your Addresses
          </h2>
          <p className="text-gray-500 font-medium">
            Manage where you want your orders delivered.
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-green-700 text-white rounded-2xl h-12 px-6 font-black shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-[2rem] border-2 border-dashed border-gray-100 p-16 text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-300">
            <MapPin className="w-10 h-10" />
          </div>
          <div className="max-w-xs mx-auto space-y-2">
            <h3 className="text-xl font-bold text-gray-900">
              No addresses yet
            </h3>
            <p className="text-gray-500 font-medium">
              Add a shipping address to speed up your checkout process.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => handleOpenModal()}
            className="rounded-xl font-bold border-2"
          >
            Add first address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => {
            const TypeIcon =
              ADDRESS_TYPES.find((t) => t.id === addr.addressType)?.icon ||
              MapPin;
            return (
              <div
                key={addr.id}
                className={cn(
                  "group relative bg-white rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  addr.isDefault
                    ? "border-green-500 shadow-lg shadow-green-50"
                    : "border-gray-100 hover:border-green-200"
                )}
              >
                {addr.isDefault && (
                  <div className="absolute top-4 right-14">
                    <Badge className="bg-green-500 text-white border-0 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                      Default
                    </Badge>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                        addr.isDefault
                          ? "bg-green-500 text-white"
                          : "bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600"
                      )}
                    >
                      <TypeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-lg leading-tight">
                        {addr.addressName || addr.addressType || "Address"}
                      </h3>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {addr.addressType}
                      </p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl h-10 w-10 text-gray-400 hover:text-gray-900"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-2xl p-2 shadow-xl border-gray-100"
                    >
                      <DropdownMenuItem
                        onClick={() => handleOpenModal(addr)}
                        className="rounded-xl font-bold gap-2 py-2.5 cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4 text-blue-500" />
                        Edit Address
                      </DropdownMenuItem>
                      {!addr.isDefault && (
                        <DropdownMenuItem
                          onClick={() => handleSetDefault(addr.id)}
                          className="rounded-xl font-bold gap-2 py-2.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <div className="h-px bg-gray-50 my-1 mx-2" />
                      <DropdownMenuItem
                        onClick={() => handleDelete(addr.id)}
                        className="rounded-xl font-bold gap-2 py-2.5 text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="text-sm font-medium text-gray-600 leading-relaxed">
                      {addr.street}
                      <br />
                      {addr.city}, {addr.state} {addr.zipCode}
                    </div>
                  </div>
                </div>

                {!addr.isDefault && (
                  <div className="mt-6 pt-6 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(addr.id)}
                      className="w-full text-green-600 font-bold hover:bg-green-50 rounded-xl"
                    >
                      Deliver here by default
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg rounded-[2.5rem] p-0 overflow-hidden border-0 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-gray-900">
                  {editingAddress ? "Update Address" : "New Shipping Address"}
                </DialogTitle>
                <DialogDescription className="font-medium text-gray-500">
                  Please provide accurate delivery information to ensure your
                  orders reach you.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-900 ml-1">
                    Address Label
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {ADDRESS_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isActive = formData.addressType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              addressType: type.id as any,
                            }))
                          }
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                            isActive
                              ? "border-green-500 bg-green-50 text-green-600 shadow-md shadow-green-100"
                              : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-black">
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressName">
                      Name this address (Personal, Office, etc.)
                    </Label>
                    <Input
                      id="addressName"
                      placeholder="e.g. My Apartment"
                      value={formData.addressName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          addressName: e.target.value,
                        }))
                      }
                      className="h-12 rounded-xl border-gray-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      required
                      placeholder="House no, street name, area"
                      value={formData.street}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          street: e.target.value,
                        }))
                      }
                      className="h-12 rounded-xl border-gray-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        required
                        placeholder="e.g. Dhaka"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        className="h-12 rounded-xl border-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State / Division</Label>
                      <Input
                        id="state"
                        required
                        placeholder="e.g. Dhaka"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                        className="h-12 rounded-xl border-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Postcode / ZIP</Label>
                      <Input
                        id="zipCode"
                        required
                        placeholder="e.g. 1200"
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            zipCode: e.target.value,
                          }))
                        }
                        className="h-12 rounded-xl border-gray-100"
                      />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                      <input
                        type="checkbox"
                        id="isDefault"
                        checked={formData.isDefault}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isDefault: e.target.checked,
                          }))
                        }
                        className="w-5 h-5 rounded-lg border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                      />
                      <label
                        htmlFor="isDefault"
                        className="text-sm font-bold text-gray-700 cursor-pointer"
                      >
                        Set as default
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="bg-gray-50 p-8 pt-0 sm:pt-0 border-t border-gray-100">
              <div className="flex w-full gap-4 mt-8">
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    className="flex-1 h-14 rounded-2xl font-black text-gray-400 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={isSubmitLoading}
                  className="flex-2 min-w-[200px] h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black shadow-lg shadow-green-100"
                >
                  {isSubmitLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : editingAddress ? (
                    "Update"
                  ) : (
                    "Save Address"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
