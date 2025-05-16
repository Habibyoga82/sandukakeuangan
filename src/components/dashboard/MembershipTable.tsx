import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, Download, Info, Printer } from "lucide-react";

interface FinancialData {
  id: string;
  branch: string;
  totalMembers: number;
  pb: number;
  province: number;
  regency: number;
  branchAllocation: number;
  totalAllocation: number;
  sanduka: number;
  totalBilling: number;
  bankDeduction: number;
  total: number;
  difference: number;
}

const MembershipTable = () => {
  const [selectedBranch, setSelectedBranch] = useState("cabang");
  const [selectedMonth, setSelectedMonth] = useState("mei");
  const [selectedYear, setSelectedYear] = useState("2023");
  const printRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const mockData: FinancialData[] = [
    {
      id: "1",
      branch: "Jakarta",
      totalMembers: 120,
      pb: 1200000,
      province: 600000,
      regency: 300000,
      branchAllocation: 900000,
      totalAllocation: 3000000,
      sanduka: 600000,
      totalBilling: 3600000,
      bankDeduction: 3500000,
      total: 3500000,
      difference: 100000,
    },
    {
      id: "2",
      branch: "Surabaya",
      totalMembers: 85,
      pb: 850000,
      province: 425000,
      regency: 212500,
      branchAllocation: 637500,
      totalAllocation: 2125000,
      sanduka: 425000,
      totalBilling: 2550000,
      bankDeduction: 2500000,
      total: 2500000,
      difference: 50000,
    },
    {
      id: "3",
      branch: "Bandung",
      totalMembers: 65,
      pb: 650000,
      province: 325000,
      regency: 162500,
      branchAllocation: 487500,
      totalAllocation: 1625000,
      sanduka: 325000,
      totalBilling: 1950000,
      bankDeduction: 1900000,
      total: 1900000,
      difference: 50000,
    },
  ];

  // Calculate totals
  const totalBilling = mockData.reduce(
    (sum, item) => sum + item.totalBilling,
    0,
  );
  const totalDeduction = mockData.reduce(
    (sum, item) => sum + item.bankDeduction,
    0,
  );
  const totalDifference = mockData.reduce(
    (sum, item) => sum + item.difference,
    0,
  );

  // Filter data based on selected branch
  const filteredData =
    selectedBranch === "cabang"
      ? mockData
      : mockData.filter((item) => item.branch === selectedBranch);

  // Months in Indonesian
  const months = [
    { value: "januari", label: "Januari" },
    { value: "februari", label: "Februari" },
    { value: "maret", label: "Maret" },
    { value: "april", label: "April" },
    { value: "mei", label: "Mei" },
    { value: "juni", label: "Juni" },
    { value: "juli", label: "Juli" },
    { value: "agustus", label: "Agustus" },
    { value: "september", label: "September" },
    { value: "oktober", label: "Oktober" },
    { value: "november", label: "November" },
    { value: "desember", label: "Desember" },
  ];

  // Years
  const years = ["2021", "2022", "2023", "2024", "2025"];

  // Branches
  const branches = ["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar"];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      const printStyles = `
        <style>
          @media print {
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .print-header { text-align: center; margin-bottom: 20px; }
            .print-header h2 { margin-bottom: 5px; }
            .print-header p { margin: 5px 0; }
            .summary-section { margin-bottom: 20px; }
            .summary-item { margin-bottom: 10px; }
          }
        </style>
      `;

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Cetak Ringkasan Keuangan</title>
              ${printStyles}
            </head>
            <body>
              <div class="print-header">
                <h2>Ringkasan Keuangan</h2>
                <p>Periode: ${months.find((m) => m.value === selectedMonth)?.label} ${selectedYear}</p>
                <p>Cabang: ${selectedBranch === "cabang" ? "Semua Cabang" : selectedBranch}</p>
              </div>
              <div class="print-content">
                ${printContents}
              </div>
              <script>
                window.onload = function() { window.print(); window.close(); }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6" ref={printRef}>
        <h2 className="text-xl font-medium">Ringkasan Keuangan</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-green-100">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Tagihan</p>
                  <p className="text-lg font-medium text-green-600">
                    {formatCurrency(totalBilling)}
                  </p>
                </div>
                <div className="bg-green-50 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-blue-100">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Setoran</p>
                  <p className="text-lg font-medium text-blue-600">
                    {formatCurrency(totalDeduction)}
                  </p>
                </div>
                <div className="bg-blue-50 p-2 rounded-md">
                  <Download className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Selisih</p>
                  <p className="text-lg font-medium text-gray-600">
                    {formatCurrency(totalDifference)}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded-md">
                  <Info className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Details Card */}
        <Card className="border border-gray-100">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Potongan Bank:</p>
                <p className="text-sm font-medium">
                  {formatCurrency(totalDeduction)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Setoran Tunai:</p>
                <p className="text-sm font-medium">{formatCurrency(0)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Total Dibayar:</p>
                <p className="text-sm font-medium">
                  {formatCurrency(totalDeduction)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rekapitulasi Section */}
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium">
            Rekapitulasi Iuran PGRI dan Sanduka
          </h3>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm mb-1">Cabang</p>
            <div className="relative">
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Semua Cabang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cabang">Semua Cabang</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Bulan</p>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Bulan" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm mb-1">Tahun</p>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full">
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
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12">No.</TableHead>
                <TableHead>Cabang</TableHead>
                <TableHead>Total Anggota</TableHead>
                <TableHead>PB</TableHead>
                <TableHead>Perwakilan Provinsi</TableHead>
                <TableHead>Perwakilan Kabupaten</TableHead>
                <TableHead>Perwakilan Cabang</TableHead>
                <TableHead>Total Cabang</TableHead>
                <TableHead>Sanduka</TableHead>
                <TableHead>Total Tagihan</TableHead>
                <TableHead>Potongan Bank</TableHead>
                <TableHead>Setoran Total</TableHead>
                <TableHead>Selisih</TableHead>
                <TableHead className="w-20 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.branch}</TableCell>
                    <TableCell>{item.totalMembers}</TableCell>
                    <TableCell>{formatCurrency(item.pb)}</TableCell>
                    <TableCell>{formatCurrency(item.province)}</TableCell>
                    <TableCell>{formatCurrency(item.regency)}</TableCell>
                    <TableCell>
                      {formatCurrency(item.branchAllocation)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(item.totalAllocation)}
                    </TableCell>
                    <TableCell>{formatCurrency(item.sanduka)}</TableCell>
                    <TableCell>{formatCurrency(item.totalBilling)}</TableCell>
                    <TableCell>{formatCurrency(item.bankDeduction)}</TableCell>
                    <TableCell>{formatCurrency(item.total)}</TableCell>
                    <TableCell>{formatCurrency(item.difference)}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-4">
                    Tidak ada data iuran untuk filter yang dipilih.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Print Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Cetak Ringkasan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembershipTable;
