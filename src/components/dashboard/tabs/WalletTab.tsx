import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function WalletTab() {
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
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Cardholder Name:</p>
              <p className="text-sm">Isabella Ding</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Credit Card Number:</p>
              <p className="text-sm">**** - **** - ****</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">CVV Code:</p>
              <p className="text-sm">***</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Expiry Date:</p>
              <p className="text-sm">****</p>
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Billing Address:</p>
              <p className="text-sm">12 Agnes, Mississauga</p>
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
