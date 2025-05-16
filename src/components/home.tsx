import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  CreditCard,
  Calendar,
  BarChart3,
  Landmark,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MembershipTable from "./dashboard/MembershipTable";
import FinancialSummary from "./dashboard/FinancialSummary";
import ProgramTables from "./dashboard/ProgramTables";
import BankTransactions from "./dashboard/BankTransactions";

const HomePage = () => {
  const [activeTab, setActiveTab] = React.useState("membership");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4">
        <div className="flex items-center gap-2 mb-8">
          <Landmark className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Financial System</h1>
        </div>

        <nav className="space-y-2">
          <Button
            variant={activeTab === "membership" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("membership")}
          >
            <Users className="mr-2 h-4 w-4" />
            Membership Recap
          </Button>

          <Button
            variant={activeTab === "contributions" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("contributions")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Member Contributions
          </Button>

          <Button
            variant={activeTab === "derap" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("derap")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Derap Program
          </Button>

          <Button
            variant={activeTab === "daspen" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("daspen")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Daspen Program
          </Button>

          <Button
            variant={activeTab === "calendar" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("calendar")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendar Program
          </Button>

          <Button
            variant={activeTab === "bank" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("bank")}
          >
            <Landmark className="mr-2 h-4 w-4" />
            Bank Transactions
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b bg-card p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium">
            {activeTab === "membership" && "Membership Recap"}
            {activeTab === "contributions" && "Member Contributions"}
            {activeTab === "derap" && "Derap Program"}
            {activeTab === "daspen" && "Daspen Program"}
            {activeTab === "calendar" && "Calendar Program"}
            {activeTab === "bank" && "Bank Transactions"}
          </h2>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date().toLocaleDateString()}
            </Button>

            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="User"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "membership" && <MembershipTable />}

          {activeTab === "contributions" && <FinancialSummary />}

          {(activeTab === "derap" ||
            activeTab === "daspen" ||
            activeTab === "calendar") && (
            <ProgramTables activeProgram={activeTab} />
          )}

          {activeTab === "bank" && <BankTransactions />}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
