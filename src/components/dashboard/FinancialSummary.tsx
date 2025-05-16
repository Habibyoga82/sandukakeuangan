import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Printer,
  ArrowUpDown,
  Filter,
  FileText,
  Target,
  RefreshCcw,
} from "lucide-react";

interface FinancialSummaryProps {
  data?: {
    billing: number;
    deposits: number;
    difference: number;
    branches: BranchData[];
  };
}

interface BranchData {
  id: string;
  name: string;
  memberCount: number;
  category1: number;
  category2: number;
  category3: number;
  totalBilling: number;
  category1Realization: number;
  category2Realization: number;
  category3Realization: number;
  totalRealization: number;
  bankFee: number;
  cashDeposit: number;
  setorTunai: number;
  selisih: number;
  provinceAllocation: number;
  regencyAllocation: number;
  branchAllocation: number;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  data = {
    billing: 0,
    deposits: 0,
    difference: 0,
    branches: [
      {
        id: "1",
        name: "Cabang A",
        memberCount: 100,
        category1: 63750,
        category2: 51000,
        category3: 42500,
        totalBilling: 157250,
        category1Realization: 24324.12,
        category2Realization: 75409.46,
        category3Realization: 26266.22,
        totalRealization: 126000,
        bankFee: 50000,
        cashDeposit: 25000,
        setorTunai: 97250,
        selisih: 33700,
        provinceAllocation: 2400,
        regencyAllocation: 1900,
        branchAllocation: 0,
      },
      {
        id: "2",
        name: "Cabang B",
        memberCount: 85,
        category1: 25500,
        category2: 136000,
        category3: 21250,
        totalBilling: 182750,
        category1Realization: 5486.17,
        category2Realization: 16404.63,
        category3Realization: 2908.88,
        totalRealization: 25000,
        bankFee: 0,
        cashDeposit: 25000,
        setorTunai: 157750,
        selisih: 22375,
        provinceAllocation: 1000,
        regencyAllocation: 1625,
        branchAllocation: 0,
      },
      {
        id: "3",
        name: "Cabang C",
        memberCount: 120,
        category1: 127500,
        category2: 85000,
        category3: 106250,
        totalBilling: 318750,
        category1Realization: 60000,
        category2Realization: 40000,
        category3Realization: 50000,
        totalRealization: 150000,
        bankFee: 120000,
        cashDeposit: 30000,
        setorTunai: 168750,
        selisih: 134250,
        provinceAllocation: 6000,
        regencyAllocation: 8750,
        branchAllocation: 0,
      },
      {
        id: "4",
        name: "Cabang D",
        memberCount: 90,
        category1: 76500,
        category2: 119000,
        category3: 85000,
        totalBilling: 242750,
        category1Realization: 15000,
        category2Realization: 40000.67,
        category3Realization: 15333.33,
        totalRealization: 70000,
        bankFee: 60000,
        cashDeposit: 25000,
        setorTunai: 147250,
        selisih: 55025,
        provinceAllocation: 3800,
        regencyAllocation: 5175,
        branchAllocation: 0,
      },
    ],
  },
}) => {
  const [branch, setBranch] = useState<string>("all");
  const [month, setMonth] = useState<string>("5"); // May
  const [year, setYear] = useState<string>("2023");
  const [isAllocationModalOpen, setIsAllocationModalOpen] =
    useState<boolean>(false);

  const [allocations, setAllocations] = useState({
    pb: "",
    provincial: "",
    regency: "",
    branch: "",
  });

  const handleAllocationChange = (
    field: keyof typeof allocations,
    value: string,
  ) => {
    setAllocations((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAllocations = () => {
    // Here you would save the allocations to your backend
    console.log("Saving allocations:", allocations);
    setIsAllocationModalOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("Rp", "Rp ");
  };

  const months = [
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const years = ["2021", "2022", "2023", "2024", "2025"];

  const branches = [
    { value: "all", label: "Semua Cabang" },
    ...data.branches.map((branch) => ({
      value: branch.id,
      label: branch.name,
    })),
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="daspen-checkbox"
          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600"
        />
        <label htmlFor="daspen-checkbox" className="text-lg font-medium">
          Manajemen Dana Sosial Pensiun (Daspen)
        </label>
        <div className="ml-auto">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1 text-xs"
          >
            <span className="text-xs">Atur Besaran Sumbangan Daspen</span>
          </Button>
        </div>
      </div>

      <div className="bg-blue-500 text-white p-3 rounded-md flex items-center justify-center mb-4">
        <Target className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Target & Realisasi Daspen</span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <RefreshCcw className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-500">
            Rekapitulasi Kategori Daspen
          </span>
        </div>
      </div>

      <div className="border rounded-md p-4 mb-6">
        <h3 className="text-sm font-medium mb-2">Filter Data Daspen</h3>
        <p className="text-xs text-gray-500 mb-4">
          Filter data Realisasi & Realisasi Daspen berdasarkan Cabang, Bulan,
          dan Tahun
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="branch" className="text-xs mb-1 block">
              Cabang
            </Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger id="branch" className="w-full text-sm h-9">
                <SelectValue placeholder="Semua Cabang" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="month" className="text-xs mb-1 block">
              Bulan
            </Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger id="month" className="w-full text-sm h-9">
                <SelectValue placeholder="Pilih Bulan" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="year" className="text-xs mb-1 block">
              Tahun
            </Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year" className="w-full text-sm h-9">
                <SelectValue placeholder="Pilih Tahun" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-blue-600" />
          <h3 className="text-md font-medium">
            Data Tagihan & Realisasi Daspen (Semua Cabang) Mei 2023
          </h3>
          <div className="ml-auto">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-xs"
            >
              <span className="text-xs">Cetak</span>
            </Button>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[50px] text-xs">NO</TableHead>
                <TableHead className="text-xs">CABANG</TableHead>
                <TableHead className="text-xs text-center">
                  KATEGORI I<br />
                  <span className="text-[10px] text-gray-500">
                    (Pensiun / Tahun)
                  </span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  KATEGORI II
                  <br />
                  <span className="text-[10px] text-gray-500">
                    (Meninggal / Pensiun)
                  </span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  KATEGORI III
                  <br />
                  <span className="text-[10px] text-gray-500">
                    (Meninggal / Pensiun)
                  </span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  TOTAL ANGGOTA /<br />
                  <span className="text-[10px] text-gray-500">
                    TAGIHAN (Rp)
                  </span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  KATEGORI I<br />
                  <span className="text-[10px] text-gray-500">
                    (Pensiun / Realisasi)
                  </span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  KATEGORI II
                  <br />
                  <span className="text-[10px] text-gray-500">
                    (Meninggal / Realisasi)
                  </span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  KATEGORI III
                  <br />
                  <span className="text-[10px] text-gray-500">
                    (Pensiun / Realisasi)
                  </span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  TOTAL ANGGOTA /<br />
                  <span className="text-[10px] text-gray-500">
                    REALISASI (Rp)
                  </span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  POT. BANK (Rp)
                </TableHead>
                <TableHead className="text-xs text-center">
                  SETOR TUNAI (Rp)
                </TableHead>
                <TableHead className="text-xs text-center">
                  SELISIH (Rp)
                </TableHead>
                <TableHead className="text-xs text-center">
                  PERUNTUKAN
                  <br />
                  PROVINSI (Rp)
                  <br />
                  <span className="text-[10px] text-gray-500">(10%)</span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  PERUNTUKAN
                  <br />
                  KABUPATEN (Rp)
                  <br />
                  <span className="text-[10px] text-gray-500">(15%)</span>
                </TableHead>
                <TableHead className="text-xs text-center">
                  PERUNTUKAN
                  <br />
                  CABANG (Rp)
                  <br />
                  <span className="text-[10px] text-gray-500">(75%)</span>
                </TableHead>
                <TableHead className="text-xs text-center">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.branches.length > 0 ? (
                data.branches.map((branch, index) => (
                  <TableRow key={branch.id} className="text-xs">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell className="text-center">
                      <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                        <span className="text-[10px] text-green-800">1</span>
                      </div>
                      <div className="text-right">
                        {formatCurrency(branch.category1).replace(" ", "")}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                        <span className="text-[10px] text-blue-800">2</span>
                      </div>
                      <div className="text-right">
                        {formatCurrency(branch.category2).replace(" ", "")}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                        <span className="text-[10px] text-purple-800">3</span>
                      </div>
                      <div className="text-right">
                        {formatCurrency(branch.category3).replace(" ", "")}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                        <span className="text-[10px] text-gray-800">T</span>
                      </div>
                      <div className="text-right">
                        {formatCurrency(branch.totalBilling).replace(" ", "")}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                        <span className="text-[10px] text-green-800">1</span>
                      </div>
                      <div className="text-right">
                        {formatCurrency(branch.category1Realization).replace(
                          " ",
                          "",
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                        <span className="text-[10px] text-blue-800">2</span>
                      </div>
                      <div className="text-right">
                        {formatCurrency(branch.category2Realization).replace(
                          " ",
                          "",
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                        <span className="text-[10px] text-purple-800">3</span>
                      </div>
                      <div className="text-right">
                        {formatCurrency(branch.category3Realization).replace(
                          " ",
                          "",
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                        <span className="text-[10px] text-gray-800">T</span>
                      </div>
                      <div className="text-right">
                        {formatCurrency(branch.totalRealization).replace(
                          " ",
                          "",
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(branch.bankFee).replace(" ", "")}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(branch.cashDeposit).replace(" ", "")}
                    </TableCell>
                    <TableCell className="text-right text-red-500">
                      {formatCurrency(branch.setorTunai).replace(" ", "")}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(branch.provinceAllocation).replace(
                        " ",
                        "",
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(branch.regencyAllocation).replace(
                        " ",
                        "",
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(branch.branchAllocation).replace(" ", "")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 px-2 w-full flex items-center justify-center"
                        >
                          <span className="text-xs">Setor</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 px-2 w-full flex items-center justify-center"
                        >
                          <span className="text-xs">Detail</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={17} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <div className="rounded-full bg-gray-100 p-3 mb-2">
                        <FileText className="h-6 w-6" />
                      </div>
                      <p>Tidak ada data iuran untuk filter yang dipilih.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog
        open={isAllocationModalOpen}
        onOpenChange={setIsAllocationModalOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Peruntukan Iuran</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pb" className="text-right">
                PB:
              </Label>
              <Input
                id="pb"
                className="col-span-3"
                value={allocations.pb}
                onChange={(e) => handleAllocationChange("pb", e.target.value)}
                placeholder="Masukkan persentase alokasi PB"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provincial" className="text-right">
                Provinsi:
              </Label>
              <Input
                id="provincial"
                className="col-span-3"
                value={allocations.provincial}
                onChange={(e) =>
                  handleAllocationChange("provincial", e.target.value)
                }
                placeholder="Masukkan persentase alokasi Provinsi"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="regency" className="text-right">
                Kabupaten:
              </Label>
              <Input
                id="regency"
                className="col-span-3"
                value={allocations.regency}
                onChange={(e) =>
                  handleAllocationChange("regency", e.target.value)
                }
                placeholder="Masukkan persentase alokasi Kabupaten"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branch" className="text-right">
                Cabang:
              </Label>
              <Input
                id="branch"
                className="col-span-3"
                value={allocations.branch}
                onChange={(e) =>
                  handleAllocationChange("branch", e.target.value)
                }
                placeholder="Masukkan persentase alokasi Cabang"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveAllocations}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialSummary;
