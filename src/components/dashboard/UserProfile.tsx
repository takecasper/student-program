import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountTab } from "./tabs/AccountTab";
import { GradesTab } from "./tabs/GradesTab";
import { WalletTab } from "./tabs/WalletTab";
import { VacationTab } from "./tabs/VacationTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { TabIcon } from "./TabIcon";

type UserProfileProps = {
  user: {
    name: string;
    avatar: string;
    email: string;
  } | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function UserProfile({ user, activeTab, setActiveTab }: UserProfileProps) {
  if (!user) return null;

  return (
    <main className="">
      <div className="flex items-center gap-4">
        <Avatar className="w-32 h-32 mb-4 ">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-[#333333]">{user.name}</h1>
          <p className="text-[#6c6c6c]">Toronto, Canada</p>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 gap-2 bg-white">
          <TabTrigger value="account" activeTab={activeTab} icon="user" label="MY ACCOUNT" />
          <TabTrigger value="grades" activeTab={activeTab} icon="calendar" label="MY GRADES" />
          <TabTrigger value="wallet" activeTab={activeTab} icon="wallet" label="MY WALLET" />
          <TabTrigger value="vacation" activeTab={activeTab} icon="vacation" label="MY VACATION/ LEAVE" />
          <TabTrigger value="settings" activeTab={activeTab} icon="settings" label="SETTINGS" />
        </TabsList>

        <TabsContent value="account" className="mt-0">
          <AccountTab user={user} />
        </TabsContent>

        <TabsContent value="grades">
          <GradesTab />
        </TabsContent>

        <TabsContent value="wallet">
          <WalletTab />
        </TabsContent>

        <TabsContent value="vacation">
          <VacationTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}

type TabTriggerProps = {
  value: string;
  activeTab: string;
  icon: "user" | "calendar" | "wallet" | "vacation" | "settings";
  label: string;
};

function TabTrigger({ value, activeTab, icon, label }: TabTriggerProps) {
  return (
    <TabsTrigger
      value={value}
      style={activeTab === value ? { backgroundColor: "#364699", color: "white" } : {}}
      className={`rounded-full py-2 px-4 ${
        activeTab === value ? "" : "bg-white text-[#333333] border border-[#d9d9d9]"
      }`}
    >
      <div className="flex items-center gap-2">
        <TabIcon icon={icon} />
        {label}
      </div>
    </TabsTrigger>
  );
}
