import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Filter, Printer } from "lucide-react";

interface ProgramTablesProps {
  activeProgram?: "derap" | "daspen" | "calendar";
}

const ProgramTables = ({ activeProgram = "derap" }: ProgramTablesProps) => {
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("6"); // June
  const [selectedYear, setSelectedYear] = useState<string>("2023");

  // Mock data for demonstration
  const derapData = [
    {
      id: 1,
      branch: "Branch A",
      orders: 45,
      billingTotal: 4500000,
      bankPayment: 4300000,
      cashPayment: 100000,
      difference: 100000,
    },
    {
      id: 2,
      branch: "Branch B",
      orders: 32,
      billingTotal: 3200000,
      bankPayment: 3000000,
      cashPayment: 150000,
      difference: 50000,
    },
    {
      id: 3,
      branch: "Branch C",
      orders: 28,
      billingTotal: 2800000,
      bankPayment: 2800000,
      cashPayment: 0,
      difference: 0,
    },
    {
      id: 4,
      branch: "Branch D",
      orders: 53,
      billingTotal: 5300000,
      bankPayment: 5000000,
      cashPayment: 200000,
      difference: 100000,
    },
    {
      id: 5,
      branch: "Branch E",
      orders: 41,
      billingTotal: 4100000,
      bankPayment: 4100000,
      cashPayment: 0,
      difference: 0,
    },
  ];

  const daspenData = [
    {
      id: 1,
      branch: "Branch A",
      category1Members: 20,
      category1Billing: 2000000,
      category2Members: 15,
      category2Billing: 1800000,
      category3Members: 10,
      category3Billing: 1500000,
      totalMembers: 45,
      totalBilling: 5300000,
      category1Realized: 20,
      category1RealizedAmount: 2000000,
      category2Realized: 15,
      category2RealizedAmount: 1800000,
      category3Realized: 10,
      category3RealizedAmount: 1500000,
      totalRealizedMembers: 45,
      totalRealizedAmount: 5300000,
      bankPayment: 5000000,
      cashPayment: 200000,
      difference: 100000,
      provinceAllocation: 4743500,
      regencyAllocation: 212000,
      branchAllocation: 344500,
    },
    {
      id: 2,
      branch: "Branch B",
      category1Members: 15,
      category1Billing: 1500000,
      category2Members: 10,
      category2Billing: 1200000,
      category3Members: 7,
      category3Billing: 1050000,
      totalMembers: 32,
      totalBilling: 3750000,
      category1Realized: 15,
      category1RealizedAmount: 1500000,
      category2Realized: 10,
      category2RealizedAmount: 1200000,
      category3Realized: 7,
      category3RealizedAmount: 1050000,
      totalRealizedMembers: 32,
      totalRealizedAmount: 3750000,
      bankPayment: 3500000,
      cashPayment: 150000,
      difference: 100000,
      provinceAllocation: 3356250,
      regencyAllocation: 150000,
      branchAllocation: 243750,
    },
  ];

  const calendarData = [
    {
      id: 1,
      branch: "Branch A",
      orders: 45,
      billingTotal: 2250000,
      bankPayment: 2150000,
      cashPayment: 50000,
      difference: 50000,
    },
    {
      id: 2,
      branch: "Branch B",
      orders: 32,
      billingTotal: 1600000,
      bankPayment: 1500000,
      cashPayment: 75000,
      difference: 25000,
    },
    {
      id: 3,
      branch: "Branch C",
      orders: 28,
      billingTotal: 1400000,
      bankPayment: 1400000,
      cashPayment: 0,
      difference: 0,
    },
    {
      id: 4,
      branch: "Branch D",
      orders: 53,
      billingTotal: 2650000,
      bankPayment: 2500000,
      cashPayment: 100000,
      difference: 50000,
    },
    {
      id: 5,
      branch: "Branch E",
      orders: 41,
      billingTotal: 2050000,
      bankPayment: 2050000,
      cashPayment: 0,
      difference: 0,
    },
  ];

  // Mock branches for filter
  const branches = [
    { value: "all", label: "All Branches" },
    { value: "branch-a", label: "Branch A" },
    { value: "branch-b", label: "Branch B" },
    { value: "branch-c", label: "Branch C" },
    { value: "branch-d", label: "Branch D" },
    { value: "branch-e", label: "Branch E" },
  ];

  // Generate month options
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Generate year options (current year and 4 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDeposit = (id: number) => {
    console.log(`Deposit action for item ${id}`);
    // Implement deposit functionality
  };

  const handleExport = () => {
    console.log("Export data");
    // Implement export functionality
  };

  const handlePrint = () => {
    console.log("Print data");
    // Implement print functionality
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              Program Financial Data
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.value} value={branch.value}>
                      {branch.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                className="w-[220px]"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>

          <Tabs defaultValue={activeProgram} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="derap">Derap Program</TabsTrigger>
              <TabsTrigger value="daspen">Daspen Program</TabsTrigger>
              <TabsTrigger value="calendar">Calendar Program</TabsTrigger>
            </TabsList>

            {/* Derap Program Table */}
            <TabsContent value="derap" className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Orders (Exp)</TableHead>
                    <TableHead>Total Billing (Rp)</TableHead>
                    <TableHead>Bank Payment (Rp)</TableHead>
                    <TableHead>Cash Payment (Rp)</TableHead>
                    <TableHead>Difference (Rp)</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {derapData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.branch}</TableCell>
                      <TableCell>{item.orders}</TableCell>
                      <TableCell>{formatCurrency(item.billingTotal)}</TableCell>
                      <TableCell>{formatCurrency(item.bankPayment)}</TableCell>
                      <TableCell>{formatCurrency(item.cashPayment)}</TableCell>
                      <TableCell>{formatCurrency(item.difference)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeposit(item.id)}
                        >
                          Deposit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Daspen Program Table */}
            <TabsContent value="daspen" className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Category I (Members/Billing)</TableHead>
                    <TableHead>Category II (Members/Billing)</TableHead>
                    <TableHead>Category III (Members/Billing)</TableHead>
                    <TableHead>Total Members/Billing</TableHead>
                    <TableHead>Category I (Realized)</TableHead>
                    <TableHead>Category II (Realized)</TableHead>
                    <TableHead>Category III (Realized)</TableHead>
                    <TableHead>Total Realized</TableHead>
                    <TableHead>Bank Payment</TableHead>
                    <TableHead>Cash Payment</TableHead>
                    <TableHead>Difference</TableHead>
                    <TableHead>Province Allocation (89.5%)</TableHead>
                    <TableHead>Regency Allocation (4%)</TableHead>
                    <TableHead>Branch Allocation (6.5%)</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {daspenData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.branch}</TableCell>
                      <TableCell>{`${item.category1Members} / ${formatCurrency(item.category1Billing)}`}</TableCell>
                      <TableCell>{`${item.category2Members} / ${formatCurrency(item.category2Billing)}`}</TableCell>
                      <TableCell>{`${item.category3Members} / ${formatCurrency(item.category3Billing)}`}</TableCell>
                      <TableCell>{`${item.totalMembers} / ${formatCurrency(item.totalBilling)}`}</TableCell>
                      <TableCell>{`${item.category1Realized} / ${formatCurrency(item.category1RealizedAmount)}`}</TableCell>
                      <TableCell>{`${item.category2Realized} / ${formatCurrency(item.category2RealizedAmount)}`}</TableCell>
                      <TableCell>{`${item.category3Realized} / ${formatCurrency(item.category3RealizedAmount)}`}</TableCell>
                      <TableCell>{`${item.totalRealizedMembers} / ${formatCurrency(item.totalRealizedAmount)}`}</TableCell>
                      <TableCell>{formatCurrency(item.bankPayment)}</TableCell>
                      <TableCell>{formatCurrency(item.cashPayment)}</TableCell>
                      <TableCell>{formatCurrency(item.difference)}</TableCell>
                      <TableCell>
                        {formatCurrency(item.provinceAllocation)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(item.regencyAllocation)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(item.branchAllocation)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeposit(item.id)}
                        >
                          Deposit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Calendar Program Table */}
            <TabsContent value="calendar" className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Orders (Exp)</TableHead>
                    <TableHead>Total Billing (Rp)</TableHead>
                    <TableHead>Bank Payment (Rp)</TableHead>
                    <TableHead>Cash Payment (Rp)</TableHead>
                    <TableHead>Difference (Rp)</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calendarData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.branch}</TableCell>
                      <TableCell>{item.orders}</TableCell>
                      <TableCell>{formatCurrency(item.billingTotal)}</TableCell>
                      <TableCell>{formatCurrency(item.bankPayment)}</TableCell>
                      <TableCell>{formatCurrency(item.cashPayment)}</TableCell>
                      <TableCell>{formatCurrency(item.difference)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeposit(item.id)}
                        >
                          Deposit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramTables;
