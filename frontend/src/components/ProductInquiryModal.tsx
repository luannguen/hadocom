import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useCreateInquiry, Product } from "@/hooks/useData";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Send } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  company_name: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductInquiryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

const ProductInquiryModal = ({
  isOpen,
  onOpenChange,
  product,
}: ProductInquiryModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { submitInquiry } = useCreateInquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      company_name: "",
      message: `Tôi quan tâm đến sản phẩm: ${product.name}. Vui lòng gửi báo giá và tài liệu kỹ thuật chi tiết cho tôi.`,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await submitInquiry({
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        company_name: values.company_name,
        message: values.message,
        product_id: product.id,
        service_id: undefined
      });
      toast({
        title: "Yêu cầu đã được gửi",
        description: "HADOCOM sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
      });
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Gửi yêu cầu thất bại",
        description: error?.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#0A1128] text-white border-white/10 shadow-2xl">
        <DialogHeader>
          <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center text-cyan mb-4">
             <Package className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white">
            Yêu cầu báo giá
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Bạn đang yêu cầu thông tin cho: <span className="text-cyan font-bold">{product.name}</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Họ và tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nguyễn Văn A"
                        className="bg-white/5 border-white/10 focus:border-cyan text-white h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0912 xxx xxx"
                        className="bg-white/5 border-white/10 focus:border-cyan text-white h-12"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@company.com"
                      className="bg-white/5 border-white/10 focus:border-cyan text-white h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Tên công ty (nếu có)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Công ty ..."
                      className="bg-white/5 border-white/10 focus:border-cyan text-white h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Ghi chú yêu cầu</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Thông tin thêm về nhu cầu của bạn..."
                      className="min-h-[100px] bg-white/5 border-white/10 focus:border-cyan text-white resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-cyan hover:bg-cyan/90 text-navy font-black py-7 text-lg rounded-xl mt-4 shadow-xl shadow-cyan/10 transition-all hover:scale-[1.02] active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  Gửi yêu cầu báo giá <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductInquiryModal;
