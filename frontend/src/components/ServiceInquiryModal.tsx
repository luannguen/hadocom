import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useCreateInquiry, useServices, Service } from "@/hooks/useData";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  service_id: z.string().min(1, "Vui lòng chọn dịch vụ"),
  full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  company_name: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedServiceId?: string;
}

const ServiceInquiryModal = ({
  isOpen,
  onOpenChange,
  selectedServiceId,
}: ServiceInquiryModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data: services } = useServices();
  const { submitInquiry } = useCreateInquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_id: "",
      full_name: "",
      email: "",
      phone: "",
      company_name: "",
      message: "",
    },
  });

  // Sync selected service when modal opens or selectedServiceId changes
  useEffect(() => {
    if (selectedServiceId) {
      form.setValue("service_id", selectedServiceId);
    }
  }, [selectedServiceId, form, isOpen]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await submitInquiry(values as Omit<ServiceInquiry, 'id' | 'created_at' | 'status'>);
      toast({
        title: t("contact.successTitle"),
        description: t("contact.successDesc"),
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("common.errorOccurred"),
        description: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-navy-light text-white border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {t("contact.formTitle")}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {t("contact.desc")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="service_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contact.serviceLabel")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10 focus:ring-cyan">
                        <SelectValue placeholder={t("contact.serviceDefault")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-navy border-white/10 text-white">
                      {services?.map((service: Service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contact.namePlaceholder")}
                        className="bg-white/5 border-white/10 focus:ring-cyan"
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
                    <FormLabel>{t("contact.phone")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contact.phonePlaceholder")}
                        className="bg-white/5 border-white/10 focus:ring-cyan"
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
                  <FormLabel>{t("contact.emailLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="bg-white/5 border-white/10 focus:ring-cyan"
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
                  <FormLabel>{t("recruitment.companyName") || "Tên công ty"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="HADOCOM"
                      className="bg-white/5 border-white/10 focus:ring-cyan"
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
                  <FormLabel>{t("contact.messageLabel")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("contact.messagePlaceholder")}
                      className="min-h-[100px] bg-white/5 border-white/10 focus:ring-cyan resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-cyan hover:bg-cyan/90 text-navy font-bold py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.sending")}
                </>
              ) : (
                t("contact.submit")
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceInquiryModal;
