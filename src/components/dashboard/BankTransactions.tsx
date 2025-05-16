import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Download, Filter, Calendar } from "lucide-react";

interface BankDeduction {
  id: number;
  branch: string;
  account: string;
  memberName: string;
  kabupatenAccount: string;
  deduction: number;
  deductionDate: string;
  transaction: string;
}

interface BalancingTransaction {
  id: number;
  branch: string;
  workUnit: string;
  name: string;
  account: string;
  dues: number;
  sanduka: number;
  daspen: number;
  derap: number;
  calendar: number;
  other: number;
  totalDues: number;
  bankDeduction: number;
  difference: number;
  notes: string;
}

const BankTransactions = () => {
  const [activeTab, setActiveTab] = useState("deductions");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [isAccountingDialogOpen, setIsAccountingDialogOpen] = useState(false);

  // Mock data for bank deductions
  const bankDeductions: BankDeduction[] = [
    {
      id: 1,
      branch: "Cabang A",
      account: "1234567890",
      memberName: "John Doe",
      kabupatenAccount: "0987654321",
      deduction: 250000,
      deductionDate: "2023-05-15",
      transaction: "TRX-001",
    },
    {
      id: 2,
      branch: "Cabang B",
      account: "2345678901",
      memberName: "Jane Smith",
      kabupatenAccount: "1098765432",
      deduction: 300000,
      deductionDate: "2023-05-15",
      transaction: "TRX-002",
    },
    {
      id: 3,
      branch: "Cabang C",
      account: "3456789012",
      memberName: "Robert Johnson",
      kabupatenAccount: "2109876543",
      deduction: 275000,
      deductionDate: "2023-05-16",
      transaction: "TRX-003",
    },
    {
      id: 4,
      branch: "Cabang A",
      account: "4567890123",
      memberName: "Emily Davis",
      kabupatenAccount: "3210987654",
      deduction: 225000,
      deductionDate: "2023-05-16",
      transaction: "TRX-004",
    },
    {
      id: 5,
      branch: "Cabang D",
      account: "5678901234",
      memberName: "Michael Wilson",
      kabupatenAccount: "4321098765",
      deduction: 350000,
      deductionDate: "2023-05-17",
      transaction: "TRX-005",
    },
  ];

  // Mock data for balancing transactions
  const balancingTransactions: BalancingTransaction[] = [
    {
      id: 1,
      branch: "Cabang A",
      workUnit: "Unit 1",
      name: "John Doe",
      account: "1234567890",
      dues: 100000,
      sanduka: 25000,
      daspen: 50000,
      derap: 35000,
      calendar: 20000,
      other: 10000,
      totalDues: 240000,
      bankDeduction: 250000,
      difference: 10000,
      notes: "Excess payment",
    },
    {
      id: 2,
      branch: "Cabang B",
      workUnit: "Unit 2",
      name: "Jane Smith",
      account: "2345678901",
      dues: 100000,
      sanduka: 25000,
      daspen: 50000,
      derap: 35000,
      calendar: 20000,
      other: 15000,
      totalDues: 245000,
      bankDeduction: 300000,
      difference: 55000,
      notes: "Excess payment",
    },
    {
      id: 3,
      branch: "Cabang C",
      workUnit: "Unit 3",
      name: "Robert Johnson",
      account: "3456789012",
      dues: 100000,
      sanduka: 25000,
      daspen: 50000,
      derap: 35000,
      calendar: 20000,
      other: 0,
      totalDues: 230000,
      bankDeduction: 275000,
      difference: 45000,
      notes: "Excess payment",
    },
    {
      id: 4,
      branch: "Cabang A",
      workUnit: "Unit 1",
      name: "Emily Davis",
      account: "4567890123",
      dues: 100000,
      sanduka: 25000,
      daspen: 50000,
      derap: 35000,
      calendar: 20000,
      other: 5000,
      totalDues: 235000,
      bankDeduction: 225000,
      difference: -10000,
      notes: "Underpayment",
    },
    {
      id: 5,
      branch: "Cabang D",
      workUnit: "Unit 4",
      name: "Michael Wilson",
      account: "5678901234",
      dues: 100000,
      sanduka: 25000,
      daspen: 50000,
      derap: 35000,
      calendar: 20000,
      other: 20000,
      totalDues: 250000,
      bankDeduction: 350000,
      difference: 100000,
      notes: "Excess payment",
    },
  ];

  // List of branches, months, and years for filters
  const branches = ["Cabang A", "Cabang B", "Cabang C", "Cabang D"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = ["2021", "2022", "2023", "2024"];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Transaksi Bank</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="branch">Cabang</Label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger id="branch">
              <SelectValue placeholder="Pilih Cabang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua Cabang</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="month">Bulan</Label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger id="month">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua Bulan</SelectItem>
              {months.map((month, index) => (
                <SelectItem
                  key={month}
                  value={(index + 1).toString().padStart(2, "0")}
                >
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="year">Tahun</Label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="search">Cari</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="Cari..." className="pl-8" />
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter Lanjutan
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>

          <Dialog
            open={isAccountingDialogOpen}
            onOpenChange={setIsAccountingDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Input Akuntansi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Input Akuntansi</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pb-allocation">Peruntukan PB</Label>
                    <Input id="pb-allocation" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="provincial-allocation">
                      Peruntukan Provinsi
                    </Label>
                    <Input
                      id="provincial-allocation"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="regency-allocation">
                      Peruntukan Kabupaten
                    </Label>
                    <Input
                      id="regency-allocation"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch-allocation">Peruntukan Cabang</Label>
                    <Input
                      id="branch-allocation"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Catatan</Label>
                  <Input id="notes" placeholder="Catatan tambahan..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAccountingDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button onClick={() => setIsAccountingDialogOpen(false)}>
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="deductions">Potongan Bank</TabsTrigger>
          <TabsTrigger value="balancing">Balancing</TabsTrigger>
        </TabsList>

        <TabsContent value="deductions">
          <Card>
            <CardHeader>
              <CardTitle>Data Potongan Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Cabang</TableHead>
                    <TableHead>Rekening</TableHead>
                    <TableHead>Nama Anggota</TableHead>
                    <TableHead>Rekening Kabupaten</TableHead>
                    <TableHead>Potongan</TableHead>
                    <TableHead>Tgl. Potongan</TableHead>
                    <TableHead>Transaksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bankDeductions.map((deduction, index) => {
                    const matchesMonth =
                      selectedMonth === "all" ||
                      deduction.deductionDate.startsWith(
                        `${selectedYear}-${selectedMonth}`,
                      );
                    return (
                      <TableRow key={deduction.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{deduction.branch}</TableCell>
                        <TableCell>{deduction.account}</TableCell>
                        <TableCell>{deduction.memberName}</TableCell>
                        <TableCell>{deduction.kabupatenAccount}</TableCell>
                        <TableCell>
                          {formatCurrency(deduction.deduction)}
                        </TableCell>
                        <TableCell>
                          {new Date(deduction.deductionDate).toLocaleDateString(
                            "id-ID",
                          )}
                        </TableCell>
                        <TableCell>{deduction.transaction}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balancing">
          <Card>
            <CardHeader>
              <CardTitle>Data Balancing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Cabang</TableHead>
                      <TableHead>Unit Kerja</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Rekening</TableHead>
                      <TableHead>Iuran</TableHead>
                      <TableHead>Sanduka</TableHead>
                      <TableHead>Daspen</TableHead>
                      <TableHead>Derap</TableHead>
                      <TableHead>Kalender</TableHead>
                      <TableHead>Lain-lain</TableHead>
                      <TableHead>Total Iuran</TableHead>
                      <TableHead>Potongan Bank</TableHead>
                      <TableHead>Selisih</TableHead>
                      <TableHead>Keterangan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {balancingTransactions.map((transaction, index) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{transaction.branch}</TableCell>
                        <TableCell>{transaction.workUnit}</TableCell>
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell>{transaction.account}</TableCell>
                        <TableCell>
                          {formatCurrency(transaction.dues)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.sanduka)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.daspen)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.derap)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.calendar)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.other)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.totalDues)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.bankDeduction)}
                        </TableCell>
                        <TableCell
                          className={
                            transaction.difference < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {formatCurrency(transaction.difference)}
                        </TableCell>
                        <TableCell>{transaction.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BankTransactions;
