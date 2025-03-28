import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function WalletTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardholderName: "Isabella Ding",
    cardNumber: "**** - **** - ****",
    cvv: "***",
    expiryDate: "****",
    billingAddress: "12 Agnes, Mississauga",
  });

  const handleInputChange = (field: keyof typeof cardInfo, value: string) => {
    setCardInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Save functionality would go here in a real app
      // For now, just toggle the edit state
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full pt-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
        {/* Card Info Section */}
        <Card className="bg-[#f5f5f5] border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#333333]">CARD INFO</CardTitle>
            <Button
              variant="ghost"
              className="h-8 text-[#364699] hover:text-[#364699] hover:bg-[#e5e7f4] px-3"
              onClick={toggleEdit}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Cardholder Name:</p>
              {isEditing ? (
                <Input
                  className="h-8 text-sm bg-white"
                  value={cardInfo.cardholderName}
                  onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                />
              ) : (
                <p className="text-sm">{cardInfo.cardholderName}</p>
              )}
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Credit Card Number:</p>
              {isEditing ? (
                <Input
                  className="h-8 text-sm bg-white"
                  value={cardInfo.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                />
              ) : (
                <p className="text-sm">{cardInfo.cardNumber}</p>
              )}
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">CVV Code:</p>
              {isEditing ? (
                <Input
                  className="h-8 text-sm bg-white "
                  value={cardInfo.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                />
              ) : (
                <p className="text-sm">{cardInfo.cvv}</p>
              )}
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Expiry Date:</p>
              {isEditing ? (
                <Input
                  className="h-8 text-sm bg-white"
                  value={cardInfo.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                />
              ) : (
                <p className="text-sm">{cardInfo.expiryDate}</p>
              )}
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Billing Address:</p>
              {isEditing ? (
                <Input
                  className="h-8 text-sm bg-white"
                  value={cardInfo.billingAddress}
                  onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                />
              ) : (
                <p className="text-sm">{cardInfo.billingAddress}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Transaction History Section */}
        <Card className="border-none shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#333333]">TRANSACTION HISTORY</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 px-0">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-0">
                <div className="py-4 border-b border-[#f5f5f5]">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium">Paid to Marketplace</p>
                      <p className="text-xs text-[#6c6c6c]">January 5, 2025</p>
                    </div>
                    <p className="text-sm font-medium">$250.00</p>
                  </div>
                </div>

                <div className="py-4 border-b border-[#f5f5f5]">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium">Paid to Marketplace</p>
                      <p className="text-xs text-[#6c6c6c]">January 5, 2025</p>
                    </div>
                    <p className="text-sm font-medium">$200.00</p>
                  </div>
                </div>

                <div className="py-4 border-b border-[#f5f5f5]">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium">Paid to Marketplace</p>
                      <p className="text-xs text-[#6c6c6c]">January 5, 2025</p>
                    </div>
                    <p className="text-sm font-medium">$50.00</p>
                  </div>
                </div>

                {/* Additional transactions for scrolling demonstration */}
                <div className="py-4 border-b border-[#f5f5f5]">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium">Paid to Marketplace</p>
                      <p className="text-xs text-[#6c6c6c]">January 3, 2025</p>
                    </div>
                    <p className="text-sm font-medium">$75.00</p>
                  </div>
                </div>

                <div className="py-4 border-b border-[#f5f5f5]">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium">Paid to Marketplace</p>
                      <p className="text-xs text-[#6c6c6c]">December 28, 2024</p>
                    </div>
                    <p className="text-sm font-medium">$120.00</p>
                  </div>
                </div>

                <div className="py-4 border-b border-[#f5f5f5]">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium">Paid to Marketplace</p>
                      <p className="text-xs text-[#6c6c6c]">December 15, 2024</p>
                    </div>
                    <p className="text-sm font-medium">$180.00</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
