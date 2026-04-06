import { useState, useEffect } from "react";
import { eventRegistrationService } from "@/services/eventRegistrationService";
import { EventRegistration } from "@/types";
import { Button } from "@/components/ui/button";
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
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, User, Mail, Phone, Trash2, ExternalLink, Calendar, Building2, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EventRegistrationsPage() {
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentReg, setCurrentReg] = useState<EventRegistration | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const result = await eventRegistrationService.getRegistrations();
            if (result.success) {
                setRegistrations(result.data || []);
            } else {
                toast({
                    title: "Lỗi",
                    description: result.error || "Không thể tải danh sách đăng ký",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách đăng ký",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDetails = (reg: EventRegistration) => {
        setCurrentReg(reg);
        setIsDialogOpen(true);
    };

    const handleUpdateStatus = async (id: string, status: EventRegistration['status']) => {
        try {
            const result = await eventRegistrationService.updateStatus(id, status);
            if (result.success) {
                toast({ title: "Thành công", description: "Cập nhật trạng thái thành công" });
                fetchRegistrations();
                if (currentReg && currentReg.id === id) {
                    setCurrentReg({ ...currentReg, status });
                }
            } else {
                toast({
                    title: "Lỗi",
                    description: result.error || "Không thể cập nhật trạng thái",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Lỗi",
                description: "Không thể cập nhật trạng thái",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa đăng ký này?")) return;
        try {
            const result = await eventRegistrationService.deleteRegistration(id);
            if (result.success) {
                toast({ title: "Thành công", description: "Xóa đăng ký thành công" });
                fetchRegistrations();
            } else {
                toast({
                    title: "Lỗi",
                    description: result.error || "Không thể xóa đăng ký",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Lỗi",
                description: "Không thể xóa đăng ký",
                variant: "destructive",
            });
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">Chờ xác nhận</Badge>;
            case 'confirmed': return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Đã xác nhận</Badge>;
            case 'attended': return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Đã tham gia</Badge>;
            case 'cancelled': return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Đã hủy</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quản lý Đăng ký Sự kiện</h1>
                    <p className="text-sm text-muted-foreground">Theo dõi và quản lý danh sách người tham gia các sự kiện của công ty.</p>
                </div>
                <Button variant="outline" onClick={fetchRegistrations} className="flex items-center gap-2">
                    <Loader2 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Làm mới
                </Button>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow>
                            <TableHead className="w-[200px]">Người đăng ký</TableHead>
                            <TableHead className="w-[250px]">Sự kiện</TableHead>
                            <TableHead>Thông tin liên hệ</TableHead>
                            <TableHead>Ngày đăng ký</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && registrations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                                        <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : registrations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                                        <Calendar className="h-12 w-12 text-slate-300" />
                                        <p className="text-slate-500">Chưa có lượt đăng ký nào.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            registrations.map((reg) => (
                                <TableRow key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 flex items-center">
                                                <User className="mr-2 h-4 w-4 text-blue-500" />
                                                {reg.full_name}
                                            </span>
                                            {reg.company && (
                                                <span className="text-[10px] text-slate-500 mt-1 flex items-center">
                                                    <Building2 className="mr-1 h-3 w-3" /> {reg.company}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm font-medium line-clamp-1" title={reg.event?.title}>
                                            {reg.event?.title || "N/A"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="space-y-1">
                                        <div className="flex items-center text-xs text-slate-600">
                                            <Mail className="mr-2 h-3 w-3 text-slate-400" /> {reg.email}
                                        </div>
                                        <div className="flex items-center text-xs text-slate-600">
                                            <Phone className="mr-2 h-3 w-3 text-slate-400" /> {reg.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-sm text-slate-600">
                                            <Calendar className="mr-2 h-3 w-3 text-slate-400" />
                                            {reg.created_at ? new Date(reg.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(reg.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenDetails(reg)}
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                title="Xem chi tiết"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(reg.id)}
                                                title="Xóa"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                             <div className="w-2 h-8 bg-blue-500 rounded-full" />
                             Thông tin Đăng ký Sự kiện
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Chi tiết đăng ký tham gia sự kiện của khách hàng.
                        </DialogDescription>
                    </DialogHeader>
                    {currentReg && (
                        <div className="space-y-6 pt-4">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sự kiện đăng ký</p>
                                <h3 className="text-xl font-extrabold text-blue-900">{currentReg.event?.title}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-5">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Họ và tên</h4>
                                        <p className="text-lg font-bold text-slate-900">{currentReg.full_name}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</h4>
                                        <p className="font-semibold text-blue-600 underline decoration-blue-200 underline-offset-4">{currentReg.email}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Số điện thoại</h4>
                                        <p className="font-bold text-slate-900">{currentReg.phone}</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Công ty</h4>
                                        <p className="font-bold text-slate-900">{currentReg.company || "Cá nhân"}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ngày đăng ký</h4>
                                        <p className="font-medium text-slate-600">{currentReg.created_at ? new Date(currentReg.created_at).toLocaleString('vi-VN') : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trạng thái hiện tại</h4>
                                        <div className="mt-1">{getStatusBadge(currentReg.status)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-6">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3" /> Lời nhắn kèm theo
                                </h4>
                                <div className="bg-blue-50/50 p-5 rounded-2xl text-sm border border-blue-100/50 italic text-slate-700 leading-relaxed font-medium">
                                    {currentReg.message || "Không có lời nhắn."}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                <p className="text-[10px] text-slate-400 font-medium italic">* Cập nhật trạng thái để theo dõi tiến độ chuẩn bị sự kiện.</p>
                                <div className="flex gap-3">
                                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="font-bold">Đóng</Button>
                                    <Select
                                        value={currentReg.status}
                                        onValueChange={(value) => handleUpdateStatus(currentReg.id, value as EventRegistration['status'])}
                                    >
                                        <SelectTrigger className="w-[180px] bg-blue-600 text-white border-blue-600 font-bold hover:bg-blue-700 transition-colors focus:ring-blue-500 rounded-xl">
                                            <SelectValue placeholder="Chuyển trạng thái" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                            <SelectItem value="pending" className="font-medium">Chờ xác nhận</SelectItem>
                                            <SelectItem value="confirmed" className="font-medium text-blue-600">Đã xác nhận</SelectItem>
                                            <SelectItem value="attended" className="font-medium text-green-600">Đã tham gia</SelectItem>
                                            <SelectItem value="cancelled" className="font-medium text-red-600">Đã hủy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
