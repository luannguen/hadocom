import React, { useState, useEffect } from 'react';
import { mediaService, MediaItem } from '@/services/mediaService';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Loader2, Upload, Search, Check, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ImagePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    title?: string;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
    isOpen,
    onClose,
    onSelect,
    title = "Chọn hình ảnh"
}) => {
    const [images, setImages] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const data = await mediaService.getImages();
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching images:', error);
            toast.error('Không thể tải danh sách ảnh');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchImages();
            setSelectedUrl(null);
        }
    }, [isOpen]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const file = e.target.files[0];
        
        setUploading(true);
        try {
            const result = await mediaService.uploadImage(file);
            toast.success('Tải ảnh lên thành công');
            await fetchImages();
            if (result && result.url) setSelectedUrl(result.url);
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error(error.message || 'Lỗi khi tải ảnh');
        } finally {
            setUploading(false);
        }
    };

    const filteredImages = images.filter(img => 
        (img.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleConfirm = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden ring-1 ring-slate-200 shadow-2xl z-[9999]">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-4 flex-grow flex flex-col min-h-0">
                    <div className="flex gap-2">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Tìm kiếm ảnh..." 
                                className="pl-10 h-10 border-slate-200 focus-visible:ring-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Button variant="outline" disabled={uploading} className="h-10 border-slate-200 relative overflow-hidden">
                                {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                                Tải ảnh mới
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    onChange={handleUpload}
                                    accept="image/*"
                                    disabled={uploading}
                                />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto pr-2 min-h-[300px]">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center py-20 text-slate-400">
                                <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
                                <p className="text-sm font-medium">Đang tải thư viện...</p>
                            </div>
                        ) : filteredImages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-100">
                                <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                                <p className="text-sm font-medium">Không tìm thấy hình ảnh nào</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredImages.map((img) => (
                                    <div 
                                        key={img.id}
                                        className={`group relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                                            selectedUrl === img.url ? 'border-primary ring-2 ring-primary/20 scale-[0.98]' : 'border-transparent hover:border-slate-200'
                                        }`}
                                        onClick={() => setSelectedUrl(img.url)}
                                    >
                                        <img 
                                            src={img.url} 
                                            alt={img.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {selectedUrl === img.url && (
                                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                <div className="bg-primary text-white p-1 rounded-full shadow-lg">
                                                    <Check className="h-5 w-5" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-[10px] text-white truncate font-medium">{img.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="p-6 pt-0 gap-3 border-t bg-slate-50/50 mt-4">
                    <Button variant="ghost" onClick={onClose}>
                        Hủy bỏ
                    </Button>
                    <Button 
                        onClick={handleConfirm} 
                        disabled={!selectedUrl}
                        className="px-8"
                    >
                        Chèn ảnh ngay
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
