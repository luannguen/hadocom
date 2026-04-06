import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, MoreHorizontal, ExternalLink, Globe } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { partnersService } from "@/services/partnersService";
import { Partner } from "@/types";
import PartnerForm from "@/components/admin/partners/PartnerForm";

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const { toast } = useToast();

  const fetchPartners = async () => {
    setLoading(true);
    const result = await partnersService.getPartners();
    if (result.success) {
      setPartners(result.data || []);
    } else {
      toast({
        variant: "destructive",
        title: "Lỗi tải dữ liệu",
        description: result.error || "Có lỗi xảy ra",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đối tác này không?")) return;

    const result = await partnersService.deletePartner(id);
    if (result.success) {
      toast({ title: "Thành công", description: "Đã xóa đối tác" });
      fetchPartners();
    } else {
      toast({ variant: "destructive", title: "Lỗi", description: result.error || "Có lỗi xảy ra" });
    }
  };

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingPartner(null);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    fetchPartners();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Đối tác & Khách hàng</h1>
          <p className="text-muted-foreground">
            Quản lý danh sách đối tác và khách hàng hiển thị trên website.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Thêm Đối tác
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm đối tác..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Logo</TableHead>
              <TableHead>Tên Đối tác</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Thứ tự</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : filteredPartners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Không tìm thấy đối tác nào.
                </TableCell>
              </TableRow>
            ) : (
              filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    {partner.logo_url ? (
                      <div className="w-10 h-10 rounded border bg-gray-50 flex items-center justify-center p-1">
                        <img src={partner.logo_url} alt={partner.name} className="max-w-full max-h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        N/A
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>
                    {partner.website_url ? (
                      <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        <Globe className="h-3 w-3" /> Website <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{partner.sort_order}</TableCell>
                  <TableCell>
                    {partner.is_active ? (
                      <Badge variant="default" className="bg-green-600">Đang hiển thị</Badge>
                    ) : (
                      <Badge variant="secondary">Đã ẩn</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(partner)}>
                          <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(partner.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPartner ? "Chỉnh sửa đối tác" : "Thêm đối tác mới"}</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin chi tiết cho đối tác hoặc khách hàng của công ty.
            </DialogDescription>
          </DialogHeader>
          <PartnerForm
            initialData={editingPartner}
            onSuccess={handleSuccess}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
