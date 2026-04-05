import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Settings2, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BLOCK_LIBRARY } from './BlockLibrary';

interface PropertyInspectorProps {
    selectedSectionId: string | null;
    sections: any[];
    updateSection: (id: string, updates: any) => void;
    setSelectedSectionId: (id: string | null) => void;
    onPickImage: (fieldId: string) => void;
}

export const PropertyInspector: React.FC<PropertyInspectorProps> = ({
    selectedSectionId,
    sections,
    updateSection,
    setSelectedSectionId,
    onPickImage
}) => {
    const section = sections?.find(s => s.id === selectedSectionId);
    const blockDef = BLOCK_LIBRARY.find(b => b.type === section?.type);

    if (!section) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-slate-50/10">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-4">
                    <Settings2 className="h-8 w-8 text-slate-300" />
                </div>
                <h4 className="text-sm font-bold text-slate-400">Chưa chọn phần tử</h4>
                <p className="text-[11px] text-slate-400 mt-1">Bấm vào các khối trên trang hoặc trong danh sách cấu trúc để chỉnh sửa thuộc tính.</p>
            </div>
        );
    }

    const handleFieldChange = (fieldId: string, value: any) => {
        const newProps = { ...(section.props || {}), [fieldId]: value };
        updateSection(section.id, { props: newProps });
    };

    return (
        <div className="flex-grow flex flex-col overflow-hidden bg-white">
            <div className="p-4 flex items-center justify-between border-b bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        Thuộc tính: {blockDef?.name || section.type}
                    </h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedSectionId(null)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-grow overflow-y-auto p-5 space-y-6">
                {blockDef?.fields?.map((field: any) => (
                    <div key={field.id} className="space-y-2.5">
                        <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                            {field.label}
                        </Label>
                        
                        {field.type === 'text' && (
                            <Input 
                                className="h-10 border-slate-200 focus-visible:ring-primary text-sm shadow-sm"
                                value={section.props?.[field.id] || ''}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder={`Nhập ${field.label.toLowerCase()}...`}
                            />
                        )}
                        
                        {field.type === 'textarea' && (
                            <Textarea 
                                className="min-h-[120px] border-slate-200 focus-visible:ring-primary text-sm shadow-sm resize-none"
                                value={section.props?.[field.id] || ''}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder={`Nhập ${field.label.toLowerCase()}...`}
                            />
                        )}

                        {field.type === 'number' && (
                            <Input 
                                type="number"
                                className="h-10 border-slate-200 focus-visible:ring-primary text-sm shadow-sm"
                                value={section.props?.[field.id] || 0}
                                onChange={(e) => handleFieldChange(field.id, parseInt(e.target.value))}
                            />
                        )}

                        {field.type === 'select' && (
                            <Select 
                                value={section.props?.[field.id] || ''}
                                onValueChange={(val) => handleFieldChange(field.id, val)}
                            >
                                <SelectTrigger className="h-10 border-slate-200 focus-visible:ring-primary shadow-sm bg-white">
                                    <SelectValue placeholder="Chọn giá trị..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options?.map((opt: any) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {field.type === 'image' && (
                            <div className="space-y-2">
                                {section.props?.[field.id] ? (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-slate-50 group">
                                        <img 
                                            src={section.props[field.id]} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button 
                                                variant="secondary" 
                                                size="sm" 
                                                className="h-7 text-[10px] font-bold uppercase"
                                                onClick={() => onPickImage(field.id)}
                                            >
                                                Thay đổi ảnh
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div 
                                        className="aspect-video rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-400"
                                        onClick={() => onPickImage(field.id)}
                                    >
                                        <Zap className="h-6 w-6 opacity-20" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Chọn hình ảnh</span>
                                    </div>
                                )}
                                <Input 
                                    className="h-8 text-[10px] border-slate-100 bg-slate-50 focus-visible:ring-primary truncate"
                                    value={section.props?.[field.id] || ''}
                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                    placeholder="Hoặc dán URL ảnh tại đây..."
                                />
                            </div>
                        )}

                        {/* placeholder for other types */}
                        {field.type === 'rich-text' && (
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-400 font-medium">
                                [Rich Text Editor - Ready for future binding]
                            </div>
                        )}
                    </div>
                ))}
                
                {(!blockDef?.fields || blockDef.fields.length === 0) && (
                    <div className="text-center py-10 opacity-40 grayscale flex flex-col items-center">
                        <Settings2 className="h-8 w-8 mb-2" />
                        <p className="text-[10px] font-bold">Khối này chưa có thuộc tính tùy chỉnh</p>
                    </div>
                )}
            </div>
        </div>
    );
};
