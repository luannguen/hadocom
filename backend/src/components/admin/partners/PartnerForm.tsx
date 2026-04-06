import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { partnersService } from "@/services/partnersService";
import { Partner } from "@/types";
import { useTranslation } from 'react-i18next';

const partnerSchema = z.object({
    name: z.string().min(2, "Tên đối tác phải ít nhất 2 ký tự"),
    logo_url: z.string(),
    website_url: z.string(),
    sort_order: z.number().int(),
    is_active: z.boolean(),
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

interface PartnerFormProps {
    initialData?: Partner | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function PartnerForm({ initialData, onSuccess, onCancel }: PartnerFormProps) {
    const { toast } = useToast();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // 3. Apply the generic to useForm and the resolver
    const form = useForm<PartnerFormValues>({
        resolver: zodResolver(partnerSchema) as any,
        defaultValues: {
            name: "",
            logo_url: "",
            website_url: "",
            sort_order: 0,
            is_active: true,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                logo_url: initialData.logo_url || "",
                website_url: initialData.website_url || "",
                sort_order: initialData.sort_order || 0,
                is_active: initialData.is_active ?? true,
            });
        }
    }, [initialData, form]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast({ variant: "destructive", title: t('error'), description: "Vui lòng chọn file hình ảnh" });
            return;
        }

        setIsUploading(true);
        const result = await partnersService.uploadLogo(file);
        setIsUploading(false);

        if (result.success) {
            form.setValue("logo_url", result.data || "");
            toast({ title: t('success'), description: "Đã tải lên logo" });
        } else {
            toast({ variant: "destructive", title: t('error'), description: result.error });
        }
    };

    // 4. Use SubmitHandler generic for extra type safety
    const onSubmit = async (values: any) => {
        const data = values as PartnerFormValues;
        setIsLoading(true);
        try {
            const partnerData = {
                name: data.name,
                logo_url: data.logo_url || undefined,
                website_url: data.website_url || undefined,
                sort_order: data.sort_order,
                is_active: data.is_active
            };

            if (initialData) {
                const result = await partnersService.updatePartner(initialData.id, partnerData);
                if (result.success) {
                    toast({ title: t('success'), description: t('partner_update_success') || "Cập nhật đối tác thành công" });
                    onSuccess();
                } else {
                    toast({ variant: "destructive", title: t('error'), description: result.error });
                }
            } else {
                const result = await partnersService.createPartner(partnerData);
                if (result.success) {
                    toast({ title: t('success'), description: t('partner_create_success') || "Thêm đối tác thành công" });
                    onSuccess();
                } else {
                    toast({ variant: "destructive", title: t('error'), description: result.error });
                }
            }
        } catch (error: any) {
            toast({ variant: "destructive", title: t('error'), description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('partner_name') || 'Tên đối tác / Khách hàng'}</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên đối tác..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="website_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('partner_website') || 'Link Website (tuỳ chọn)'}</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sort_order"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('order') || 'Thứ tự hiển thị'}</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="logo_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('partner_logo') || 'Logo'}</FormLabel>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <FormControl>
                                        <div className="relative group">
                                            {field.value ? (
                                                <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                                                    <img src={field.value} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                                                    <button
                                                        type="button"
                                                        onClick={() => field.onChange("")}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                                                    <Upload className="w-8 h-8 mb-2" />
                                                    <span className="text-xs">No Logo</span>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <div className="flex-1">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                            className="cursor-pointer"
                                        />
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Hỗ trợ JPG, PNG, SVG. Dung lượng tối đa 2MB.
                                        </p>
                                    </div>
                                </div>
                                {isUploading && (
                                    <div className="flex items-center gap-2 text-sm text-blue-600">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Đang tải ảnh lên...
                                    </div>
                                )}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">{t('active') || 'Hiển thị'}</FormLabel>
                                <FormDescription>
                                    Cho phép đối tác này hiển thị trên website.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        {t('cancel') || 'Hủy'}
                    </Button>
                    <Button type="submit" disabled={isLoading || isUploading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? t('save') || "Lưu thay đổi" : t('create') || "Thêm mới"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
