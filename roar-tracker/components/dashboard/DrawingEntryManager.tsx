"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Entry {
  id?: string;
  participant_name: string;
  entry_count: number;
  payment_received: boolean;
  payment_method: string | null;
  notes: string | null;
}

interface DrawingEntryManagerProps {
  drawingId: string;
  existingEntries: Entry[];
  onSave: (entries: Entry[]) => Promise<void>;
}

export default function DrawingEntryManager({
  drawingId,
  existingEntries,
  onSave,
}: DrawingEntryManagerProps) {
  const [entries, setEntries] = useState<Entry[]>(existingEntries);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        participant_name: "",
        entry_count: 1,
        payment_received: false,
        payment_method: null,
        notes: null,
      },
    ]);
    setIsEditing(true);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof Entry, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(entries.filter((e) => e.participant_name.trim() !== ""));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving entries:", error);
      alert("Failed to save entries. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEntries(existingEntries);
    setIsEditing(false);
  };

  const totalEntries = entries.reduce((sum, e) => sum + e.entry_count, 0);
  const paidEntries = entries.filter((e) => e.payment_received).length;

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gray-600">
              {entries.length} participants • {totalEntries} total entries • {paidEntries} paid
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="w-full sm:w-auto shrink-0"
          >
            Manage Entries
          </Button>
        </div>

        {/* Entries List */}
        {entries.length > 0 && (
          <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Name</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Entries</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Status</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Method</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700 bg-white dark:bg-gray-900">
                  {entries.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-3 py-2 font-medium dark:text-gray-100">{entry.participant_name}</td>
                      <td className="px-3 py-2 dark:text-gray-200">{entry.entry_count}</td>
                      <td className="px-3 py-2">
                        {entry.payment_received ? (
                          <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Paid
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 text-xs">
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="px-3 py-2 dark:text-gray-200">
                        {entry.payment_method ? (
                          <span className="capitalize">{entry.payment_method}</span>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                        {entry.notes || <span className="text-gray-400 dark:text-gray-500">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manage Drawing Entries</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#0076B6] hover:bg-[#0076B6]/90"
            >
              <Check className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 p-3 bg-gray-50 rounded border"
            >
              {/* Name */}
              <div className="col-span-3">
                <Label htmlFor={`name-${index}`} className="text-xs">
                  Name
                </Label>
                <Input
                  id={`name-${index}`}
                  value={entry.participant_name}
                  onChange={(e) =>
                    updateEntry(index, "participant_name", e.target.value)
                  }
                  placeholder="Participant name"
                  className="h-8"
                />
              </div>

              {/* Entry Count */}
              <div className="col-span-2">
                <Label htmlFor={`count-${index}`} className="text-xs">
                  Entries
                </Label>
                <Input
                  id={`count-${index}`}
                  type="number"
                  min="1"
                  value={entry.entry_count}
                  onChange={(e) =>
                    updateEntry(index, "entry_count", parseInt(e.target.value) || 1)
                  }
                  className="h-8"
                />
              </div>

              {/* Payment Method */}
              <div className="col-span-2">
                <Label htmlFor={`method-${index}`} className="text-xs">
                  Method
                </Label>
                <Select
                  value={entry.payment_method || "none"}
                  onValueChange={(value) =>
                    updateEntry(
                      index,
                      "payment_method",
                      value === "none" ? null : value
                    )
                  }
                >
                  <SelectTrigger id={`method-${index}`} className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">-</SelectItem>
                    <SelectItem value="venmo">Venmo</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="zelle">Zelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Received */}
              <div className="col-span-2 flex items-end">
                <div className="flex items-center gap-2 h-8">
                  <input
                    type="checkbox"
                    id={`paid-${index}`}
                    checked={entry.payment_received}
                    onChange={(e) =>
                      updateEntry(index, "payment_received", e.target.checked)
                    }
                    className="w-4 h-4 text-[#0076B6] border-gray-300 rounded focus:ring-[#0076B6]"
                  />
                  <Label
                    htmlFor={`paid-${index}`}
                    className="cursor-pointer text-xs"
                  >
                    Paid
                  </Label>
                </div>
              </div>

              {/* Notes */}
              <div className="col-span-2">
                <Label htmlFor={`notes-${index}`} className="text-xs">
                  Notes
                </Label>
                <Input
                  id={`notes-${index}`}
                  value={entry.notes || ""}
                  onChange={(e) => updateEntry(index, "notes", e.target.value)}
                  placeholder="Optional"
                  className="h-8"
                />
              </div>

              {/* Delete Button */}
              <div className="col-span-1 flex items-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeEntry(index)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={addEntry}
          variant="outline"
          className="w-full border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Participant
        </Button>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Participants</p>
              <p className="text-lg font-bold">{entries.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Entries</p>
              <p className="text-lg font-bold">{totalEntries}</p>
            </div>
            <div>
              <p className="text-gray-600">Payments Received</p>
              <p className="text-lg font-bold text-green-600">
                {paidEntries} / {entries.length}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
