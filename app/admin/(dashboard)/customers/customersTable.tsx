"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/common/ui/ui/card";
import { Button } from "@/components/common/ui/ui/button";
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Customer {
  idUser: number;
  nama: string;
  no_telp: string | number; // Ubah dari no_telp ke noTelp
  alamat: string;
  email: string;
}

interface CustomersTableProps {
  customers: Customer[];
  offset: number;
  totalCustomers: number;
  showPagination?: boolean;
}

export function CustomersTable({ 
  customers, 
  offset, 
  totalCustomers,
  showPagination = true
}: CustomersTableProps) {
  const router = useRouter();
  const ITEMS_PER_PAGE = 10;
  const currentPage = Math.floor(offset / ITEMS_PER_PAGE) + 1;
  const totalPages = Math.ceil(totalCustomers / ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (offset >= ITEMS_PER_PAGE) {
      router.push(`/admin/customers?offset=${offset - ITEMS_PER_PAGE}`);
    }
  };

  const handleNextPage = () => {
    if (offset + ITEMS_PER_PAGE < totalCustomers) {
      router.push(`/admin/customers?offset=${offset + ITEMS_PER_PAGE}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pelanggan</CardTitle>
        <CardDescription>
          Total {totalCustomers} pelanggan terdaftar di sistem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Cek</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                  Tidak ada data pelanggan
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.idUser}>
                  <TableCell className="font-medium">{customer.idUser}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{customer.nama}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-gray-500" />
                      <span>{customer.no_telp}</span> {/* Gunakan noTelp sebagai gantinya */}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Mail className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-sm">{customer.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5" />
                      <span className="text-sm">{customer.alamat}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/customers/${customer.idUser}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Lihat Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      {showPagination && (
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Menampilkan {offset + 1}-{Math.min(offset + ITEMS_PER_PAGE, totalCustomers)} dari {totalCustomers} pelanggan
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={offset === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Sebelumnya</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={offset + ITEMS_PER_PAGE >= totalCustomers}
            >
              <span>Berikutnya</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}